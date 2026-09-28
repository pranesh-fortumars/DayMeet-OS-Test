import React from 'react';
import { motion } from 'framer-motion';

export default function HealthRing({ title, value, unit, goal, progress, color, icon }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  // Ensure progress is max 100% for the visual ring
  const displayProgress = Math.min(progress, 100);
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl border border-[#E5E8F5] dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center relative cursor-pointer active:scale-95 transition-transform">
      <h4 className="text-[10px] font-bold text-[#464555] dark:text-slate-400 uppercase tracking-wider mb-2">{title}</h4>
      
      <div className="relative flex items-center justify-center w-24 h-24 mb-2">
        {/* Background Track */}
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            className="text-[#E5E8F5] dark:text-slate-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          {/* Animated Progress Ring */}
          <motion.circle
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        
        {/* Inner Icon/Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="material-symbols-rounded text-[20px] mb-0.5" style={{ color }}>{icon}</span>
          <span className="text-sm font-black text-[#181B25] dark:text-white leading-none">{value}</span>
        </div>
      </div>
      
      <span className="text-[9px] font-bold text-[#777587] dark:text-slate-500">Goal: {goal} {unit}</span>
    </div>
  );
}
