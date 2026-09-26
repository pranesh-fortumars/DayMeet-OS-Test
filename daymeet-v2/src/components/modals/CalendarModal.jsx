import React, { useState, useEffect } from 'react';
import { useInteraction } from '../../hooks/useInteraction';

export default function CalendarModal({ isOpen, onClose }) {
  const { interact } = useInteraction();
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'year'
  const [activeMonth, setActiveMonth] = useState(9); // October (0-indexed)
  const [selectedDate, setSelectedDate] = useState(24);
  const [isExpanding, setIsExpanding] = useState(false);
  
  // Apple Calendar style smooth transitions
  useEffect(() => {
    if (isOpen) {
      setIsExpanding(true);
      setTimeout(() => setIsExpanding(false), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const blanks = Array.from({ length: 4 }, (_, i) => i);

  // Mock Google Calendar style events for the timeline
  const mockEvents = {
    24: [
      { id: 1, title: 'Product Strategy Review', time: '09:30 AM', duration: '45m', type: 'video', color: 'bg-[#4285F4]', text: 'text-white' },
      { id: 2, title: 'Lunch with Sarah', time: '12:30 PM', duration: '1h', type: 'restaurant', color: 'bg-[#F4B400]', text: 'text-white' },
      { id: 3, title: 'Deep Work Block', time: '02:00 PM', duration: '2h', type: 'laptop_mac', color: 'bg-[#E5E8F5]', text: 'text-[#181B25]' },
    ],
    28: [
      { id: 4, title: 'Flight to London (LHR)', time: '08:00 AM', duration: '11h', type: 'flight_takeoff', color: 'bg-[#0F172A]', text: 'text-white' },
    ],
    12: [
      { id: 5, title: 'Dentist Appointment', time: '10:00 AM', duration: '1h', type: 'medical_services', color: 'bg-[#0F9D58]', text: 'text-white' },
    ]
  };

  const handleSelectDate = (date) => {
    interact(`Selected ${months[activeMonth]} ${date}`);
    setSelectedDate(date);
  };

  const currentEvents = mockEvents[selectedDate] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-300" onClick={onClose}>
      
      {/* iOS Modal Bottom Sheet / Desktop Centered Window */}
      <div 
        className={`bg-[#FAF9FF] dark:bg-[#0F172A] w-full max-w-[420px] sm:rounded-[40px] rounded-t-[40px] shadow-[0_-10px_60px_rgba(0,0,0,0.2)] overflow-hidden relative flex flex-col max-h-[90vh] transition-transform duration-500 cubic-bezier(0.32,0.72,0,1) ${isExpanding ? 'translate-y-[100%] scale-95' : 'translate-y-0 scale-100'}`}
        onClick={e => e.stopPropagation()}
      >
        
        {/* Notch for mobile */}
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mt-4 sm:hidden"></div>

        {/* Premium Header (Apple Calendar Vibe) */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between bg-white dark:bg-[#1E293B] shadow-sm z-20 relative">
          <button 
            onClick={() => viewMode === 'month' ? setActiveMonth(prev => Math.max(0, prev - 1)) : null}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#3525CD] dark:text-[#818CF8] hover:bg-[#F1F3FF] dark:hover:bg-slate-800 transition active:scale-90"
          >
            <span className="material-symbols-rounded text-[24px]">chevron_left</span>
          </button>
          
          <button 
            onClick={() => {
              interact('Toggled Year View');
              setViewMode(viewMode === 'month' ? 'year' : 'month');
            }}
            className="flex items-center gap-1 hover:opacity-70 transition active:scale-95"
          >
            <h2 className="text-xl font-black text-[#181B25] dark:text-white tracking-tight">
              {viewMode === 'month' ? `${months[activeMonth]} 2026` : '2026'}
            </h2>
            <span className={`material-symbols-rounded text-[#3525CD] dark:text-[#818CF8] transition-transform duration-500 ${viewMode === 'year' ? 'rotate-180' : ''}`}>
              keyboard_arrow_down
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => viewMode === 'month' ? setActiveMonth(prev => Math.min(11, prev + 1)) : null}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3525CD] dark:text-[#818CF8] hover:bg-[#F1F3FF] dark:hover:bg-slate-800 transition active:scale-90"
            >
              <span className="material-symbols-rounded text-[24px]">chevron_right</span>
            </button>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200 transition active:scale-90 sm:hidden">
              <span className="material-symbols-rounded text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-[#1E293B] relative">
          
          {/* Calendar Grid Area */}
          <div className="px-6 py-4 relative min-h-[300px]">
            
            {/* MONTH VIEW */}
            <div className={`absolute inset-0 px-6 py-4 transition-all duration-500 cubic-bezier(0.4,0,0.2,1) ${viewMode === 'month' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 pointer-events-none'}`}>
              <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center">
                {days.map((day, i) => (
                  <div key={i} className="text-[11px] font-bold text-[#8B899C] dark:text-gray-400 uppercase tracking-widest mb-1">{day}</div>
                ))}
                {blanks.map((_, i) => (
                  <div key={`blank-${i}`} className="w-10 h-10"></div>
                ))}
                {dates.map((date, index) => {
                  const isToday = date === 24 && activeMonth === 9;
                  const isSelected = date === selectedDate;
                  const hasEvents = !!mockEvents[date];
                  
                  return (
                    <div 
                      key={date} 
                      onClick={() => handleSelectDate(date)}
                      className={`relative w-10 h-10 mx-auto flex items-center justify-center rounded-full text-[15px] cursor-pointer transition-all duration-300 group ${
                        isSelected && !isToday
                          ? 'bg-[#181B25] dark:bg-white text-white dark:text-black font-bold shadow-md transform scale-110' 
                          : isToday 
                            ? 'bg-[#DB4437] text-white font-bold shadow-[0_4px_12px_rgba(219,68,55,0.4)] transform scale-110' // Google Calendar Red for Today
                            : 'text-[#181B25] dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {date}
                      {/* Apple Calendar style event dot */}
                      {hasEvents && !isToday && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                      )}
                      {hasEvents && isSelected && !isToday && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white dark:bg-black"></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* YEAR VIEW */}
            <div className={`absolute inset-0 px-6 py-4 transition-all duration-500 cubic-bezier(0.4,0,0.2,1) ${viewMode === 'year' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
              <div className="grid grid-cols-3 gap-4 h-full">
                {months.map((m, idx) => {
                  const isCurrent = idx === 9;
                  return (
                    <div 
                      key={m}
                      onClick={() => handleSelectMonth(idx)}
                      className={`flex items-center justify-center rounded-2xl h-16 cursor-pointer text-sm font-bold transition-all duration-300 border-2 ${
                        isCurrent 
                          ? 'bg-[#DB4437]/10 border-[#DB4437] text-[#DB4437]' 
                          : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-[#464555] dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      {m}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Google Calendar Style Timeline */}
          <div className={`bg-[#FAF9FF] dark:bg-[#0F172A] min-h-[300px] pb-8 rounded-t-[32px] pt-6 px-6 transition-transform duration-500 ${viewMode === 'year' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-[#181B25] dark:text-white flex items-center gap-2">
                {selectedDate === 24 ? 'Today' : `${months[activeMonth]} ${selectedDate}`}
                <span className="text-sm font-medium text-gray-400">· {currentEvents.length} events</span>
              </h3>
              <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-[#3525CD] dark:text-[#818CF8]">
                <span className="material-symbols-rounded text-[20px]">add</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-60">
                  <span className="material-symbols-rounded text-5xl text-gray-300 dark:text-gray-600 mb-3">free_cancellation</span>
                  <p className="text-sm font-medium text-[#464555] dark:text-gray-400">No events scheduled.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Enjoy your free time!</p>
                </div>
              ) : (
                currentEvents.map((evt, i) => (
                  <div key={evt.id} className="flex gap-4 animate-in slide-in-from-right-8 fade-in duration-500" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                    <div className="w-16 flex flex-col items-end text-xs font-bold text-gray-500 dark:text-gray-400 pt-2 shrink-0">
                      {evt.time.split(' ')[0]}
                      <span className="text-[10px] uppercase font-semibold">{evt.time.split(' ')[1]}</span>
                    </div>
                    
                    {/* Material You Event Block */}
                    <div className={`flex-1 ${evt.color} ${evt.text} rounded-[20px] p-4 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer`}>
                      <div className="flex justify-between items-start">
                        <p className="font-bold leading-tight">{evt.title}</p>
                        <span className="material-symbols-rounded text-[20px] opacity-80">{evt.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3 text-xs font-medium opacity-90">
                        <span className="material-symbols-rounded text-[14px]">schedule</span>
                        {evt.duration}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
