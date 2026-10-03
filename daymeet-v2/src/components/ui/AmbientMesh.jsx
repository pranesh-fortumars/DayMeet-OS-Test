import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export default function AmbientMesh() {
  const { activeProfile } = useAppStore();

  const getProfileConfig = () => {
    switch(activeProfile) {
      case 'Work':
        return {
          colors: ['bg-orange-500', 'bg-purple-600', 'bg-sky-400'],
          duration: 10,
          opacity: 0.15
        };
      case 'Personal':
        return {
          colors: ['bg-indigo-900', 'bg-teal-500', 'bg-emerald-400'],
          duration: 20,
          opacity: 0.1
        };
      case 'Creative':
        return {
          colors: ['bg-pink-500', 'bg-amber-400', 'bg-cyan-400'],
          duration: 14,
          opacity: 0.2
        };
      case 'Family':
        return {
          colors: ['bg-green-500', 'bg-yellow-400', 'bg-blue-400'],
          duration: 18,
          opacity: 0.12
        };
      default:
        return {
          colors: ['bg-indigo-500', 'bg-purple-500', 'bg-blue-500'],
          duration: 15,
          opacity: 0.15
        };
    }
  };

  const config = getProfileConfig();

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Mesh Blob 1 */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 90, -90, 0]
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] ${config.colors[0]}`}
        style={{ opacity: config.opacity }}
      />
      
      {/* Mesh Blob 2 */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [0.8, 1.5, 1, 0.8],
          rotate: [0, -90, 90, 0]
        }}
        transition={{
          duration: config.duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[100px] ${config.colors[1]}`}
        style={{ opacity: config.opacity }}
      />

      {/* Mesh Blob 3 */}
      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 50, 100, 0],
          scale: [1, 0.8, 1.2, 1],
          rotate: [0, 180, 360, 0]
        }}
        transition={{
          duration: config.duration * 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[120px] ${config.colors[2]}`}
        style={{ opacity: config.opacity }}
      />
    </div>
  );
}
