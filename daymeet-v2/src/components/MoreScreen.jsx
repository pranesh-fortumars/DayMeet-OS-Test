import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export default function MoreScreen() {
  const navigate = useNavigate();
  const { setModalOpen } = useAppStore();
  const [themeMode, setThemeMode] = useState('light');
  const [syncAlerts, setSyncAlerts] = useState(true);
  const [pomodoroHUD, setPomodoroHUD] = useState(true);
  const [geoAlerts, setGeoAlerts] = useState(false);
  const [bioNag, setBioNag] = useState(true);

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
        {/* Deep Work Focus Sanctuary */}
        <div onClick={() => setModalOpen('focusSanctuary', true)} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#6366F1] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">self_improvement</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Focus Sanctuary</p>
          <p className="text-[10px] text-[#464555]">Distraction-free timer</p>
        </div>

        {/* Evening Wind-Down */}
        <div onClick={() => setModalOpen('windDown', true)} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#8B5CF6] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">nightlight</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Evening Routine</p>
          <p className="text-[10px] text-[#464555]">Wind-down & log</p>
        </div>

        {/* Weekly Life Reset */}
        <div onClick={() => navigate('/weekly-reset')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] text-[#673AB7] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">model_training</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Weekly Reset</p>
          <p className="text-[10px] text-[#464555]">Guided review & plan</p>
        </div>

        {/* Digital Life Cleanup */}
        <div onClick={() => navigate('/cleanup')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">cleaning_services</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Digital Cleanup</p>
          <p className="text-[10px] text-[#464555]">Clear stale items</p>
        </div>

        {/* Finance & Ledger */}
        <div onClick={() => navigate('/finance')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] text-[#0288D1] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">account_balance_wallet</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Finance & Ledger</p>
          <p className="text-[10px] text-[#464555]">Daily cap & bank sync</p>
        </div>

        {/* Growth Hub */}
        <div onClick={() => navigate('/growth-hub')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">psychology</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Growth Hub</p>
          <p className="text-[10px] text-[#464555]">Decisions & Experiments</p>
        </div>

        {/* Relationships & Admin */}
        <div onClick={() => navigate('/relationships')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#E8EAF6] text-[#3949AB] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">diversity_1</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Relationships & Admin</p>
          <p className="text-[10px] text-[#464555]">Network, Gifts & Family</p>
        </div>

        {/* Knowledge Vault */}
        <div onClick={() => navigate('/knowledge')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#ECEFF1] text-[#455A64] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">lock</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Knowledge Vault</p>
          <p className="text-[10px] text-[#464555]">Read-later & secure docs</p>
        </div>

        {/* Autonomous Delegation */}
        <div onClick={() => navigate('/delegation')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#3525CD] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] text-[#0097A7] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">smart_toy</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">Delegation Hub</p>
          <p className="text-[10px] text-[#464555]">Cross-functional tracker</p>
        </div>

        {/* Security Vault */}
        <div onClick={() => navigate('/security-vault')} className="p-3.5 bg-white rounded-2xl border border-[#E5E8F5] shadow-xs hover:border-[#D32F2F] cursor-pointer transition">
          <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] text-[#D32F2F] flex items-center justify-center mb-2">
            <span className="material-symbols-rounded text-[18px]">gpp_good</span>
          </div>
          <p className="text-xs font-bold text-[#181B25]">E2EE Security Vault</p>
          <p className="text-[10px] text-[#464555]">Backup & encryption keys</p>
        </div>
      </div>

      {/* Settings: System HUD & Notifications */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#181B25]">System HUD & Notifications</h3>
        
        {/* Sync Device Calendar */}
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

        {/* Persistent Pomodoro HUD */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center">
              <span className="material-symbols-rounded text-[22px]">timer</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#181B25]">Persistent Pomodoro Notifications</p>
              <p className="text-[10px] text-[#464555]">Keep timer active in Android notification drawer</p>
            </div>
          </div>
          <div onClick={() => setPomodoroHUD(!pomodoroHUD)} className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${pomodoroHUD ? 'bg-[#3525CD]' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${pomodoroHUD ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {/* Geofence Smart Alerts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <span className="material-symbols-rounded text-[22px]">location_on</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#181B25]">Geofence Smart Alerts</p>
              <p className="text-[10px] text-[#464555]">Notify when Context profile automatically switches</p>
            </div>
          </div>
          <div onClick={() => setGeoAlerts(!geoAlerts)} className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${geoAlerts ? 'bg-[#3525CD]' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${geoAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {/* Biometric Nagging */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center">
              <span className="material-symbols-rounded text-[22px]">monitor_heart</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#181B25]">Biometric Inactivity Nagging</p>
              <p className="text-[10px] text-[#464555]">Ping watch if sedentary for &gt; 70 minutes</p>
            </div>
          </div>
          <div onClick={() => setBioNag(!bioNag)} className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${bioNag ? 'bg-[#3525CD]' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${bioNag ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

      </div>
    </div>
  );
}
