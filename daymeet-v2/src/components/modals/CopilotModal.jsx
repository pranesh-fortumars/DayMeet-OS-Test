import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function CopilotModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.copilot;

  if (!isOpen) return null;

  const handleClose = () => setModalOpen('copilot', false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF9FF] w-full max-w-lg h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3525CD] to-[#673AB7] p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-[#6FFBBE] text-[20px]">auto_awesome</span>
            <h3 className="font-bold text-sm">DayMeet Copilot</h3>
          </div>
          <button onClick={handleClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
            <span className="material-symbols-rounded text-[16px]">close</span>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#673AB7] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
              <span className="material-symbols-rounded text-[16px]">auto_awesome</span>
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#E5E8F5] shadow-sm text-sm text-[#181B25]">
              Hello! I'm your DayMeet Copilot. How can I help you organize your day, schedule a meeting, or check your finances?
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#E5E8F5] shrink-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask Copilot anything..." 
              className="w-full bg-[#FAF9FF] border border-[#E5E8F5] rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#3525CD]"
            />
            <button className="absolute right-1 top-1 w-10 h-10 rounded-full bg-[#3525CD] text-white flex items-center justify-center hover:bg-[#2B1DAE] transition shadow-sm">
              <span className="material-symbols-rounded text-[18px]">send</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
