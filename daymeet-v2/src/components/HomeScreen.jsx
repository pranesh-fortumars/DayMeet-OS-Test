import React from 'react';

export default function HomeScreen() {
  const triggerToast = (msg) => console.log('Toast:', msg);
  const openBriefingModal = () => console.log('Briefing Modal');
  const switchTab = (tab) => console.log('Switch Tab:', tab);
  const payBill = (id) => console.log('Pay Bill:', id);
  const openQuickScheduleMeetingModal = () => console.log('Quick Meeting');
  const openQuickAddWith = (type) => console.log('Quick Add:', type);

  return (
    <div className="space-y-4">
      {/* 1. Header Greeting & Weather Strip */}
      <div className="pt-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#181B25] tracking-tight">Good morning, Alex</h1>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#6FFBBE]/40 text-[#005338] border border-[#6FFBBE]">
            33 Modules Synced
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-[#464555] font-medium flex-wrap">
          <span>Thursday, Oct 24</span>
          <span className="text-[#C7C4D8]">•</span>
          <span className="inline-flex items-center gap-1 text-[#D97706]">
            <span className="material-symbols-rounded text-[15px]">wb_sunny</span>
            72°F Sunny (10% rain)
          </span>
          <span className="text-[#C7C4D8]">•</span>
          <span>New York</span>
        </div>
      </div>

      {/* 2. Daily Briefing Card */}
      <div className="bg-white rounded-[18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E8F5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-rounded text-[#3525CD] text-[18px]">auto_awesome</span>
            <h2 className="text-sm font-bold text-[#181B25]">Daily Briefing</h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E2DFFF] text-[#3525CD]">
            Auto-Synced
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3 text-center">
          <div className="p-1">
            <p className="text-lg font-bold text-[#181B25] leading-tight">3</p>
            <p className="text-[11px] text-[#464555]">Meetings</p>
          </div>
          <div className="p-1">
            <p className="text-lg font-bold text-[#181B25] leading-tight">6</p>
            <p className="text-[11px] text-[#464555]">Tasks</p>
          </div>
          <div className="p-1">
            <p className="text-lg font-bold text-[#181B25] leading-tight">₹3,450</p>
            <p className="text-[11px] text-[#464555]">Spent</p>
          </div>
          <div className="p-1">
            <p className="text-lg font-bold text-[#181B25] leading-tight">7.8k</p>
            <p className="text-[11px] text-[#464555]">Steps</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-3.5 pt-2 border-t border-[#F1F3FF]">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-full bg-[#E5E8F5] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#3525CD] h-full rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
            </div>
            <span className="text-[11px] text-[#464555] whitespace-nowrap font-medium">2/6 Done</span>
          </div>
          <button onClick={openBriefingModal} className="px-3.5 py-1.5 rounded-full bg-[#3525CD] text-white text-xs font-bold hover:bg-[#2B1DAE] transition whitespace-nowrap flex items-center gap-1 shadow-sm">
            <span>Start My Day</span>
            <span className="material-symbols-rounded text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* 3. Hero Next Meeting Card */}
      <div className="bg-white rounded-[18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E8F5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#E2DFFF] flex items-center justify-center text-[#3525CD]">
              <span className="material-symbols-rounded text-[20px]">videocam</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFEBEE] text-[#D32F2F]">In 20m</span>
                <span className="text-[11px] text-[#464555] font-medium">09:30 AM - 10:15 AM</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#E5E8F5] text-[#3525CD]">Google Meet</span>
        </div>

        <h4 className="text-base font-bold text-[#181B25] mt-2.5">Product Strategy Review</h4>

        <div className="flex items-center justify-between mt-3 pt-2">
          <div className="flex items-center -space-x-2 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-[#4F46E5] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">AC</div>
            <div className="w-7 h-7 rounded-full bg-[#39B8FD] text-[#004666] text-[9px] font-bold flex items-center justify-center ring-2 ring-white">ML</div>
            <div className="w-7 h-7 rounded-full bg-[#006E4B] text-[#67F4B7] text-[9px] font-bold flex items-center justify-center ring-2 ring-white">DK</div>
            <div className="w-7 h-7 rounded-full bg-[#E5E8F5] text-[#464555] text-[10px] font-bold flex items-center justify-center ring-2 ring-white">+4</div>
          </div>

          <button onClick={() => triggerToast('Connecting to Google Meet room...')} className="h-[38px] px-4 rounded-xl bg-[#3525CD] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2B1DAE] transition shadow-sm">
            <span className="material-symbols-rounded text-[16px]">videocam</span>
            <span>Join Meeting</span>
          </button>
        </div>
      </div>
      
      {/* 4. Quick Capture Hub */}
      <div className="bg-white rounded-[18px] p-4 border border-[#E5E8F5] shadow-sm mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#181B25]">Quick Capture Hub</h3>
          <span className="text-[11px] text-[#464555]">Tap to create</span>
        </div>
        <div className="grid grid-cols-6 gap-2 text-center">
          <div onClick={openQuickScheduleMeetingModal} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#EDE7F6] text-[#673AB7] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">calendar_today</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Meeting</p>
          </div>
          <div onClick={() => openQuickAddWith('Task')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#FFEBEE] text-[#E53935] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">check_circle</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Task</p>
          </div>
          <div onClick={() => openQuickAddWith('Expense')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">account_balance_wallet</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Expense</p>
          </div>
          <div onClick={() => openQuickAddWith('Note')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#E3F2FD] text-[#1976D2] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">edit_note</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Note</p>
          </div>
          <div onClick={() => openQuickAddWith('Habit')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">local_fire_department</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Habit</p>
          </div>
          <div onClick={() => openQuickAddWith('Health Entry')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#E0F2F1] text-[#00897B] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">favorite_border</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Health</p>
          </div>
        </div>
      </div>
    </div>
  );
}
