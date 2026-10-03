import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function PullToRefresh({ onRefresh, children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef(null);
  
  const { activeProfile, setActiveProfile, detoxMode, toggleDetoxMode, globalLockEnabled, toggleGlobalLock } = useAppStore();

  const MAX_PULL = 400; 
  const CONTROL_CENTER_SNAP = 320;
  const CONTROL_CENTER_THRESHOLD = 180;
  const REFRESH_THRESHOLD = 70;

  const handleTouchStart = (e) => {
    if (isRefreshing || containerRef.current.scrollTop > 0) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (isRefreshing || containerRef.current.scrollTop > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = currentY.current - startY.current;
    
    if (distance > 0 && !isControlCenterOpen) {
      if (e.cancelable) e.preventDefault();
      const dampenedDistance = Math.min(distance * 0.6, MAX_PULL);
      setPullDistance(dampenedDistance);
    } else if (distance < 0 && isControlCenterOpen) {
      if (e.cancelable) e.preventDefault();
      // Moving up while open
      setPullDistance(Math.max(CONTROL_CENTER_SNAP + distance, 0));
    }
  };

  const handleTouchEnd = async () => {
    if (isRefreshing || pullDistance === 0) return;

    if (isControlCenterOpen) {
      if (pullDistance < CONTROL_CENTER_SNAP - 50) {
        setIsControlCenterOpen(false);
        setPullDistance(0);
      } else {
        setPullDistance(CONTROL_CENTER_SNAP);
      }
      return;
    }

    if (pullDistance > CONTROL_CENTER_THRESHOLD) {
      // Snap down to control center
      setIsControlCenterOpen(true);
      setPullDistance(CONTROL_CENTER_SNAP);
    } else if (pullDistance > REFRESH_THRESHOLD && onRefresh) {
      // Standard Refresh
      setIsRefreshing(true);
      setPullDistance(REFRESH_THRESHOLD);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
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
      style={{ overscrollBehavior: 'none' }}
    >
      {/* Hidden Control Center (Behind Content) */}
      <div 
        className="absolute top-0 left-0 right-0 p-6 pt-10 text-white z-0 flex flex-col gap-6"
        style={{ height: `${CONTROL_CENTER_SNAP}px` }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white/90">Control Center</h2>
          <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-bold">Swipe up to close</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveProfile('Work')}
            className={`p-4 rounded-2xl flex flex-col items-start gap-2 border transition ${activeProfile === 'Work' ? 'bg-white/20 border-white/50 shadow-sm' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            <span className="material-symbols-rounded text-[#38BDF8]">work</span>
            <span className="text-sm font-bold">Work Mode</span>
          </button>
          <button 
            onClick={() => setActiveProfile('Personal')}
            className={`p-4 rounded-2xl flex flex-col items-start gap-2 border transition ${activeProfile === 'Personal' ? 'bg-white/20 border-white/50 shadow-sm' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            <span className="material-symbols-rounded text-[#10B981]">home</span>
            <span className="text-sm font-bold">Personal</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDetoxMode}
            className={`flex-1 p-3 rounded-2xl flex items-center justify-center gap-2 border transition ${detoxMode ? 'bg-[#E53935]/20 border-[#E53935]/50 text-[#FFCDD2]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
          >
            <span className="material-symbols-rounded text-[18px]">bedtime_off</span>
            <span className="text-xs font-bold">{detoxMode ? 'Detox Active' : 'Detox Mode'}</span>
          </button>
          <button 
            onClick={toggleGlobalLock}
            className={`flex-1 p-3 rounded-2xl flex items-center justify-center gap-2 border transition ${globalLockEnabled ? 'bg-[#3525CD]/40 border-[#3525CD]/50 text-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
          >
            <span className="material-symbols-rounded text-[18px]">{globalLockEnabled ? 'lock' : 'lock_open'}</span>
            <span className="text-xs font-bold">{globalLockEnabled ? 'Vault Locked' : 'Lock Vault'}</span>
          </button>
        </div>
      </div>

      {/* Loading Spinner Area (Only visible when dragging for refresh, fades out if going to control center) */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          height: `${REFRESH_THRESHOLD}px`,
          transform: `translateY(${Math.min(pullDistance, REFRESH_THRESHOLD) - REFRESH_THRESHOLD}px)`,
          transition: isRefreshing ? 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' : pullDistance === 0 || isControlCenterOpen ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
          opacity: pullDistance > CONTROL_CENTER_THRESHOLD || isControlCenterOpen ? 0 : 1
        }}
      >
        <div 
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300"
          style={{
            transform: `scale(${Math.min(pullDistance / REFRESH_THRESHOLD, 1)}) rotate(${pullDistance * 2}deg)`,
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

      {/* Main Content Area */}
      <div
        className="bg-[#FAF9FF] dark:bg-[#0F172A] min-h-full rounded-t-3xl relative z-20"
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isRefreshing || isControlCenterOpen || pullDistance === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
          boxShadow: isControlCenterOpen ? '0 -10px 40px rgba(0,0,0,0.2)' : 'none'
        }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full opacity-50"></div>
        {children}
      </div>
    </div>
  );
}
