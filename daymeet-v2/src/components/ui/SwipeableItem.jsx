import React, { useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function SwipeableItem({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  leftActionContent, 
  rightActionContent,
  swipeThreshold = 100 
}) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  // Background opacity based on swipe direction
  const leftOpacity = useTransform(x, [0, swipeThreshold], [0, 1]);
  const rightOpacity = useTransform(x, [-swipeThreshold, 0], [1, 0]);

  const handleDragEnd = async (event, info) => {
    const offset = info.offset.x;
    
    if (offset > swipeThreshold && onSwipeRight) {
      Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => {});
      await controls.start({ x: window.innerWidth }); // Swipe off screen right
      onSwipeRight();
    } else if (offset < -swipeThreshold && onSwipeLeft) {
      Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => {});
      await controls.start({ x: -window.innerWidth }); // Swipe off screen left
      onSwipeLeft();
    } else {
      // Spring back to center
      Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } });
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#FAF9FF] dark:bg-slate-800" ref={containerRef}>
      {/* Background Actions Layer */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        {onSwipeRight && (
          <motion.div style={{ opacity: leftOpacity }} className="flex items-center text-[#2E7D32]">
            {rightActionContent || <span className="material-symbols-rounded">check_circle</span>}
          </motion.div>
        )}
        {onSwipeLeft && (
          <motion.div style={{ opacity: rightOpacity }} className="flex items-center text-[#E53935] ml-auto">
            {leftActionContent || <span className="material-symbols-rounded">delete</span>}
          </motion.div>
        )}
      </div>

      {/* Swipeable Foreground Layer */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // Limits drag to prevent infinite scrolling, handles snapback
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        className="relative z-10 w-full bg-white dark:bg-[#1E293B] rounded-xl border border-[#E5E8F5] dark:border-slate-700 shadow-sm"
      >
        {children}
      </motion.div>
    </div>
  );
}
