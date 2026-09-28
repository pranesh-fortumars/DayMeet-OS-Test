import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function SearchModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.search;

  if (!isOpen) return null;

  const handleClose = () => setModalOpen('search', false);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-16 animate-in fade-in duration-200">
      {/* GLASSMORPHIC CONTAINER */}
      <div className="bg-white/80 dark:bg-[#0F172A]/70 backdrop-blur-3xl w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.2)] border border-white dark:border-white/20 animate-in slide-in-from-top-4 duration-300">
        
        {/* Search Bar */}
        <div className="flex items-center p-2 border-b border-gray-200 dark:border-white/10">
          <span className="material-symbols-rounded text-gray-500 dark:text-gray-400 pl-3">search</span>
          <input 
            type="text" 
            autoFocus
            placeholder="Search commands, notes, tasks..." 
            className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-2 text-sm text-[#181B25] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
          <button onClick={handleClose} className="px-3 py-1 rounded bg-black/5 dark:bg-white/10 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/20 transition mr-1">
            ESC
          </button>
        </div>

        {/* Suggestions */}
        <div className="p-2 space-y-1 bg-black/5 dark:bg-black/20">
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 px-3 py-1 uppercase tracking-wider">Quick Actions</p>
          
          <button onClick={() => { setModalOpen('quickAdd', true); handleClose(); }} className="w-full flex items-center justify-between p-3 hover:bg-white/50 dark:hover:bg-white/10 rounded-2xl transition group border border-transparent hover:border-white/50 dark:hover:border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E5E8F5]/80 dark:bg-white/10 text-[#3525CD] dark:text-[#818CF8] flex items-center justify-center group-hover:bg-[#3525CD] group-hover:text-white transition shadow-sm">
                <span className="material-symbols-rounded text-[20px]">add</span>
              </div>
              <span className="text-sm font-bold text-[#181B25] dark:text-white">Create New Item</span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium border border-gray-300/50 dark:border-white/20 px-1.5 py-0.5 rounded bg-white/50 dark:bg-black/20">⌘ N</span>
          </button>
          
          <button onClick={() => { setModalOpen('copilot', true); handleClose(); }} className="w-full flex items-center justify-between p-3 hover:bg-white/50 dark:hover:bg-white/10 rounded-2xl transition group border border-transparent hover:border-white/50 dark:hover:border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E5E8F5]/80 dark:bg-white/10 text-[#3525CD] dark:text-[#818CF8] flex items-center justify-center group-hover:bg-[#3525CD] group-hover:text-white transition shadow-sm">
                <span className="material-symbols-rounded text-[20px]">auto_awesome</span>
              </div>
              <span className="text-sm font-bold text-[#181B25] dark:text-white">Ask AI Copilot</span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium border border-gray-300/50 dark:border-white/20 px-1.5 py-0.5 rounded bg-white/50 dark:bg-black/20">⌘ K</span>
          </button>
        </div>
      </div>
    </div>
  );
}
