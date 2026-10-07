import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function AmbientStandbyCanvas() {
  const { toggleStandbyMode, tasks, steps } = useAppStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate abstract brush strokes based on tasks and steps
  const strokes = tasks.slice(0, 10).map((task, i) => {
    const isCompleted = task.status === 'completed';
    return {
      id: i,
      x: 10 + (Math.random() * 80), // random % x
      y: 10 + (Math.random() * 80), // random % y
      rotate: Math.random() * 360,
      scale: isCompleted ? 1.5 : 1,
      opacity: isCompleted ? 0.8 : 0.3,
      delay: i * 0.2
    };
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[999999] bg-[#E8E8E8] dark:bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      onClick={toggleStandbyMode}
    >
      {/* Background Noise Texture (E-ink vibe) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Abstract Brush Strokes / Geometry */}
      <div className="absolute inset-0">
        {strokes.map((stroke) => (
          <motion.div
            key={stroke.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [stroke.scale * 0.9, stroke.scale * 1.1, stroke.scale * 0.9],
              opacity: [stroke.opacity * 0.8, stroke.opacity, stroke.opacity * 0.8],
              rotate: [stroke.rotate, stroke.rotate + 10, stroke.rotate - 10]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: stroke.delay 
            }}
            className="absolute rounded-full bg-black dark:bg-white blur-3xl mix-blend-difference"
            style={{
              left: `${stroke.x}%`,
              top: `${stroke.y}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${20 + Math.random() * 50}px`
            }}
          />
        ))}
      </div>

      {/* Large Minimalist Clock */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none mix-blend-difference">
        <h1 className="text-[120px] font-black text-white dark:text-white leading-none tracking-tighter" style={{ fontFamily: 'monospace' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/AM|PM/, '').trim()}
        </h1>
        <p className="text-xl text-white/50 dark:text-white/50 tracking-widest uppercase font-bold mt-2">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Subtle Stats at bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-white/40 dark:text-white/40 text-xs font-bold uppercase tracking-widest mix-blend-difference">
        <span>{steps.toLocaleString()} Steps</span>
        <span>{tasks.filter(t => t.status === 'completed').length} Tasks</span>
      </div>

      <p className="absolute top-12 text-white/20 dark:text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase mix-blend-difference">
        Tap anywhere to resume
      </p>
    </motion.div>
  );
}
