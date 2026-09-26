import React, { useState } from 'react';
import { useInteraction } from '../../hooks/useInteraction';

export default function CalendarModal({ isOpen, onClose }) {
  const { interact } = useInteraction();
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'year'
  const [activeMonth, setActiveMonth] = useState(9); // October (0-indexed)
  
  if (!isOpen) return null;

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const blanks = Array.from({ length: 4 }, (_, i) => i);

  const handleSelectDate = (date) => {
    interact(`Navigated to ${months[activeMonth]} ${date}`);
    onClose();
  };

  const handleSelectMonth = (idx) => {
    interact(`Switched to ${months[idx]}`);
    setActiveMonth(idx);
    setViewMode('month');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white dark:bg-[#1E293B] w-full max-w-sm rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-12 duration-500 overflow-hidden relative" onClick={e => e.stopPropagation()}>
        
        {/* Dynamic Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <button 
            onClick={() => viewMode === 'month' ? setActiveMonth(prev => Math.max(0, prev - 1)) : null}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-90 ${viewMode === 'year' ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:bg-gray-100 hover:text-[#181B25] dark:hover:bg-slate-800'}`}
          >
            <span className="material-symbols-rounded text-xl">chevron_left</span>
          </button>
          
          <button 
            onClick={() => {
              interact('Toggled Year View');
              setViewMode(viewMode === 'month' ? 'year' : 'month');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl hover:bg-[#F1F3FF] dark:hover:bg-slate-800 transition-colors active:scale-95 group"
          >
            <h3 className="font-black text-[#181B25] dark:text-white text-lg tracking-tight transition-colors group-hover:text-[#3525CD]">
              {viewMode === 'month' ? `${months[activeMonth]} 2026` : '2026'}
            </h3>
            <span className={`material-symbols-rounded text-[18px] text-[#464555] transition-transform duration-300 ${viewMode === 'year' ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          <button 
            onClick={() => viewMode === 'month' ? setActiveMonth(prev => Math.min(11, prev + 1)) : null}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-90 ${viewMode === 'year' ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:bg-gray-100 hover:text-[#181B25] dark:hover:bg-slate-800'}`}
          >
            <span className="material-symbols-rounded text-xl">chevron_right</span>
          </button>
        </div>

        {/* View Container with relative positioning for cross-fading */}
        <div className="relative min-h-[260px]">
          {/* MONTH VIEW */}
          <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${viewMode === 'month' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center mb-4">
              {days.map((day, i) => (
                <div key={i} className="text-[10px] font-black text-[#8B899C] dark:text-gray-400 uppercase tracking-wider mb-2">{day}</div>
              ))}
              {blanks.map((_, i) => (
                <div key={`blank-${i}`} className="w-10 h-10"></div>
              ))}
              {dates.map((date, index) => {
                const isToday = date === 24 && activeMonth === 9;
                const hasEvents = [5, 12, 14, 24, 28].includes(date);
                // Staggered animation delay
                const delay = `${(index * 15) + 100}ms`;
                
                return (
                  <div 
                    key={date} 
                    onClick={() => handleSelectDate(date)}
                    style={{ animationDelay: delay, animationFillMode: 'both' }}
                    className={`group w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 relative animate-in zoom-in-50 hover:scale-110 active:scale-90 ${
                      isToday 
                        ? 'bg-gradient-to-tr from-[#3525CD] to-[#6366F1] text-white shadow-[0_4px_12px_rgba(53,37,205,0.4)]' 
                        : 'text-[#181B25] dark:text-white hover:bg-[#F1F3FF] dark:hover:bg-slate-700'
                    }`}
                  >
                    {date}
                    {hasEvents && !isToday && (
                      <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#10B981] group-hover:scale-150 transition-transform"></span>
                    )}
                    {isToday && (
                      <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 animate-ping opacity-20"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* YEAR VIEW */}
          <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${viewMode === 'year' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
            <div className="grid grid-cols-3 gap-3 h-full">
              {months.map((m, idx) => {
                const isCurrent = idx === 9;
                return (
                  <div 
                    key={m}
                    onClick={() => handleSelectMonth(idx)}
                    style={{ animationDelay: `${idx * 30}ms`, animationFillMode: 'both' }}
                    className={`flex items-center justify-center rounded-2xl h-16 cursor-pointer font-bold transition-all duration-300 animate-in zoom-in-75 hover:scale-105 active:scale-95 border-2 ${
                      isCurrent 
                        ? 'bg-[#3525CD]/10 border-[#3525CD] text-[#3525CD] dark:text-[#818CF8]' 
                        : 'bg-white dark:bg-slate-800 border-transparent text-[#464555] dark:text-gray-300 shadow-sm hover:border-[#E5E8F5] hover:shadow-md'
                    }`}
                  >
                    {m}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-[#E5E8F5]/60 dark:border-slate-700/60 flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-transparent backdrop-blur-xl">
          <div className={`flex items-center gap-5 text-[10px] font-bold text-[#8B899C] transition-opacity duration-300 ${viewMode === 'year' ? 'opacity-0' : 'opacity-100'}`}>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> Assigned Tasks</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#6366F1]"></span> Today</span>
          </div>
          <button onClick={onClose} className="w-full py-3 bg-[#F1F3FF] dark:bg-slate-800 hover:bg-[#E5E8F5] text-[#3525CD] dark:text-white font-black tracking-wide rounded-2xl active:scale-[0.98] transition-all">Dismiss</button>
        </div>

      </div>
    </div>
  );
}
