import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function FocusSanctuaryModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.focusSanctuary;
  
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none');

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      Haptics.notification({ type: 'SUCCESS' }).catch(() => {});
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  if (!isOpen) return null;

  const triggerHaptic = () => Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});

  const toggleTimer = () => {
    triggerHaptic();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    triggerHaptic();
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const closeSanctuary = () => {
    triggerHaptic();
    setModalOpen('focusSanctuary', false);
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded text-[#818CF8]">self_improvement</span>
          <h2 className="text-[#F8FAFC] font-bold text-sm">Focus Sanctuary</h2>
        </div>
        <button onClick={closeSanctuary} className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-white transition">
          <span className="material-symbols-rounded text-[18px]">close</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        
        {/* Distraction Blocker Status */}
        <div className="bg-[#1E293B] text-[#34D399] px-4 py-2 rounded-full flex items-center gap-2 mb-12 shadow-lg">
          <span className="material-symbols-rounded text-[16px]">shield</span>
          <span className="text-xs font-bold uppercase tracking-wider">Distractions Blocked</span>
        </div>

        {/* Timer */}
        <div className="text-[96px] font-black text-white tracking-tighter tabular-nums leading-none mb-12" style={{ textShadow: '0 10px 30px rgba(129, 140, 248, 0.3)' }}>
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button onClick={resetTimer} className="w-14 h-14 rounded-full bg-[#1E293B] text-[#F8FAFC] flex items-center justify-center hover:scale-105 active:scale-95 transition">
            <span className="material-symbols-rounded text-[24px]">replay</span>
          </button>
          <button onClick={toggleTimer} className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 transition ${isActive ? 'bg-[#EF4444]' : 'bg-[#6366F1]'}`}>
            <span className="material-symbols-rounded text-white text-[32px]">{isActive ? 'pause' : 'play_arrow'}</span>
          </button>
          <button className="w-14 h-14 rounded-full bg-[#1E293B] text-[#F8FAFC] flex items-center justify-center hover:scale-105 active:scale-95 transition">
            <span className="material-symbols-rounded text-[24px]">skip_next</span>
          </button>
        </div>
      </div>

      {/* Ambient Sounds Dock */}
      <div className="bg-[#1E293B] rounded-t-3xl p-6 pb-safe">
        <h3 className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-4">Ambient Acoustics</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'none', icon: 'volume_off', label: 'None' },
            { id: 'rain', icon: 'rainy', label: 'Heavy Rain' },
            { id: 'noise', icon: 'waves', label: 'White Noise' },
            { id: 'binaural', icon: 'headphones', label: 'Binaural Beats' },
            { id: 'cafe', icon: 'local_cafe', label: 'Lo-Fi Cafe' }
          ].map((sound) => (
            <button
              key={sound.id}
              onClick={() => { triggerHaptic(); setAmbientSound(sound.id); }}
              className={`flex flex-col items-center justify-center min-w-[80px] h-[80px] rounded-2xl transition ${
                ambientSound === sound.id ? 'bg-[#6366F1] text-white shadow-md' : 'bg-[#0F172A] text-[#94A3B8] hover:bg-[#334155]'
              }`}
            >
              <span className="material-symbols-rounded text-[24px] mb-1">{sound.icon}</span>
              <span className="text-[10px] font-bold">{sound.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
