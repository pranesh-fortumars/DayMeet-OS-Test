import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function BriefingModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.briefing;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF9FF] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-[#3525CD] p-6 text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black mb-1">Morning Briefing</h2>
              <p className="text-[#E2DFFF] text-sm">Thursday, Oct 24 • New York</p>
            </div>
            <button onClick={() => setModalOpen('briefing', false)} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <span className="material-symbols-rounded text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-[#464555] leading-relaxed">
            Good morning, Alex. You have a busy day ahead. The weather is currently <strong className="text-[#D97706]">72°F and sunny</strong>. Your first meeting is in <strong className="text-[#D32F2F]">20 minutes</strong>.
          </p>

          <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-3">
            <h3 className="font-bold text-[#181B25] text-sm flex items-center gap-2">
              <span className="material-symbols-rounded text-[#3525CD] text-[18px]">schedule</span>
              Today's Key Events
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-xs">
                <span className="text-[#181B25] font-medium">09:30 AM</span>
                <span className="text-[#464555]">Product Strategy Review</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-[#181B25] font-medium">01:00 PM</span>
                <span className="text-[#464555]">Lunch with Sarah</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-[#181B25] font-medium">03:45 PM</span>
                <span className="text-[#464555]">Weekly Sync (Marketing)</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#E8F5E9] rounded-2xl p-4 border border-[#C8E6C9] flex items-center gap-3">
            <span className="material-symbols-rounded text-[#2E7D32] text-[24px]">task_alt</span>
            <p className="text-xs text-[#2E7D32] font-medium leading-tight">
              You've already completed <strong>2 tasks</strong> today. Keep the momentum going!
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="p-5 pt-0">
          <button onClick={() => setModalOpen('briefing', false)} className="w-full py-3 rounded-xl bg-[#181B25] text-white font-bold shadow-sm hover:bg-black transition">
            Let's Go
          </button>
        </div>
      </div>
    </div>
  );
}
