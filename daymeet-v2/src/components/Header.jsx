import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function Header() {
  const { setModalOpen, activeProfile, setActiveProfile } = useAppStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const triggerToast = (msg) => console.log('Toast:', msg);
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
    <header className="sticky top-0 z-40 bg-[#FAF9FF] border-b border-[#E5E8F5] transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
        {/* Brand Logo & Context Switcher */}
        <div className="flex items-center gap-3">
          <div onClick={() => setModalOpen('copilot', true)} className="flex items-center gap-2 cursor-pointer select-none relative z-50">
            <div className="w-8 h-8 rounded-[8px] bg-[#3525CD] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-rounded text-[18px]">widgets</span>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${currentProfile.color} transition-all active:scale-95`}
            >
              <span className="material-symbols-rounded text-[16px]">{currentProfile.icon}</span>
              <span className="text-[11px] font-bold tracking-tight">{currentProfile.id}</span>
              <span className="material-symbols-rounded text-[14px]">expand_more</span>
            </button>

            {profileDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)}></div>
                <div className="absolute top-full mt-1 left-0 w-36 bg-white border border-[#E5E8F5] rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                  {profiles.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => handleProfileSwitch(p.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${activeProfile === p.id ? 'bg-[#F4F3FB] text-[#3525CD]' : 'text-[#464555] hover:bg-gray-50'}`}
                    >
                      <span className="material-symbols-rounded text-[16px]">{p.icon}</span>
                      {p.id}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button onClick={toggleGlobalTheme} title="Toggle Global Dark / Light Theme" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#EBEDFB] transition">
            <span className="material-symbols-rounded text-[20px]">dark_mode</span>
          </button>

          <button onClick={() => setModalOpen('search', true)} title="Search Across All Modules" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#EBEDFB] transition">
            <span className="material-symbols-rounded text-[20px]">search</span>
          </button>

          <button onClick={handleNotificationsClick} title="System HUD & Notifications" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#EBEDFB] transition relative">
            <span className="material-symbols-rounded text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E53935]"></span>
          </button>

          <button onClick={() => window.location.hash = '#/profile'} title="My Profile" className="w-9 h-9 rounded-full overflow-hidden border border-[#E5E8F5] ml-1 flex-shrink-0 active:scale-95 transition shadow-sm">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" alt="Profile" className="w-full h-full object-cover bg-[#F1F3FF]" />
          </button>

          <button onClick={() => setModalOpen('copilot', true)} title="AI Assistant Copilot" className="h-8 px-2.5 rounded-full bg-[#E2DFFF] text-[#3525CD] text-xs font-bold flex items-center gap-1.5 hover:bg-[#DAD7FF] transition ml-1">
            <span className="material-symbols-rounded text-[16px] animate-pulse">auto_awesome</span>
            <span className="hidden sm:inline">AI Copilot</span>
          </button>
        </div>
      </div>
    </header>
  );
}
