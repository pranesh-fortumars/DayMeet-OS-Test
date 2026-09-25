import React from 'react';
import { useInteraction } from '../../hooks/useInteraction';

export default function CalendarModal({ isOpen, onClose }) {
  const { interact } = useInteraction();
  if (!isOpen) return null;

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // Mock dates for October 2026
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const blanks = Array.from({ length: 4 }, (_, i) => i); // Starts on Thursday

  const handleSelectDate = (date) => {
    interact(`Navigated to October ${date}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white dark:bg-[#1E293B] w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"><span className="material-symbols-rounded text-lg">chevron_left</span></button>
          <h3 className="font-black text-[#181B25] dark:text-white text-lg">October 2026</h3>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"><span className="material-symbols-rounded text-lg">chevron_right</span></button>
        </div>

        <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center mb-4">
          {days.map((day, i) => (
            <div key={i} className="text-[10px] font-bold text-[#464555] dark:text-gray-400 uppercase">{day}</div>
          ))}
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="w-8 h-8"></div>
          ))}
          {dates.map(date => {
            const isToday = date === 24;
            const hasEvents = [5, 12, 14, 24, 28].includes(date);
            return (
              <div 
                key={date} 
                onClick={() => handleSelectDate(date)}
                className={`w-9 h-9 mx-auto flex items-center justify-center rounded-full text-sm cursor-pointer transition relative ${
                  isToday 
                    ? 'bg-[#3525CD] text-white font-bold shadow-md' 
                    : 'text-[#181B25] dark:text-white hover:bg-[#F1F3FF] dark:hover:bg-slate-700'
                }`}
              >
                {date}
                {hasEvents && !isToday && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#10B981]"></span>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-[#E5E8F5] dark:border-slate-700 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-4 text-[10px] font-bold text-[#464555] dark:text-gray-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Assigned Tasks</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3525CD]"></span> Current Day</span>
          </div>
          <button onClick={onClose} className="w-full py-2.5 bg-gray-100 dark:bg-slate-800 text-[#181B25] dark:text-white font-bold rounded-xl active:scale-95 transition">Done</button>
        </div>
      </div>
    </div>
  );
}
