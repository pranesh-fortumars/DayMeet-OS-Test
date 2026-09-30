import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

const profileColors = {
  'Work': '#3525CD',     // Deep Blue
  'Personal': '#10B981', // Emerald Green
  'Creative': '#F57C00', // Vibrant Orange
  'Family': '#E53935'    // Warm Red
};

export default function AmbientBackground() {
  const { activeProfile } = useAppStore();
  const themeColor = profileColors[activeProfile] || '#3525CD';

  // Generate a memoized list of particles so they don't jump on every re-render
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 150 + 50, // 50px to 200px
      initialX: Math.random() * 100, // 0% to 100%
      initialY: Math.random() * 100, // 0% to 100%
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -20, // Start at different times
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Base Gradient that slowly morphs color */}
      <motion.div 
        className="absolute inset-0 opacity-5 dark:opacity-[0.02]"
        animate={{ backgroundColor: themeColor }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[60px] opacity-40 dark:opacity-20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.initialX}%`,
            top: `${p.initialY}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            backgroundColor: themeColor,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut",
            delay: p.delay,
            backgroundColor: { duration: 2 }
          }}
        />
      ))}
    </div>
  );
}
