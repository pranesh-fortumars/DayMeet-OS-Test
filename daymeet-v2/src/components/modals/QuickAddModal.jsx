import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickAddModal() {
  const { modals, setModalOpen, addTask } = useAppStore();
  const isOpen = modals.quickAdd;
  const [activeCategory, setActiveCategory] = useState('Task');
  const [priority, setPriority] = useState('p2');
  const [inputText, setInputText] = useState('');

  const handleClose = () => {
    setModalOpen('quickAdd', false);
    setTimeout(() => setInputText(''), 300); // Reset input after exit animation
  };

  const handleCreate = () => {
    if (!inputText.trim()) return;
    
    if (activeCategory === 'Task') {
      addTask({
        title: inputText,
        subtitle: 'Created via Quick Add',
        tag: 'Task',
        tagType: 'priority',
        priority: priority.toUpperCase(),
        profile: 'Personal'
      });
    } else {
      console.log(`Created: ${activeCategory} -> ${inputText}`);
    }
    
    handleClose();
  };

  const categories = [
    { name: 'Task', icon: 'check_circle', color: 'text-[#E53935]', bg: 'bg-[#FFEBEE]' },
    { name: 'Meeting', icon: 'calendar_today', color: 'text-[#673AB7]', bg: 'bg-[#EDE7F6]' },
    { name: 'Finance', icon: 'account_balance_wallet', color: 'text-[#2E7D32]', bg: 'bg-[#E8F5E9]' },
    { name: 'Habit', icon: 'local_fire_department', color: 'text-[#F57C00]', bg: 'bg-[#FFF3E0]' },
    { name: 'Health', icon: 'favorite', color: 'text-[#0288D1]', bg: 'bg-[#E0F2FE]' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div 
            layoutId="quickAdd-fab"
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.3)] relative z-10"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-100">
              <h3 className="font-black text-lg text-[#181B25]">Quick Add</h3>
              <button onClick={handleClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <span className="material-symbols-rounded text-[18px]">close</span>
              </button>
            </div>

        <div className="p-4 space-y-4">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all ${
                  activeCategory === cat.name 
                    ? `${cat.bg} ${cat.color} border border-${cat.color}/20` 
                    : 'bg-gray-50 text-gray-500 border border-transparent'
                }`}
              >
                <span className="material-symbols-rounded text-[14px]">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-[#FAF9FF] border border-[#E5E8F5] focus-within:border-[#3525CD] focus-within:ring-2 focus-within:ring-[#3525CD]/20 rounded-2xl p-4 transition-all duration-200 shadow-inner">
            <textarea 
              autoFocus
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`E.g. Pay internet bill tomorrow...`}
              className="w-full text-base font-medium text-[#181B25] placeholder-gray-400 bg-transparent border-none resize-none focus:ring-0 focus:outline-none outline-none p-0"
              rows="3"
            ></textarea>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <button onClick={() => setPriority('p1')} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${priority === 'p1' ? 'bg-[#FFEBEE] text-[#D32F2F]' : 'bg-gray-100 text-gray-500'}`}>P1</button>
              <button onClick={() => setPriority('p2')} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${priority === 'p2' ? 'bg-[#FFF3E0] text-[#F57C00]' : 'bg-gray-100 text-gray-500'}`}>P2</button>
              <button onClick={() => setPriority('p3')} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${priority === 'p3' ? 'bg-[#E3F2FD] text-[#1976D2]' : 'bg-gray-100 text-gray-500'}`}>P3</button>
            </div>
            
            <button onClick={handleCreate} className="h-10 px-6 rounded-xl bg-[#3525CD] text-white font-bold text-sm shadow-sm hover:bg-[#2B1DAE] transition flex items-center gap-2">
              <span>Create</span>
              <span className="material-symbols-rounded text-[16px]">send</span>
            </button>
          </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
