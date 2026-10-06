import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { motion, AnimatePresence } from 'framer-motion';

export default function FocusSanctuaryModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.focusSanctuary;
  
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none');
  const [ripples, setRipples] = useState([]);

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

  const toggleTimer = (e) => {
    e.stopPropagation();
    triggerHaptic();
    setIsActive(!isActive);
  };

  const resetTimer = (e) => {
    e.stopPropagation();
    triggerHaptic();
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const closeSanctuary = (e) => {
    e.stopPropagation();
    triggerHaptic();
    setModalOpen('focusSanctuary', false);
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const handleScreenTap = (e) => {
    if (!isActive) return; // Only show ripples in deep focus mode
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    
    triggerHaptic();
    
    // Cleanup ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleScreenTap}
      className="fixed inset-0 bg-[#020617] z-[99999] flex flex-col overflow-hidden"
    >
      {/* Cinematic Breathing Orb (Background) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.15, 1], 
                opacity: [0.3, 0.6, 0.3],
                filter: ['blur(40px)', 'blur(60px)', 'blur(40px)']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[80vw] h-[80vw] max-w-md max-h-md rounded-full bg-gradient-to-tr from-[#6366F1] via-[#8B5CF6] to-[#D946EF] mix-blend-screen"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Liquid Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute rounded-full border border-white/30 pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            boxShadow: '0 0 20px rgba(255,255,255,0.2) inset'
          }}
        />
      ))}

      {/* Header (Fades out when active) */}
      <AnimatePresence>
        {!isActive && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-between items-center p-6 relative z-10"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-rounded text-[#818CF8]">self_improvement</span>
              <h2 className="text-[#F8FAFC] font-bold text-sm tracking-widest uppercase">Focus Sanctuary</h2>
            </div>
            <button onClick={closeSanctuary} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[#94A3B8] hover:text-white transition">
              <span className="material-symbols-rounded text-[20px]">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content (Timer) */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 pointer-events-none">
        
        <AnimatePresence>
          {!isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/10 backdrop-blur-md text-[#34D399] px-4 py-2 rounded-full flex items-center gap-2 mb-12 border border-white/10 shadow-xl"
            >
              <span className="material-symbols-rounded text-[16px]">shield</span>
              <span className="text-xs font-bold uppercase tracking-wider">Distractions Blocked</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="text-[120px] font-black text-white tracking-tighter tabular-nums leading-none mb-12 pointer-events-auto" 
          style={{ textShadow: isActive ? '0 0 60px rgba(139, 92, 246, 0.8)' : '0 10px 30px rgba(0,0,0,0.5)' }}
          onClick={toggleTimer} // Allow tapping the timer to play/pause directly
        >
          {formatTime(timeLeft)}
        </motion.div>

        {/* Floating Pause instruction when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-[20%]"
            >
              <p className="text-white text-xs font-medium tracking-widest uppercase animate-pulse">Tap time to pause</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls (Fades out when active) */}
        <AnimatePresence>
          {!isActive && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center gap-6 pointer-events-auto"
            >
              <button onClick={resetTimer} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition border border-white/10">
                <span className="material-symbols-rounded text-[24px]">replay</span>
              </button>
              <button onClick={toggleTimer} className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition bg-white text-[#6366F1]">
                <span className="material-symbols-rounded text-[32px]">play_arrow</span>
              </button>
              <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition border border-white/10">
                <span className="material-symbols-rounded text-[24px]">skip_next</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient Sounds Dock (Fades out when active) */}
      <AnimatePresence>
        {!isActive && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="bg-white/5 backdrop-blur-xl border-t border-white/10 rounded-t-[40px] p-6 pb-10 relative z-10 pointer-events-auto"
          >
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 pl-2">Ambient Acoustics</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {[
                { id: 'none', icon: 'volume_off', label: 'None' },
                { id: 'rain', icon: 'rainy', label: 'Heavy Rain' },
                { id: 'noise', icon: 'waves', label: 'White Noise' },
                { id: 'binaural', icon: 'headphones', label: 'Binaural Beats' },
                { id: 'cafe', icon: 'local_cafe', label: 'Lo-Fi Cafe' }
              ].map((sound) => (
                <button
                  key={sound.id}
                  onClick={(e) => { e.stopPropagation(); triggerHaptic(); setAmbientSound(sound.id); }}
                  className={`flex flex-col items-center justify-center min-w-[80px] h-[80px] rounded-3xl transition ${
                    ambientSound === sound.id 
                    ? 'bg-white text-[#0F172A] shadow-[0_10px_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/5'
                  }`}
                >
                  <span className="material-symbols-rounded text-[24px] mb-1">{sound.icon}</span>
                  <span className="text-[10px] font-bold">{sound.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
