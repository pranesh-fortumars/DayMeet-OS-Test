import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTimeOfDay } from '../hooks/useTimeOfDay';
import { triggerHaptic } from '../utils/haptics';

export default function LockScreen({ onUnlock, onFallback, onBypass }) {
  const [time, setTime] = useState(new Date());
  const timeOfDay = useTimeOfDay();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '');
  };

  const handleUnlock = () => {
    triggerHaptic('heavy');
    onUnlock();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] bg-black text-white flex flex-col justify-between overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[150vw] h-[150vw] bg-gradient-to-tr from-[#3525CD]/30 to-[#6FFBBE]/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Top Section - Clock & Date */}
      <div className="pt-20 px-8 relative z-10 flex flex-col items-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">{timeOfDay}</p>
        <h1 className="text-[120px] font-black tracking-tighter leading-none" style={{ textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          {formatTime(time)}
        </h1>
        <p className="text-xl font-medium text-gray-300 mt-2">
          {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* Glance Widgets */}
      <div className="px-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex flex-col items-start shadow-xl">
            <span className="material-symbols-rounded text-[#6FFBBE] mb-2">partly_cloudy_day</span>
            <p className="text-2xl font-black">72°F</p>
            <p className="text-xs text-gray-400 font-medium">New York • Sunny</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex flex-col items-start shadow-xl">
            <span className="material-symbols-rounded text-[#38BDF8] mb-2">videocam</span>
            <p className="text-lg font-bold leading-tight">Product Sync</p>
            <p className="text-xs text-[#38BDF8] font-bold mt-1">In 20m</p>
          </div>
        </div>
      </div>

      {/* Swipe to Unlock / Fingerprint */}
      <div className="pb-12 flex flex-col items-center relative z-10">
        <motion.button
          onClick={handleUnlock}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="material-symbols-rounded text-white text-3xl">fingerprint</span>
        </motion.button>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-6 animate-pulse">
          Tap to Unlock
        </p>

        {/* Developer/Emergency Bypass */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {onFallback && (
            <button 
              onClick={onFallback}
              className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-white uppercase underline decoration-gray-700 underline-offset-4 active:scale-95 transition"
            >
              Master PIN Fallback
            </button>
          )}
          
          {onBypass && (
            <button 
              onClick={onBypass}
              className="text-[10px] font-bold tracking-widest text-[#E53935] hover:text-[#B71C1C] uppercase active:scale-95 transition"
            >
              Direct Login (Dev Bypass)
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
