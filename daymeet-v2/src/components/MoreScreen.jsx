import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoreScreen() {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState('light');
  const [syncAlerts, setSyncAlerts] = useState(true);

  const triggerToast = (msg) => {
    // We don't have global toast in V2 yet, so we just use console or alert for now
    alert(msg);
  };

  const handleGlobalThemeToggle = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    triggerToast(`Theme set to ${themeMode === 'light' ? 'dark' : 'light'}`);
  };

  const handleSyncToggle = () => {
    setSyncAlerts(!syncAlerts);
    triggerToast(`Calendar alerts ${!syncAlerts ? 'synced' : 'disabled'}`);
  };

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      <div className="pt-1">
        <h2 className="text-xl font-black text-[#181B25]">Command Center</h2>
        <p className="text-xs text-[#464555]">All 33 interconnected life operating system modules</p>
      </div>

      {/* GLOBAL THEME SWITCHER CARD */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDE7F6] text-[#3525CD] flex items-center justify-center transition-colors">
              <span className="material-symbols-rounded text-[22px]">palette</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#181B25]">Global System Theme</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E2DFFF] text-[#3525CD] transition-colors">
                  {themeMode === 'light' ? 'Light Mode' : themeMode === 'dark' ? 'Dark Slate' : 'Auto'}
                </span>
              </div>
              <p className="text-xs text-[#464555]">Synchronizes deep Slate-900 OLED dark branding across all 33 modules</p>
            </div>
          </div>

          <div onClick={handleGlobalThemeToggle} className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer select-none ${themeMode === 'light' ? 'bg-gray-300' : 'bg-[#3525CD]'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${themeMode === 'light' ? 'translate-x-0' : 'translate-x-6'}`}></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button onClick={() => setThemeMode('light')} className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${themeMode === 'light' ? 'border-2 border-[#3525CD] bg-[#F1F3FF] text-[#3525CD]' : 'border-[#E5E8F5] bg-[#FAF9FF] hover:border-[#3525CD] text-[#464555]'}`}>
            <span className="material-symbols-rounded text-[18px]">light_mode</span>
            <span className="text-[11px] font-bold">Light</span>
          </button>
          
          <button onClick={() => setThemeMode('dark')} className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${themeMode === 'dark' ? 'border-2 border-[#3525CD] bg-[#F1F3FF] text-[#3525CD]' : 'border-[#E5E8F5] bg-[#FAF9FF] hover:border-[#3525CD] text-[#464555]'}`}>
            <span className="material-symbols-rounded text-[18px]">dark_mode</span>
            <span className="text-[11px] font-medium">Dark Slate</span>
          </button>

          <button onClick={() => setThemeMode('system')} className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${themeMode === 'system' ? 'border-2 border-[#3525CD] bg-[#F1F3FF] text-[#3525CD]' : 'border-[#E5E8F5] bg-[#FAF9FF] hover:border-[#3525CD] text-[#464555]'}`}>
            <span className="material-symbols-rounded text-[18px]">brightness_auto</span>
            <span className="text-[11px] font-medium">Auto (OS)</span>
          </button>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F4F3FB] border border-[#E5E8F5] flex items-center gap-2 text-xs text-[#464555]">
          <span className="material-symbols-rounded text-[16px] text-[#3525CD] shrink-0">auto_awesome</span>
          <span>Adaptive contrast system: Slate-900 background, Slate-800 elevated surfaces, and high-legibility typography.</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div onClick={() => triggerToast('Rules & Automations coming soon')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] text-[#673AB7] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">bolt</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Rules & Automations</p>
          <p className="text-[10px] text-[#464555]">When → If → Then engine</p>
        </div>

        <div onClick={() => navigate('/finance')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">account_balance_wallet</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Finance & Ledger</p>
          <p className="text-[10px] text-[#464555]">Daily cap & bank sync</p>
        </div>

        <div onClick={() => triggerToast('Meetings & MoM coming soon')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] text-[#0288D1] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">videocam</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Meetings & MoM</p>
          <p className="text-[10px] text-[#464555]">AI notes & summaries</p>
        </div>

        <div onClick={() => triggerToast('Habit streaks: 18-day streak on 2.5L water')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">local_fire_department</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Habits & Goals</p>
          <p className="text-[10px] text-[#464555]">Streak tracker & badges</p>
        </div>

        <div onClick={() => triggerToast('Chennai flight 6E 412 in 3 days. Packing list ready.')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#E8EAF6] text-[#3949AB] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">flight</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Travel & Trips</p>
          <p className="text-[10px] text-[#464555]">Boarding pass & packing</p>
        </div>

        <div onClick={() => triggerToast('Decrypted on-device AES Document Vault')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#ECEFF1] text-[#455A64] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">lock</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Document Vault</p>
          <p className="text-[10px] text-[#464555]">Passports & health cards</p>
        </div>
      </div>

      {/* Settings: Device Calendar Alerts */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${syncAlerts ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#F1F3FF] text-[#3525CD]'}`}>
              <span className="material-symbols-rounded text-[22px]">{syncAlerts ? 'event_available' : 'event_busy'}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#181B25]">Sync Device Calendar Notifications</p>
              <p className="text-[10px] text-[#464555]">{syncAlerts ? 'Active: DayMeet alerts mirrored with local system calendar' : 'Disabled: DayMeet alerts will not sync'}</p>
            </div>
          </div>
          <div onClick={handleSyncToggle} className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${syncAlerts ? 'bg-[#3525CD]' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${syncAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
