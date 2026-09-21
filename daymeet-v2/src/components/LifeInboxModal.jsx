import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function LifeInboxModal({ isOpen, onClose }) {
  const { inbox, dismissInboxItem, processInboxItem, approveInboxItem } = useAppStore();
  const [activeItem, setActiveItem] = useState(null);

  // Mock AI Processing Effect
  useEffect(() => {
    if (isOpen && inbox.length > 0) {
      const pendingItem = inbox.find(i => i.status === 'pending');
      if (pendingItem) {
        setActiveItem(pendingItem);
        // Simulate network/AI delay
        const timer = setTimeout(() => {
          let category = 'Task';
          let action = 'Add to Tasks';
          
          const text = pendingItem.rawText.toLowerCase();
          if (text.includes('meet') || text.includes('call')) {
            category = 'Meeting';
            action = 'Create Calendar Event';
          } else if (text.includes('$') || text.includes('₹') || text.includes('buy') || text.includes('pay')) {
            category = 'Expense';
            action = 'Log Expense';
          } else if (text.includes('remind')) {
            category = 'Reminder';
            action = 'Set Reminder';
          }
          
          processInboxItem(pendingItem.id, category, action);
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        const processingItem = inbox.find(i => i.status === 'processing');
        if (processingItem) setActiveItem(processingItem);
        else setActiveItem(null);
      }
    }
  }, [inbox, isOpen, processInboxItem]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-transparent dark:border-slate-700 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex items-center justify-between border-b border-[#E5E8F5] dark:border-slate-700 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E2DFFF] text-[#3525CD] flex items-center justify-center">
              <span className="material-symbols-rounded text-[18px]">inbox_customize</span>
            </div>
            <div>
              <h3 className="font-bold text-[#181B25] dark:text-[#F8FAFC] text-base leading-tight">Life Inbox</h3>
              <p className="text-[10px] text-[#464555] dark:text-gray-400">{inbox.length} pending items</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 transition">✕</button>
        </div>

        {inbox.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <span className="material-symbols-rounded text-4xl text-gray-300 dark:text-slate-600">done_all</span>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inbox is empty. You're all caught up!</p>
          </div>
        ) : activeItem ? (
          <div className="space-y-4">
            <div className="bg-[#FAF9FF] dark:bg-slate-800/50 p-4 rounded-2xl border border-[#E5E8F5] dark:border-slate-700">
              <p className="text-sm font-medium text-[#181B25] dark:text-white leading-relaxed">
                "{activeItem.rawText}"
              </p>
            </div>
            
            {activeItem.status === 'pending' ? (
              <div className="flex items-center gap-2 text-xs text-[#3525CD] bg-[#F1F3FF] dark:bg-[#3525CD]/10 p-3 rounded-xl border border-[#D9D7FF] dark:border-[#3525CD]/20">
                <span className="material-symbols-rounded animate-spin text-[16px]">hourglass_empty</span>
                <span className="font-semibold">AI is analyzing context...</span>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-symbols-rounded text-[16px] text-[#10B981]">auto_awesome</span>
                  <span className="font-bold text-[#181B25] dark:text-white">Suggested Action</span>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border-2 border-[#10B981] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#181B25] dark:text-white">{activeItem.action}</p>
                    <p className="text-[10px] text-[#464555] dark:text-gray-400">Categorized as {activeItem.category}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#E8F5E9] dark:bg-[#10B981]/20 text-[#2E7D32] dark:text-[#10B981] text-[10px] font-black tracking-wide">CONFIDENCE 94%</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button onClick={() => dismissInboxItem(activeItem.id)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-100 transition">
                    Discard
                  </button>
                  <button onClick={() => approveInboxItem(activeItem.id)} className="flex-1 py-2.5 rounded-xl bg-[#3525CD] text-white text-xs font-bold hover:bg-[#2B1DAE] transition flex items-center justify-center gap-1.5 shadow-sm">
                    <span className="material-symbols-rounded text-[16px]">check_circle</span>
                    Approve
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
