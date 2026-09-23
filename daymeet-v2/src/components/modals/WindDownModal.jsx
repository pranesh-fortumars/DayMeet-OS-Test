import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function WindDownModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.windDown;
  
  const [step, setStep] = useState(1);
  const [gratitude, setGratitude] = useState('');

  if (!isOpen) return null;

  const triggerHaptic = () => Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});

  const closeModal = () => {
    triggerHaptic();
    setModalOpen('windDown', false);
    setTimeout(() => setStep(1), 300);
  };

  const nextStep = () => {
    triggerHaptic();
    if (step === 3) {
      closeModal();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#1E293B] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 text-[#F8FAFC]">
        
        {/* Header */}
        <div className="bg-[#0F172A] p-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#6366F1]/20 rounded-full blur-xl"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black mb-1 flex items-center gap-2">
                <span className="material-symbols-rounded text-[#818CF8]">nightlight</span>
                Evening Wind-Down
              </h2>
              <p className="text-[#94A3B8] text-sm">Disconnect and reflect.</p>
            </div>
            <button onClick={closeModal} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition">
              <span className="material-symbols-rounded text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="font-bold text-lg text-white">Unfinished Business</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                You have 2 tasks left today. Would you like to roll them over to tomorrow?
              </p>
              <div className="bg-[#0F172A] rounded-xl p-3 border border-[#334155] space-y-2 mt-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-[#94A3B8] text-[18px]">circle</span>
                  <span className="text-sm text-[#CBD5E1] line-through">Buy Groceries</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-[#34D399] text-[18px]">check_circle</span>
                  <span className="text-sm text-white">Call Mom</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="font-bold text-lg text-white">Gratitude Log</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                What went well today? Write one thing you are grateful for.
              </p>
              <textarea 
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="I am grateful for..."
                className="w-full h-24 bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[#818CF8] transition resize-none mt-2"
              ></textarea>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center animate-in slide-in-from-right-4 duration-300">
              <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-rounded text-[#34D399] text-[40px]">bed</span>
              </div>
              <h3 className="font-bold text-xl text-white">Screen Off</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Your day is complete. Turn on Do Not Disturb and start winding down for bed. Goodnight!
              </p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="p-6 pt-0 flex justify-between items-center">
          <div className="flex gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-6 bg-[#818CF8]' : 'w-1.5 bg-[#334155]'}`}></div>
            ))}
          </div>
          <button onClick={nextStep} className="px-6 py-2.5 rounded-xl bg-[#6366F1] text-white text-sm font-bold shadow-sm hover:bg-[#4F46E5] active:scale-95 transition">
            {step === 3 ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
