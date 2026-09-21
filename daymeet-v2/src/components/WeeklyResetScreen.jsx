import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInteraction } from '../hooks/useInteraction';

export default function WeeklyResetScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState(['', '', '']);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const completeReset = () => navigate('/more');

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white border border-[#E5E8F5] flex items-center justify-center text-[#464555] hover:bg-gray-50 transition">
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181B25]">Weekly Reset</h1>
          <p className="text-xs text-[#464555]">Step {step} of 3: {['Review', 'Clean', 'Plan'][step - 1]}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2">
        <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#3525CD]' : 'bg-[#E5E8F5]'} transition-colors duration-300`}></div>
        <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#3525CD]' : 'bg-[#E5E8F5]'} transition-colors duration-300`}></div>
        <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-[#3525CD]' : 'bg-[#E5E8F5]'} transition-colors duration-300`}></div>
      </div>

      {/* Step 1: Review */}
      {step === 1 && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white p-5 rounded-3xl border border-[#E5E8F5] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0288D1] flex items-center justify-center mb-2">
              <span className="material-symbols-rounded text-[24px]">insights</span>
            </div>
            <h2 className="text-lg font-bold text-[#181B25]">Review Your Week</h2>
            <p className="text-sm text-[#464555]">Take a moment to reflect on what you accomplished over the past 7 days.</p>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#FAF9FF] rounded-xl border border-[#E5E8F5]">
                <p className="text-xl font-black text-[#3525CD]">14</p>
                <p className="text-xs text-[#464555]">Tasks Completed</p>
              </div>
              <div className="p-3 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                <p className="text-xl font-black text-[#2E7D32]">8</p>
                <p className="text-xs text-[#464555]">Habits Hit</p>
              </div>
              <div className="p-3 bg-[#FFF3E0] rounded-xl border border-[#FFE0B2]">
                <p className="text-xl font-black text-[#F57C00]">₹12.4k</p>
                <p className="text-xs text-[#464555]">Total Spent</p>
              </div>
              <div className="p-3 bg-[#FFEBEE] rounded-xl border border-[#FFCDD2]">
                <p className="text-xl font-black text-[#D32F2F]">7h 12m</p>
                <p className="text-xs text-[#464555]">Avg Sleep</p>
              </div>
            </div>
          </div>
          <button onClick={() => { interact('Continue to Cleanup'); nextStep(); }} className="w-full py-3.5 bg-[#3525CD] text-white text-sm font-bold rounded-2xl hover:bg-[#2B1DAE] active:scale-[0.98] transition shadow-sm">
            Continue to Cleanup
          </button>
        </div>
      )}

      {/* Step 2: Clean */}
      {step === 2 && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white p-5 rounded-3xl border border-[#E5E8F5] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-2">
              <span className="material-symbols-rounded text-[24px]">cleaning_services</span>
            </div>
            <h2 className="text-lg font-bold text-[#181B25]">Clean Up Digital Space</h2>
            <p className="text-sm text-[#464555]">Clear out the stale items to start fresh.</p>
            
            <div className="bg-[#FAF9FF] p-4 rounded-xl border border-[#E5E8F5] flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#181B25]">3 items found</p>
                <p className="text-[11px] text-[#464555]">Old tasks & subscriptions</p>
              </div>
              <button onClick={() => { interact('Review Cleanup Items'); navigate('/cleanup'); }} className="px-4 py-2 rounded-xl bg-white border border-[#3525CD] text-[#3525CD] text-xs font-bold hover:bg-[#F1F3FF] active:scale-[0.95] transition">
                Review Items
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => { interact('Back from Cleanup'); prevStep(); }} className="flex-1 py-3.5 bg-white border border-[#E5E8F5] text-[#464555] text-sm font-bold rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition">
              Back
            </button>
            <button onClick={() => { interact('Next: Plan Ahead'); nextStep(); }} className="flex-1 py-3.5 bg-[#3525CD] text-white text-sm font-bold rounded-2xl hover:bg-[#2B1DAE] active:scale-[0.98] transition shadow-sm">
              Next: Plan Ahead
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Plan */}
      {step === 3 && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white p-5 rounded-3xl border border-[#E5E8F5] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center mb-2">
              <span className="material-symbols-rounded text-[24px]">flag</span>
            </div>
            <h2 className="text-lg font-bold text-[#181B25]">Set Your Intentions</h2>
            <p className="text-sm text-[#464555]">What are the 3 most important goals for this upcoming week?</p>
            
            <div className="space-y-3 pt-2">
              {[1, 2, 3].map((num, idx) => (
                <div key={num} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#F1F3FF] text-[#3525CD] text-xs font-bold flex items-center justify-center shrink-0">{num}</span>
                  <input 
                    type="text" 
                    placeholder={`Weekly Goal ${num}...`}
                    value={goals[idx]}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[idx] = e.target.value;
                      setGoals(newGoals);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E8F5] text-sm focus:outline-none focus:border-[#3525CD]"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => { interact('Back from Plan'); prevStep(); }} className="flex-1 py-3.5 bg-white border border-[#E5E8F5] text-[#464555] text-sm font-bold rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition">
              Back
            </button>
            <button onClick={() => { interact('Finish Reset'); completeReset(); }} className="flex-1 py-3.5 bg-[#10B981] text-white text-sm font-bold rounded-2xl hover:bg-[#059669] active:scale-[0.98] transition shadow-sm flex items-center justify-center gap-1.5">
              <span className="material-symbols-rounded text-[18px]">task_alt</span> Finish Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
