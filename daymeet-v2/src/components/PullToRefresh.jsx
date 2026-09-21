import React, { useState, useRef, useEffect } from 'react';

export default function PullToRefresh({ onRefresh, children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef(null);
  
  const MAX_PULL = 120; // Max pixels the container can be pulled down
  const THRESHOLD = 70; // Pixels needed to trigger a refresh

  const handleTouchStart = (e) => {
    if (isRefreshing || containerRef.current.scrollTop > 0) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (isRefreshing || containerRef.current.scrollTop > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = currentY.current - startY.current;
    
    if (distance > 0) {
      // Prevent native overscroll when pulling
      if (e.cancelable) {
        e.preventDefault();
      }
      // Apply dampening (resistance) for smooth physics
      const dampenedDistance = Math.min(distance * 0.4, MAX_PULL);
      setPullDistance(dampenedDistance);
    }
  };

  const handleTouchEnd = async () => {
    if (isRefreshing || pullDistance === 0) return;

    if (pullDistance > THRESHOLD && onRefresh) {
      setIsRefreshing(true);
      setPullDistance(THRESHOLD); // Snap to threshold while refreshing
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      // Spring back to 0
      setPullDistance(0);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto touch-pan-y relative w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        overscrollBehavior: 'none' // Prevent browser default pull-to-refresh
      }}
    >
      {/* Loading Spinner Area */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{
          height: `${MAX_PULL}px`,
          transform: `translateY(${pullDistance - MAX_PULL}px)`,
          transition: isRefreshing ? 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' : pullDistance === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
        }}
      >
        <div 
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300"
          style={{
            transform: `scale(${Math.min(pullDistance / THRESHOLD, 1)}) rotate(${pullDistance * 2}deg)`,
            opacity: pullDistance > 10 ? 1 : 0
          }}
        >
          {isRefreshing ? (
            <span className="material-symbols-rounded text-[#3525CD] animate-spin text-[22px]">autorenew</span>
          ) : (
            <span className="material-symbols-rounded text-gray-500 text-[22px]" style={{ transform: `rotate(${pullDistance * 2}deg)` }}>arrow_downward</span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isRefreshing ? 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' : pullDistance === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}
