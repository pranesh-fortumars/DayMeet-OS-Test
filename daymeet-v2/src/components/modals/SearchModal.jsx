import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function SearchModal() {
  const { modals, setModalOpen } = useAppStore();
  const isOpen = modals.search;

  if (!isOpen) return null;

  const handleClose = () => setModalOpen('search', false);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-16 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-300">
        
        {/* Search Bar */}
        <div className="flex items-center p-2 border-b border-gray-100">
          <span className="material-symbols-rounded text-gray-400 pl-3">search</span>
          <input 
            type="text" 
            autoFocus
            placeholder="Search commands, notes, tasks..." 
            className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-2 text-sm text-[#181B25] placeholder-gray-400"
          />
          <button onClick={handleClose} className="px-3 py-1 rounded bg-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-200 transition mr-1">
            ESC
          </button>
        </div>

        {/* Suggestions */}
        <div className="p-2 space-y-1 bg-[#FAF9FF]">
          <p className="text-[10px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">Quick Actions</p>
          
          <button onClick={() => { setModalOpen('quickAdd', true); handleClose(); }} className="w-full flex items-center justify-between p-3 hover:bg-white rounded-xl transition group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5E8F5] text-[#3525CD] flex items-center justify-center group-hover:bg-[#3525CD] group-hover:text-white transition">
                <span className="material-symbols-rounded text-[18px]">add</span>
              </div>
              <span className="text-sm font-bold text-[#181B25]">Create New Item</span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium border border-gray-200 px-1.5 rounded">⌘ N</span>
          </button>
          
          <button onClick={() => { setModalOpen('copilot', true); handleClose(); }} className="w-full flex items-center justify-between p-3 hover:bg-white rounded-xl transition group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5E8F5] text-[#3525CD] flex items-center justify-center group-hover:bg-[#3525CD] group-hover:text-white transition">
                <span className="material-symbols-rounded text-[18px]">auto_awesome</span>
              </div>
              <span className="text-sm font-bold text-[#181B25]">Ask AI Copilot</span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium border border-gray-200 px-1.5 rounded">⌘ K</span>
          </button>
        </div>
      </div>
    </div>
  );
}
