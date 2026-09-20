import React from 'react';

export default function CalendarScreen() {
  const triggerToast = (msg) => console.log('Toast:', msg);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-black text-[#181B25]">Unified Schedule</h2>
          <p className="text-xs text-[#464555]">All calendar blocks, appointments, and syncs</p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#EBEDFB] p-1 rounded-xl text-xs font-bold">
          <button className="px-3 py-1 rounded-lg bg-white text-[#181B25] shadow-xs">Timeline</button>
          <button onClick={() => triggerToast('Viewing schedule grouped by category')} className="px-3 py-1 rounded-lg text-[#464555] hover:text-[#181B25]">By Category</button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <div className="p-3 px-4 rounded-2xl bg-[#E2DFFF] text-[#3525CD] border-2 border-[#3525CD] text-center min-w-[62px] cursor-pointer">
          <p className="text-[10px] font-bold uppercase">Thu</p>
          <p className="text-lg font-black leading-none mt-1">24</p>
        </div>
        <div onClick={() => triggerToast('Oct 25: 2 meetings, 4 tasks')} className="p-3 px-4 rounded-2xl bg-white text-[#464555] border border-[#E5E8F5] text-center min-w-[62px] cursor-pointer hover:border-[#3525CD]">
          <p className="text-[10px] font-medium uppercase">Fri</p>
          <p className="text-lg font-bold leading-none mt-1">25</p>
        </div>
        {/* Simplified day selectors for React port */}
        <div onClick={() => triggerToast('Weekend Deep Rest Mode')} className="p-3 px-4 rounded-2xl bg-white text-[#464555] border border-[#E5E8F5] text-center min-w-[62px] cursor-pointer hover:border-[#3525CD]">
          <p className="text-[10px] font-medium uppercase">Sat</p>
          <p className="text-lg font-bold leading-none mt-1">26</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#F1F3FF]">
          <span className="text-xs font-bold text-[#181B25]">Today's Sequence</span>
          <span className="text-[11px] text-[#3525CD] font-semibold">Google Calendar Connected</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5]">
            <span className="text-xs font-bold text-[#3525CD] w-14">09:30 AM</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#181B25]">Product Strategy Review</p>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDE7F6] text-[#673AB7]">MEETING</span>
              </div>
              <p className="text-[11px] text-[#464555] mt-0.5">Google Meet • Alex, Sarah, David (45m)</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5]">
            <span className="text-xs font-bold text-[#3525CD] w-14">12:00 PM</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#181B25]">Finalize Mobile Design Tokens</p>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFEBEE] text-[#E53935]">PRIORITY</span>
              </div>
              <p className="text-[11px] text-[#464555] mt-0.5">Workspace sync • Due at release freeze</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
