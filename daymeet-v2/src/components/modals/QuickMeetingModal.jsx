import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function QuickMeetingModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.quickMeeting;
  const [platform, setPlatform] = useState('Google Meet');

  if (!isOpen) return null;

  const handleClose = () => setModalOpen('quickMeeting', false);

  const handleSchedule = () => {
    console.log(`Scheduled a 30m meeting on ${platform}`);
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-0">
          <h3 className="font-black text-lg text-[#181B25]">Quick Schedule</h3>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <span className="material-symbols-rounded text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#464555] uppercase tracking-wider">With Who?</label>
            <input 
              type="text" 
              placeholder="Name or email..." 
              autoFocus
              className="w-full bg-[#FAF9FF] border border-[#E5E8F5] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#3525CD]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#464555] uppercase tracking-wider">Duration</label>
            <div className="flex gap-2">
              {['15m', '30m', '1h'].map(dur => (
                <button 
                  key={dur}
                  className="flex-1 py-1.5 border border-[#E5E8F5] rounded-lg text-xs font-bold hover:bg-[#FAF9FF] transition"
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#464555] uppercase tracking-wider">Platform</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setPlatform('Google Meet')}
                className={`py-2 border rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${platform === 'Google Meet' ? 'border-[#3525CD] bg-[#F1F3FF] text-[#3525CD]' : 'border-[#E5E8F5] text-[#464555]'}`}
              >
                <span className="material-symbols-rounded text-[20px]">videocam</span>
                Google Meet
              </button>
              <button 
                onClick={() => setPlatform('Zoom')}
                className={`py-2 border rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${platform === 'Zoom' ? 'border-[#3525CD] bg-[#F1F3FF] text-[#3525CD]' : 'border-[#E5E8F5] text-[#464555]'}`}
              >
                <span className="material-symbols-rounded text-[20px]">switch_video</span>
                Zoom
              </button>
            </div>
          </div>

          <button onClick={handleSchedule} className="w-full h-11 rounded-xl bg-[#3525CD] text-white font-bold text-sm shadow-sm hover:bg-[#2B1DAE] transition mt-2">
            Find Time & Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}
