import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const colors = ['#3525CD', '#10B981', '#F59E0B', '#38BDF8', '#E53935', '#C084FC'];
const particleCount = 40;

export default function Confetti() {
  const { confettiState } = useAppStore();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (confettiState.show && confettiState.id) {
      const newParticles = Array.from({ length: particleCount }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 150;
        return {
          id: `${confettiState.id}-${i}`,
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 1,
        };
      });
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [confettiState.id, confettiState.show]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              scale: p.scale, 
              x: p.x, 
              y: p.y, 
              rotate: p.rotation + 180 
            }}
            transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
