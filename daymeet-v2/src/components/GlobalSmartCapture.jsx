import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import LifeInboxModal from './LifeInboxModal';

export default function GlobalSmartCapture() {
  const { captureToInbox, inbox } = useAppStore();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const pendingCount = inbox.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    captureToInbox(inputValue.trim());
    setInputValue('');
    setIsInputOpen(false);
    // Optionally auto-open the inbox to show the AI processing
    setIsInboxOpen(true);
  };

  return (
    <>
      {/* Floating Action Buttons above the BottomDock */}
      <div className="fixed bottom-[80px] right-4 flex flex-col items-end gap-3 z-40 pointer-events-none">
        
        {/* Inbox Badge / Opener */}
        {pendingCount > 0 && (
          <button 
            onClick={() => setIsInboxOpen(true)}
            className="pointer-events-auto relative w-12 h-12 rounded-full bg-[#181B25] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform animate-in zoom-in duration-300"
          >
            <span className="material-symbols-rounded">inbox_customize</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E53935] rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {pendingCount}
            </span>
          </button>
        )}

        {/* Main Smart Capture FAB */}
        <button 
          onClick={() => setIsInputOpen(true)}
          className="pointer-events-auto flex items-center gap-2 h-14 px-5 rounded-full bg-[#3525CD] text-white shadow-[0_8px_24px_rgba(53,37,205,0.4)] hover:bg-[#2B1DAE] active:scale-95 transition-all"
        >
          <span className="material-symbols-rounded text-[24px]">add_circle</span>
          <span className="text-sm font-bold tracking-wide">Capture</span>
        </button>
      </div>

      {/* Smart Capture Input Overlay */}
      {isInputOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#181B25] dark:text-white text-lg flex items-center gap-2">
                <span className="material-symbols-rounded text-[#3525CD]">bolt</span>
                Smart Capture
              </h3>
              <button onClick={() => setIsInputOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea 
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What's on your mind? (e.g. Renew bike insurance next month, Lunch with Sarah tomorrow at 2pm...)"
                className="w-full min-h-[120px] p-4 bg-[#FAF9FF] dark:bg-slate-800 border border-[#E5E8F5] dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#3525CD] dark:focus:border-[#3525CD] resize-none text-sm text-[#181B25] dark:text-white"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"><span className="material-symbols-rounded text-[20px]">mic</span></button>
                  <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"><span className="material-symbols-rounded text-[20px]">image</span></button>
                </div>
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="px-6 py-2.5 bg-[#3525CD] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl hover:bg-[#2B1DAE] transition flex items-center gap-2"
                >
                  <span>Send to Inbox</span>
                  <span className="material-symbols-rounded text-[18px]">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Life Inbox Processing Modal */}
      <LifeInboxModal isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
    </>
  );
}
