import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { triggerHaptic } from '../utils/haptics';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppStore } from '../store/useAppStore';

export default function BottomDock() {
  const handleNav = () => triggerHaptic('light');
  const { setModalOpen, islandState, setIsland } = useAppStore();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (islandState.active && islandState.type === 'meeting') {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [islandState.active, islandState.type]);

  const navClass = ({ isActive }) => 
    `flex flex-col items-center justify-center flex-1 py-1 transition ${
      isActive ? 'text-[#3525CD]' : 'text-[#464555] hover:text-[#181B25]'
    }`;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <motion.nav 
      layout
      className="fixed bottom-0 w-full max-w-3xl mx-auto flex justify-center pb-safe pt-2 px-4 z-40"
    >
      <motion.div 
        layout
        className={`glass-panel border-t border-white/20 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-500 ease-spring ${
          islandState.active ? 'rounded-[30px] px-2 w-[90%] bg-[#181B25]/90 dark:bg-black/90 mb-2 border border-white/10' : 'w-full pb-2 px-2'
        }`}
      >
        <AnimatePresence mode="wait">
          {!islandState.active ? (
            <motion.div 
              key="standard-dock"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              className="flex justify-between items-end relative"
            >
              <NavLink to="/" onClick={handleNav} className={navClass}>
                <span className="material-symbols-rounded text-[24px]">home</span>
                <span className="text-[10px] font-bold mt-0.5">Home</span>
              </NavLink>
              <NavLink to="/calendar" onClick={handleNav} className={navClass}>
                <span className="material-symbols-rounded text-[24px]">calendar_month</span>
                <span className="text-[10px] font-bold mt-0.5">Plan</span>
              </NavLink>
              <NavLink to="/tasks" onClick={handleNav} className={navClass}>
                <span className="material-symbols-rounded text-[24px]">task_alt</span>
                <span className="text-[10px] font-bold mt-0.5">Tasks</span>
              </NavLink>
              
              <div className="flex-1 flex justify-center mt-[-20px] z-50">
                <motion.button 
                  layoutId="quickAdd-fab"
                  onClick={() => { triggerHaptic('medium'); setModalOpen('quickAdd', true); }}
                  className="w-12 h-12 rounded-full bg-[#181B25] shadow-[0_8px_16px_rgba(24,27,37,0.3)] flex items-center justify-center text-white relative hover:scale-105 transition"
                >
                  <span className="material-symbols-rounded text-[24px]">add</span>
                </motion.button>
              </div>
              
              <NavLink to="/insights" onClick={handleNav} className={navClass}>
                <span className="material-symbols-rounded text-[24px]">insights</span>
                <span className="text-[10px] font-bold mt-0.5">Vitals</span>
              </NavLink>
              <NavLink to="/more" onClick={handleNav} className={navClass}>
                <span className="material-symbols-rounded text-[24px]">grid_view</span>
                <span className="text-[10px] font-bold mt-0.5">More</span>
              </NavLink>
            </motion.div>
          ) : (
            <motion.div 
              key="live-activity"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="flex items-center justify-between py-2 px-3 h-14"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3525CD] flex items-center justify-center">
                  <span className="material-symbols-rounded text-white text-[20px]">
                    {islandState.type === 'meeting' ? 'videocam' : 'timer'}
                  </span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold leading-tight">{islandState.message || 'Active Session'}</p>
                  <p className="text-[#38BDF8] text-[15px] font-black tracking-widest tabular-nums leading-tight">
                    {formatTime(timer)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {islandState.type === 'meeting' && (
                  <button onClick={() => triggerHaptic('light')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
                    <span className="material-symbols-rounded text-[20px]">mic</span>
                  </button>
                )}
                <button 
                  onClick={() => { triggerHaptic('heavy'); setIsland({ active: false }); }}
                  className="w-10 h-10 rounded-full bg-[#E53935] flex items-center justify-center text-white shadow-[0_0_15px_rgba(229,57,53,0.4)] hover:bg-red-700 transition"
                >
                  <span className="material-symbols-rounded text-[20px]">call_end</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
