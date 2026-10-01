import React, { useState, useEffect } from 'react';
import { useInteraction } from '../../hooks/useInteraction';
import { useAppStore } from '../../store/useAppStore';

export default function CalendarModal({ isOpen, onClose }) {
  const { interact } = useInteraction();
  const { tasks, setModalOpen } = useAppStore();
  
  const todayDate = new Date();
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'year'
  const [activeYear, setActiveYear] = useState(2026);
  const [activeMonth, setActiveMonth] = useState(9); // October (0-indexed)
  const [selectedDate, setSelectedDate] = useState(24);
  const [isExpanding, setIsExpanding] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('10:00 AM');
  const [showAddInline, setShowAddInline] = useState(false);
  
  // Custom user-added events per year-month-day key (e.g. "2026-9-24")
  const [customEvents, setCustomEvents] = useState({});

  // Apple Calendar style smooth transitions
  useEffect(() => {
    if (isOpen) {
      setIsExpanding(true);
      const timer = setTimeout(() => setIsExpanding(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Dynamic Date calculations based on activeYear and activeMonth
  const totalDaysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(activeYear, activeMonth, 1).getDay(); // 0 = Sun, 1 = Mon ...
  
  const dates = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (activeMonth === 0) {
      setActiveMonth(11);
      setActiveYear(prev => prev - 1);
    } else {
      setActiveMonth(prev => prev - 1);
    }
    interact('Previous Month');
  };

  const handleNextMonth = () => {
    if (activeMonth === 11) {
      setActiveMonth(0);
      setActiveYear(prev => prev + 1);
    } else {
      setActiveMonth(prev => prev + 1);
    }
    interact('Next Month');
  };

  const handleSelectMonth = (monthIdx) => {
    setActiveMonth(monthIdx);
    setViewMode('month');
    const newMonthTotalDays = new Date(activeYear, monthIdx + 1, 0).getDate();
    if (selectedDate > newMonthTotalDays) {
      setSelectedDate(newMonthTotalDays);
    }
    interact(`Selected month ${months[monthIdx]}`);
  };

  const handleSelectDate = (date) => {
    interact(`Selected ${months[activeMonth]} ${date}, ${activeYear}`);
    setSelectedDate(date);
    setShowAddInline(false);
  };

  // Base mock events database keyed by "monthIndex-date"
  const defaultEventsMap = {
    '9-2': [
      { id: 101, title: 'Gandhi Jayanti / Int. Day of Non-Violence', time: 'All Day', duration: '24h', type: 'public', color: 'bg-[#00897B]', text: 'text-white', location: 'India & Global', attendees: [], linkedNodes: 0 },
    ],
    '9-12': [
      { id: 5, title: 'Dentist Appointment', time: '10:00 AM', duration: '1h', type: 'medical_services', color: 'bg-[#0F9D58]', text: 'text-white', location: 'Smile Clinic', attendees: [], linkedNodes: 1 },
    ],
    '9-24': [
      { id: 102, title: 'United Nations Day', time: 'All Day', duration: '24h', type: 'public', color: 'bg-[#1E88E5]', text: 'text-white', location: 'Global', attendees: [], linkedNodes: 0 },
      { id: 1, title: 'Product Strategy Review', time: '09:30 AM', duration: '45m', type: 'videocam', color: 'bg-[#4285F4]', text: 'text-white', location: 'Google Meet', attendees: ['AC', 'ML', 'DK'], linkedNodes: 3 },
      { id: 2, title: 'Lunch with Sarah', time: '12:30 PM', duration: '1h', type: 'restaurant', color: 'bg-[#F4B400]', text: 'text-white', location: 'SoHo, NY', attendees: ['SJ'], linkedNodes: 0 },
      { id: 3, title: 'Deep Work Block', time: '02:00 PM', duration: '2h', type: 'laptop_mac', color: 'bg-[#E5E8F5]', text: 'text-[#181B25]', location: 'Office Desk', attendees: [], linkedNodes: 12 },
    ],
    '9-28': [
      { id: 4, title: 'Flight to London (LHR)', time: '08:00 AM', duration: '11h', type: 'flight_takeoff', color: 'bg-[#0F172A]', text: 'text-white', location: 'Terminal 4, JFK', attendees: [], linkedNodes: 5 },
    ],
    '9-31': [
      { id: 103, title: 'Halloween / National Unity Day', time: 'All Day', duration: '24h', type: 'celebration', color: 'bg-[#F4511E]', text: 'text-white', location: 'Global', attendees: [], linkedNodes: 0 },
    ],
    '10-14': [
      { id: 201, title: 'Diwali Celebration Block', time: '06:00 PM', duration: '4h', type: 'celebration', color: 'bg-[#F57C00]', text: 'text-white', location: 'Home & Community', attendees: ['Family'], linkedNodes: 2 },
    ],
    '11-25': [
      { id: 301, title: 'Christmas Day', time: 'All Day', duration: '24h', type: 'celebration', color: 'bg-[#E53935]', text: 'text-white', location: 'Global', attendees: [], linkedNodes: 0 },
    ]
  };

  const dateKey = `${activeMonth}-${selectedDate}`;
  const customList = customEvents[`${activeYear}-${dateKey}`] || [];
  const baseList = defaultEventsMap[dateKey] || [];
  const currentEvents = [...baseList, ...customList];

  // Helper to check if a specific date has any events (for calendar dot indicator)
  const hasEventsForDate = (date) => {
    const key = `${activeMonth}-${date}`;
    const customKey = `${activeYear}-${key}`;
    return (defaultEventsMap[key] && defaultEventsMap[key].length > 0) || (customEvents[customKey] && customEvents[customKey].length > 0);
  };

  const handleAddCustomEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEvt = {
      id: Date.now(),
      title: newEventTitle.trim(),
      time: newEventTime,
      duration: '1h',
      type: 'event',
      color: 'bg-[#3525CD]',
      text: 'text-white',
      location: 'DayMeet OS',
      attendees: ['Me'],
      linkedNodes: 1
    };

    const fullKey = `${activeYear}-${activeMonth}-${selectedDate}`;
    setCustomEvents(prev => ({
      ...prev,
      [fullKey]: [...(prev[fullKey] || []), newEvt]
    }));

    setNewEventTitle('');
    setShowAddInline(false);
    interact(`Added event "${newEvt.title}" on ${months[activeMonth]} ${selectedDate}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-300" onClick={onClose}>
      
      {/* iOS Bottom Sheet / Desktop Centered Modal Container */}
      <div 
        className={`bg-[#FAF9FF] dark:bg-[#0F172A] w-full max-w-[420px] sm:rounded-[36px] rounded-t-[32px] shadow-[0_-10px_60px_rgba(0,0,0,0.3)] overflow-hidden relative flex flex-col max-h-[92vh] sm:max-h-[85vh] transition-transform duration-500 cubic-bezier(0.32,0.72,0,1) ${isExpanding ? 'translate-y-[100%] scale-95' : 'translate-y-0 scale-100'}`}
        onClick={e => e.stopPropagation()}
      >
        
        {/* Mobile Drag Handle Notch */}
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto my-2.5 shrink-0 sm:hidden"></div>

        {/* Header - Fixed Height with shrink-0 so it NEVER gets cropped */}
        <div className="px-6 py-3 flex items-center justify-between bg-white dark:bg-[#1E293B] shadow-xs z-20 relative shrink-0 border-b border-gray-100 dark:border-slate-800">
          <button 
            onClick={viewMode === 'month' ? handlePrevMonth : () => setActiveYear(prev => prev - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#3525CD] dark:text-[#818CF8] hover:bg-[#F1F3FF] dark:hover:bg-slate-800 transition active:scale-90"
            title="Previous"
          >
            <span className="material-symbols-rounded text-[24px]">chevron_left</span>
          </button>
          
          <button 
            onClick={() => {
              interact('Toggled Year View');
              setViewMode(viewMode === 'month' ? 'year' : 'month');
            }}
            className="flex items-center gap-1.5 hover:opacity-75 transition active:scale-95 px-3 py-1 rounded-xl bg-[#FAF9FF] dark:bg-slate-800/80 border border-[#E5E8F5] dark:border-slate-700"
          >
            <h2 className="text-lg font-black text-[#181B25] dark:text-white tracking-tight">
              {viewMode === 'month' ? `${months[activeMonth]} ${activeYear}` : `${activeYear}`}
            </h2>
            <span className={`material-symbols-rounded text-[#3525CD] dark:text-[#818CF8] transition-transform duration-300 ${viewMode === 'year' ? 'rotate-180' : ''}`}>
              keyboard_arrow_down
            </span>
          </button>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={viewMode === 'month' ? handleNextMonth : () => setActiveYear(prev => prev + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3525CD] dark:text-[#818CF8] hover:bg-[#F1F3FF] dark:hover:bg-slate-800 transition active:scale-90"
              title="Next"
            >
              <span className="material-symbols-rounded text-[24px]">chevron_right</span>
            </button>
            <button 
              onClick={onClose} 
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700 transition active:scale-90"
              title="Close modal"
            >
              <span className="material-symbols-rounded text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Container with clean document flow */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-[#1E293B] relative flex flex-col">
          
          {/* Calendar View Area */}
          <div className="px-6 py-4 flex-1">
            
            {/* MONTH VIEW */}
            {viewMode === 'month' && (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                {/* Day Header Row */}
                <div className="grid grid-cols-7 text-center mb-3">
                  {days.map((day, i) => (
                    <div key={i} className="text-[11px] font-bold text-[#8B899C] dark:text-gray-400 uppercase tracking-widest">{day}</div>
                  ))}
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-y-2.5 gap-x-1 text-center min-h-[240px]">
                  {blanks.map((_, i) => (
                    <div key={`blank-${i}`} className="w-10 h-10"></div>
                  ))}
                  {dates.map((date) => {
                    const isToday = date === todayDate.getDate() && activeMonth === todayDate.getMonth() && activeYear === todayDate.getFullYear();
                    const isSelected = date === selectedDate;
                    const hasEvts = hasEventsForDate(date);
                    
                    return (
                      <div 
                        key={date} 
                        onClick={() => handleSelectDate(date)}
                        className={`relative w-10 h-10 mx-auto flex items-center justify-center rounded-full text-[14px] cursor-pointer transition-all duration-200 select-none ${
                          isSelected && !isToday
                            ? 'bg-[#3525CD] text-white font-bold shadow-[0_4px_12px_rgba(53,37,205,0.4)] scale-105' 
                            : isToday && isSelected
                              ? 'bg-[#DB4437] text-white font-bold shadow-[0_4px_12px_rgba(219,68,55,0.4)] scale-105'
                              : isToday
                                ? 'border-2 border-[#DB4437] text-[#DB4437] font-bold'
                                : 'text-[#181B25] dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-slate-700/60'
                        }`}
                      >
                        {date}
                        {/* Event Dot Indicator */}
                        {hasEvts && !isSelected && (
                          <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#3525CD] dark:bg-[#818CF8]"></span>
                        )}
                        {hasEvts && isSelected && (
                          <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white"></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* YEAR VIEW */}
            {viewMode === 'year' && (
              <div className="animate-in fade-in zoom-in-95 duration-200 py-2">
                <div className="grid grid-cols-3 gap-3">
                  {months.map((m, idx) => {
                    const isCurrent = idx === activeMonth;
                    return (
                      <div 
                        key={m}
                        onClick={() => handleSelectMonth(idx)}
                        className={`flex flex-col items-center justify-center rounded-2xl h-16 cursor-pointer text-sm font-bold transition-all duration-200 border-2 ${
                          isCurrent 
                            ? 'bg-[#3525CD]/10 border-[#3525CD] text-[#3525CD] dark:text-[#818CF8]' 
                            : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-[#464555] dark:text-gray-300 hover:border-[#3525CD]/40'
                        }`}
                      >
                        <span>{m}</span>
                        <span className="text-[10px] font-normal text-gray-400 mt-0.5">{activeYear}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Events Timeline Section */}
          <div className="bg-[#FAF9FF] dark:bg-[#0F172A] rounded-t-[28px] border-t border-gray-100 dark:border-slate-800 pt-5 px-6 pb-6 mt-auto">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#181B25] dark:text-white flex items-center gap-2">
                  {selectedDate === todayDate.getDate() && activeMonth === todayDate.getMonth() ? 'Today' : `${months[activeMonth]} ${selectedDate}`}
                  <span className="text-xs font-semibold text-gray-400">· {currentEvents.length} {currentEvents.length === 1 ? 'event' : 'events'}</span>
                </h3>
                {selectedDate === 24 && activeMonth === 9 && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#D97706] bg-[#FFF3E0] px-2 py-0.5 rounded-md">
                    <span className="material-symbols-rounded text-[13px]">wb_sunny</span>
                    72°
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setShowAddInline(!showAddInline)}
                className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition active:scale-90 ${showAddInline ? 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-white' : 'bg-[#3525CD] text-white hover:bg-[#2B1DAE]'}`}
                title="Add event"
              >
                <span className="material-symbols-rounded text-[18px]">{showAddInline ? 'close' : 'add'}</span>
              </button>
            </div>

            {/* Inline Event Creation Form */}
            {showAddInline && (
              <form onSubmit={handleAddCustomEvent} className="mb-4 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-[#E5E8F5] dark:border-slate-700 shadow-sm space-y-2.5 animate-in slide-in-from-top-2 duration-200">
                <p className="text-xs font-bold text-[#181B25] dark:text-white">Add Event for {months[activeMonth]} {selectedDate}</p>
                <input 
                  type="text"
                  placeholder="Event title..."
                  value={newEventTitle}
                  onChange={e => setNewEventTitle(e.target.value)}
                  autoFocus
                  className="w-full bg-[#FAF9FF] dark:bg-slate-900 border border-[#E5E8F5] dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-[#181B25] dark:text-white focus:outline-none focus:border-[#3525CD]"
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={newEventTime}
                    onChange={e => setNewEventTime(e.target.value)}
                    className="w-28 bg-[#FAF9FF] dark:bg-slate-900 border border-[#E5E8F5] dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-[#181B25] dark:text-white focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="flex-1 py-1.5 bg-[#3525CD] text-white font-bold text-xs rounded-xl hover:bg-[#2B1DAE] transition shadow-xs"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            )}

            {/* Events List / Empty State */}
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto no-scrollbar">
              {currentEvents.length > 0 ? (
                currentEvents.map((evt) => (
                  <div key={evt.id} className="flex gap-2.5 animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="w-14 flex flex-col items-end text-[11px] font-bold text-gray-500 dark:text-gray-400 pt-1 shrink-0">
                      {evt.time.split(' ')[0]}
                      <span className="text-[9px] uppercase font-semibold">{evt.time.split(' ')[1] || ''}</span>
                    </div>
                    
                    <div className={`flex-1 ${evt.color} ${evt.text} rounded-2xl p-3 shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer`}>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-xs font-bold leading-tight">{evt.title}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <div className="flex items-center gap-1 text-[10px] font-medium opacity-90">
                              <span className="material-symbols-rounded text-[12px]">schedule</span>
                              {evt.duration}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-medium opacity-90">
                              <span className="material-symbols-rounded text-[12px]">location_on</span>
                              <span className="truncate max-w-[100px]">{evt.location}</span>
                            </div>
                            {evt.linkedNodes > 0 && (
                              <div className="flex items-center gap-1 text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded-md backdrop-blur-xs shadow-xs ml-0.5">
                                <span className="material-symbols-rounded text-[11px]">hub</span>
                                {evt.linkedNodes} Nodes
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="material-symbols-rounded text-[16px] opacity-80">{evt.type}</span>
                          {evt.attendees && evt.attendees.length > 0 && (
                            <div className="flex items-center -space-x-1.5 opacity-90">
                              {evt.attendees.map((att, idx) => (
                                <div key={idx} className="w-4 h-4 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[7px] font-bold backdrop-blur-xs">{att}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-4">
                  <span className="material-symbols-rounded text-gray-300 dark:text-slate-600 text-[28px] mb-1">event_available</span>
                  <p className="text-xs font-bold text-[#181B25] dark:text-white">No events for this date</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Tap '+' to schedule a meeting or block focus time.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

