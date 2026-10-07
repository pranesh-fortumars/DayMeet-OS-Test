import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { setModalOpen, activeProfile, setActiveProfile, islandState, setIsland, toggleStandbyMode } = useAppStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const toggleGlobalTheme = () => document.documentElement.classList.toggle('dark');

  const profiles = [
    { id: 'Work', icon: 'work', color: 'bg-[#E2DFFF] text-[#3525CD]' },
    { id: 'Personal', icon: 'person', color: 'bg-[#E8F5E9] text-[#2E7D32]' },
    { id: 'Creative', icon: 'palette', color: 'bg-[#FFF3E0] text-[#F57C00]' },
    { id: 'Family', icon: 'family_restroom', color: 'bg-[#FCE4EC] text-[#C2185B]' }
  ];

  const currentProfile = profiles.find(p => p.id === activeProfile) || profiles[0];

  const handleProfileSwitch = (id) => {
    setActiveProfile(id);
    setProfileDropdownOpen(false);
    Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  };

  const handleNotificationsClick = () => {
    window.location.hash = '#/more';
  };

  return (
    <header className="sticky top-0 z-50 pt-2 pb-2 pointer-events-none flex justify-center w-full">
      <motion.div 
        layout
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        className={`pointer-events-auto bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl shadow-lg border border-[#E5E8F5] dark:border-slate-700/50 flex flex-col justify-center overflow-hidden mx-auto ${
          islandState.active ? 'rounded-[32px] w-[95%] sm:w-[90%]' : 'rounded-full w-[95%] sm:max-w-3xl'
        }`}
      >
        
        {/* === DYNAMIC EXPANDED STATES === */}
        <AnimatePresence mode="wait">
          {islandState.active && islandState.type === 'sync' && (
            <motion.div
              key="sync"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 py-4 bg-[#181B25] dark:bg-black text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-[#6FFBBE] animate-spin text-[24px]">sync</span>
                  <div>
                    <p className="text-sm font-bold text-white">{islandState.message || 'Syncing...'}</p>
                    <p className="text-[11px] text-gray-400">Syncing with Firebase Cloud</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[#38BDF8]">Live</p>
                </div>
              </div>
            </motion.div>
          )}

          {islandState.active && islandState.type === 'flight' && (
            <motion.div
              key="flight"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 py-4 bg-[#181B25] dark:bg-black text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-[#38BDF8] animate-pulse text-[24px]">flight_takeoff</span>
                  <div>
                    <p className="text-sm font-bold text-white">Boarding Now</p>
                    <p className="text-[11px] text-gray-400">JFK to LHR • BA 112</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[#6FFBBE]">45:00</p>
                  <p className="text-[11px] text-gray-400">Gate closes</p>
                </div>
              </div>
            </motion.div>
          )}

          {islandState.active && islandState.type === 'recording' && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 py-3 bg-[#FFEBEE] dark:bg-red-950 text-[#D32F2F] dark:text-red-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  <p className="text-xs font-bold">{islandState.message || 'Capturing Audio...'}</p>
                </div>
                <p className="text-sm font-bold font-mono">00:14</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === STANDARD COMPACT HEADER ROW === */}
        <div className="px-3 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div onClick={() => { setIsland({ active: !islandState.active, type: 'flight' }); Haptics.impact({ style: ImpactStyle.Light }).catch(()=>{}); }} className="flex items-center gap-2 cursor-pointer select-none relative z-50">
              <div className="w-9 h-9 rounded-full bg-[#3525CD] flex items-center justify-center text-white shadow-sm hover:scale-105 transition">
                <span className="material-symbols-rounded text-[18px]">widgets</span>
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${currentProfile.color} transition-all active:scale-95`}
              >
                <span className="material-symbols-rounded text-[16px]">{currentProfile.icon}</span>
                <span className="text-[12px] font-bold tracking-tight">{currentProfile.id}</span>
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)}></div>
                  <div className="absolute top-full mt-2 left-0 w-40 bg-white dark:bg-[#1E293B] border border-[#E5E8F5] dark:border-slate-700 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {profiles.map(p => (
                      <button 
                        key={p.id}
                        onClick={() => handleProfileSwitch(p.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${activeProfile === p.id ? 'bg-[#F4F3FB] dark:bg-slate-800 text-[#3525CD] dark:text-[#818CF8]' : 'text-[#464555] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                      >
                        <span className="material-symbols-rounded text-[18px]">{p.icon}</span>
                        {p.id}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={toggleStandbyMode} title="Standby Canvas" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] dark:text-gray-400 hover:bg-[#EBEDFB] dark:hover:bg-slate-800 transition">
              <span className="material-symbols-rounded text-[20px]">smart_display</span>
            </button>
            <button onClick={toggleGlobalTheme} title="Toggle Theme" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] dark:text-gray-400 hover:bg-[#EBEDFB] dark:hover:bg-slate-800 transition">
              <span className="material-symbols-rounded text-[20px]">dark_mode</span>
            </button>

            <button onClick={() => setModalOpen('search', true)} title="Search" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] dark:text-gray-400 hover:bg-[#EBEDFB] dark:hover:bg-slate-800 transition">
              <span className="material-symbols-rounded text-[20px]">search</span>
            </button>

            <button onClick={handleNotificationsClick} title="Notifications" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] dark:text-gray-400 hover:bg-[#EBEDFB] dark:hover:bg-slate-800 transition relative">
              <span className="material-symbols-rounded text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E53935] border border-white dark:border-[#1E293B]"></span>
            </button>

            <button onClick={() => window.location.hash = '#/profile'} className="w-9 h-9 rounded-full overflow-hidden border border-[#E5E8F5] dark:border-slate-700 ml-1 flex-shrink-0 active:scale-95 transition shadow-sm">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" alt="Profile" className="w-full h-full object-cover bg-[#F1F3FF]" />
            </button>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
