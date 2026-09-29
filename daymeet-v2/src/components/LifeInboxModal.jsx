import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, useAnimation } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

function SwipeableInboxCard({ activeItem, onApprove, onDiscard }) {
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    // Swipe Right to Approve
    if (offset > 100 || velocity > 500) {
      controls.start({ x: '100%', opacity: 0, transition: { duration: 0.2 } }).then(() => {
        triggerHaptic('success');
        onApprove(activeItem.id);
        controls.set({ x: 0, opacity: 1 });
      });
    } 
    // Swipe Left to Discard
    else if (offset < -100 || velocity < -500) {
      controls.start({ x: '-100%', opacity: 0, transition: { duration: 0.2 } }).then(() => {
        triggerHaptic('heavy');
        onDiscard(activeItem.id);
        controls.set({ x: 0, opacity: 1 });
      });
    } 
    // Spring back
    else {
      triggerHaptic('light');
      controls.start({ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden mt-3 shadow-sm bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      {/* Background Actions Layer */}
      <div className="absolute inset-0 flex justify-between items-center px-6">
        <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
          <span className="material-symbols-rounded">delete</span> Discard
        </div>
        <div className="flex items-center gap-2 text-[#10B981] font-bold text-sm">
          Approve <span className="material-symbols-rounded">check_circle</span>
        </div>
      </div>
      
      {/* Draggable Card */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="relative z-10 bg-white dark:bg-slate-800 p-3.5 border-2 border-[#10B981] shadow-sm flex items-center justify-between cursor-grab active:cursor-grabbing rounded-xl"
      >
        <div>
          <p className="text-xs font-bold text-[#181B25] dark:text-white">{activeItem.action}</p>
          <p className="text-[10px] text-[#464555] dark:text-gray-400">Categorized as {activeItem.category}</p>
        </div>
        <span className="px-2 py-1 rounded bg-[#E8F5E9] dark:bg-[#10B981]/20 text-[#2E7D32] dark:text-[#10B981] text-[10px] font-black tracking-wide">CONFIDENCE 94%</span>
      </motion.div>
    </div>
  );
}

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
          
          if (pendingItem.imageUrl) {
            // Simulated visual AI OCR parsing
            if (text.includes('receipt') || text.includes('bill')) {
              category = 'Expense';
              action = 'Log Expense from Image';
            } else if (text.includes('flight') || text.includes('ticket')) {
              category = 'Travel';
              action = 'Extract Itinerary';
            } else {
              category = 'Note';
              action = 'Save to Knowledge Vault';
            }
          } else if (text.includes('meet') || text.includes('call')) {
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
            {activeItem.imageUrl ? (
              <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-sm border border-[#E5E8F5] dark:border-slate-700">
                <img src={activeItem.imageUrl} alt="attachment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-xl border border-white/30 dark:border-white/10 shadow-lg">
                  <p className="text-sm font-medium text-white leading-snug line-clamp-2">
                    "{activeItem.rawText}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF9FF] dark:bg-slate-800/50 p-4 rounded-2xl border border-[#E5E8F5] dark:border-slate-700 flex gap-4">
                <p className="text-sm font-medium text-[#181B25] dark:text-white leading-relaxed flex-1">
                  "{activeItem.rawText}"
                </p>
              </div>
            )}
            
            {activeItem.status === 'pending' ? (
              <div className="flex items-center gap-2 text-xs text-[#3525CD] bg-[#F1F3FF] dark:bg-[#3525CD]/10 p-3 rounded-xl border border-[#D9D7FF] dark:border-[#3525CD]/20">
                {activeItem.imageUrl ? (
                  <>
                    <span className="material-symbols-rounded animate-pulse text-[16px]">document_scanner</span>
                    <span className="font-semibold">AI OCR is scanning image...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-rounded animate-spin text-[16px]">hourglass_empty</span>
                    <span className="font-semibold">AI is analyzing context...</span>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-symbols-rounded text-[16px] text-[#10B981]">auto_awesome</span>
                  <span className="font-bold text-[#181B25] dark:text-white">Suggested Action</span>
                  <span className="ml-auto text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">Swipe to Resolve</span>
                </div>
                
                <SwipeableInboxCard activeItem={activeItem} onApprove={approveInboxItem} onDiscard={dismissInboxItem} />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
