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
    2: [
      { id: 101, title: 'Gandhi Jayanti / Int. Day of Non-Violence', time: 'All Day', duration: '24h', type: 'public', color: 'bg-[#00897B]', text: 'text-white', location: 'India & Global', attendees: [], linkedNodes: 0 },
    ],
    12: [
      { id: 5, title: 'Dentist Appointment', time: '10:00 AM', duration: '1h', type: 'medical_services', color: 'bg-[#0F9D58]', text: 'text-white', location: 'Smile Clinic', attendees: [], linkedNodes: 1 },
    ],
    24: [
      { id: 102, title: 'United Nations Day', time: 'All Day', duration: '24h', type: 'public', color: 'bg-[#1E88E5]', text: 'text-white', location: 'Global', attendees: [], linkedNodes: 0 },
      { id: 1, title: 'Product Strategy Review', time: '09:30 AM', duration: '45m', type: 'videocam', color: 'bg-[#4285F4]', text: 'text-white', location: 'Google Meet', attendees: ['AC', 'ML', 'DK'], linkedNodes: 3 },
      { id: 2, title: 'Lunch with Sarah', time: '12:30 PM', duration: '1h', type: 'restaurant', color: 'bg-[#F4B400]', text: 'text-white', location: 'SoHo, NY', attendees: ['SJ'], linkedNodes: 0 },
      { id: 3, title: 'Deep Work Block', time: '02:00 PM', duration: '2h', type: 'laptop_mac', color: 'bg-[#E5E8F5]', text: 'text-[#181B25]', location: 'Office Desk', attendees: [], linkedNodes: 12 },
    ],
    28: [
      { id: 4, title: 'Flight to London (LHR)', time: '08:00 AM', duration: '11h', type: 'flight_takeoff', color: 'bg-[#0F172A]', text: 'text-white', location: 'Terminal 4, JFK', attendees: [], linkedNodes: 5 },
    ],
    31: [
      { id: 103, title: 'Halloween / National Unity Day (India)', time: 'All Day', duration: '24h', type: 'celebration', color: 'bg-[#F4511E]', text: 'text-white', location: 'Global & India', attendees: [], linkedNodes: 0 },
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
          <div className={`bg-[#FAF9FF] dark:bg-[#0F172A] rounded-t-[32px] pt-6 px-6 transition-all duration-500 overflow-hidden ${viewMode === 'year' || currentEvents.length === 0 ? 'max-h-0 opacity-0 pb-0 pt-0' : 'max-h-[800px] opacity-100 pb-8'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-black text-[#181B25] dark:text-white flex items-center gap-2">
                  {selectedDate === 24 ? 'Today' : `${months[activeMonth]} ${selectedDate}`}
                  <span className="text-sm font-medium text-gray-400">· {currentEvents.length} events</span>
                </h3>
                {selectedDate === 24 && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#D97706] bg-[#FFF3E0] px-2 py-0.5 rounded-md">
                    <span className="material-symbols-rounded text-[14px]">wb_sunny</span>
                    72°
                  </div>
                )}
              </div>
              <button className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-[#3525CD] dark:text-[#818CF8] hover:scale-110 active:scale-95 transition">
                <span className="material-symbols-rounded text-[18px]">add</span>
              </button>
            </div>

            <div className="space-y-3">
              {currentEvents.map((evt, i) => (
                <div key={evt.id} className="flex gap-3 animate-in slide-in-from-right-8 fade-in duration-500" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                  <div className="w-14 flex flex-col items-end text-[11px] font-bold text-gray-500 dark:text-gray-400 pt-1.5 shrink-0">
                    {evt.time.split(' ')[0]}
                    <span className="text-[9px] uppercase font-semibold">{evt.time.split(' ')[1]}</span>
                  </div>
                  
                  {/* Compact Material You Event Block */}
                  <div className={`flex-1 ${evt.color} ${evt.text} rounded-2xl p-3 shadow-sm hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer`}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-sm font-bold leading-tight">{evt.title}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 text-[10px] font-medium opacity-90">
                            <span className="material-symbols-rounded text-[12px]">schedule</span>
                            {evt.duration}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-medium opacity-90">
                            <span className="material-symbols-rounded text-[12px]">location_on</span>
                            <span className="truncate max-w-[90px]">{evt.location}</span>
                          </div>
                          {evt.linkedNodes > 0 && (
                            <div className="flex items-center gap-1 text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm ml-1">
                              <span className="material-symbols-rounded text-[11px]">hub</span>
                              {evt.linkedNodes} Nodes
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="material-symbols-rounded text-[18px] opacity-80">{evt.type}</span>
                        {evt.attendees.length > 0 && (
                          <div className="flex items-center -space-x-1.5 opacity-90 mt-1">
                            {evt.attendees.map((att, idx) => (
                              <div key={idx} className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[8px] font-bold backdrop-blur-sm shadow-sm">{att}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
