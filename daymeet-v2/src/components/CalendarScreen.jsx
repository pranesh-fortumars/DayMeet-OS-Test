import React, { useState } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useInteraction } from '../hooks/useInteraction';
import { useAppStore } from '../store/useAppStore';
import CalendarModal from './modals/CalendarModal';
import MeetingWhispererModal from './modals/MeetingWhispererModal';

export default function CalendarScreen() {
  const { interact } = useInteraction();
  const { googleCalConnected } = useAppStore();
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showWhispererModal, setShowWhispererModal] = useState(false);
  const [scheduleOptimized, setScheduleOptimized] = useState(false);
  const [selectedDay, setSelectedDay] = useState(24);

  // Dynamic day strip calculation centered around Thu 24 / current date
  const dayPills = [
    { dayName: 'Thu', dateNum: 24, fullLabel: 'Thursday, Oct 24' },
    { dayName: 'Fri', dateNum: 25, fullLabel: 'Friday, Oct 25' },
    { dayName: 'Sat', dateNum: 26, fullLabel: 'Saturday, Oct 26' },
    { dayName: 'Sun', dateNum: 27, fullLabel: 'Sunday, Oct 27' },
    { dayName: 'Mon', dateNum: 28, fullLabel: 'Monday, Oct 28' },
    { dayName: 'Tue', dateNum: 29, fullLabel: 'Tuesday, Oct 29' },
    { dayName: 'Wed', dateNum: 30, fullLabel: 'Wednesday, Oct 30' },
  ];

  const scheduleMeetingAlert = async () => {
    try {
      const granted = await LocalNotifications.requestPermissions();
      if (granted.display === 'granted') {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Meeting starting soon!',
              body: 'Product Strategy Review starts in 10 minutes.',
              id: 1,
              schedule: { at: new Date(Date.now() + 1000 * 5) } // Demo: 5 seconds
            }
          ]
        });
        alert('Notification scheduled for 5 seconds from now!');
      }
    } catch (e) {
      alert('Notification permission denied or unavailable.');
    }
  };

  const currentPill = dayPills.find(p => p.dateNum === selectedDay) || { dayName: 'Oct', dateNum: selectedDay, fullLabel: `Oct ${selectedDay}` };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-black text-[#181B25]">Unified Schedule</h2>
          <p className="text-xs text-[#464555]">All calendar blocks, appointments, and syncs</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5 bg-[#EBEDFB] p-1 rounded-xl text-xs font-bold">
            <button onClick={() => setShowCalendarModal(true)} className="px-3 py-1 rounded-lg bg-white text-[#3525CD] shadow-xs flex items-center gap-1 hover:bg-[#F1F3FF] transition">
              <span className="material-symbols-rounded text-[14px]">calendar_month</span>
              Month
            </button>
            <button onClick={() => interact('View Timeline')} className="px-3 py-1 rounded-lg text-[#464555] hover:text-[#181B25]">Timeline</button>
          </div>
          <button onClick={scheduleMeetingAlert} className="px-2 py-1 rounded-lg bg-[#FFEBEE] text-[#E53935] text-[10px] font-bold flex items-center gap-1 shadow-xs hover:bg-[#FFCDD2] transition">
            <span className="material-symbols-rounded text-[12px]">notifications_active</span>
            Notify Me
          </button>
        </div>
      </div>

      {/* Dynamic Horizontal Day Selection Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {dayPills.map((item) => {
          const isSelected = item.dateNum === selectedDay;
          return (
            <div 
              key={item.dateNum}
              onClick={() => {
                setSelectedDay(item.dateNum);
                interact(`Select ${item.dayName} ${item.dateNum}`);
              }}
              className={`p-3 px-4 rounded-2xl text-center min-w-[62px] cursor-pointer active:scale-95 transition-all select-none ${
                isSelected 
                  ? 'bg-[#E2DFFF] text-[#3525CD] border-2 border-[#3525CD] font-bold shadow-xs' 
                  : 'bg-white text-[#464555] border border-[#E5E8F5] hover:border-[#3525CD]/40'
              }`}
            >
              <p className="text-[10px] font-bold uppercase">{item.dayName}</p>
              <p className="text-lg font-black leading-none mt-1">{item.dateNum}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#F1F3FF]">
          <span className="text-xs font-bold text-[#181B25]">
            {selectedDay === 24 ? "Today's Sequence (Oct 24)" : `Sequence for ${currentPill.fullLabel}`}
          </span>
          {googleCalConnected ? (
            <span className="text-[11px] text-[#10B981] font-bold flex items-center gap-1"><span className="material-symbols-rounded text-[14px]">sync</span> Google Calendar Live</span>
          ) : (
            <span className="text-[11px] text-[#777587] font-semibold">Local Schedule Only</span>
          )}
        </div>

        {!scheduleOptimized && selectedDay === 24 && (
          <div className="bg-[#FFF5F5] border border-[#FFE0E0] p-3 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <span className="material-symbols-rounded text-[#E53935] text-[20px]">warning</span>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-[#D32F2F]">Schedule Conflict Detected</h4>
              <p className="text-[10px] text-[#E53935] mt-0.5 mb-2 leading-snug">You have back-to-back priority meetings with zero buffer time.</p>
              <button 
                onClick={() => { interact('Triggered Auto-Heal Schedule'); setScheduleOptimized(true); }}
                className="px-3 py-1.5 bg-[#E53935] text-white text-[10px] font-bold rounded-lg hover:bg-[#D32F2F] active:scale-95 transition shadow-xs flex items-center gap-1"
              >
                <span className="material-symbols-rounded text-[14px]">auto_fix_high</span>
                Auto-Heal Schedule
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {selectedDay === 24 ? (
            <>
              {googleCalConnected && (
                <div onClick={() => interact('Event: Client Sync (GCal)')} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-[#F1F3FF] to-white border border-[#3525CD]/30 cursor-pointer active:scale-95 transition">
                  <span className="text-xs font-bold text-[#3525CD] w-14">08:00 AM</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#181B25] flex items-center gap-1">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-3 h-3" alt="GCal" /> 
                        Client Q3 Sync
                      </p>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">GCAL SYNC</span>
                    </div>
                    <p className="text-[11px] text-[#464555] mt-0.5">Google Meet • External • 1hr</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#3525CD]/30 cursor-pointer transition">
                <span className="text-xs font-bold text-[#3525CD] w-14 mt-1">09:30 AM</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#181B25]">Product Strategy Review</p>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDE7F6] text-[#673AB7]">ONGOING</span>
                  </div>
                  <p className="text-[11px] text-[#464555] mt-0.5 mb-2">Google Meet • Alex, Sarah, David</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); interact('Launch Meeting Whisperer'); setShowWhispererModal(true); }}
                    className="w-full py-2 bg-[#3525CD] hover:bg-[#2B1DAE] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 active:scale-95 transition shadow-xs"
                  >
                    <span className="material-symbols-rounded text-[14px]">record_voice_over</span>
                    Launch AI Meeting Whisperer
                  </button>
                </div>
              </div>
              
              <div onClick={() => interact('Event: Mobile Design Tokens')} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5] cursor-pointer active:scale-95 transition">
                <span className="text-xs font-bold text-[#3525CD] w-14">{scheduleOptimized ? '12:15 PM' : '12:00 PM'}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#181B25]">Finalize Mobile Design Tokens</p>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFEBEE] text-[#E53935]">PRIORITY</span>
                  </div>
                  <p className="text-[11px] text-[#464555] mt-0.5">Workspace sync • Due at release freeze</p>
                </div>
              </div>

              {scheduleOptimized && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] animate-in slide-in-from-top-4 fade-in duration-300">
                  <span className="text-xs font-bold text-[#2E7D32] w-14">01:15 PM</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#1B5E20] flex items-center gap-1">
                        <span className="material-symbols-rounded text-[14px]">self_improvement</span>
                        Deep Work Decompression
                      </p>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8E6C9] text-[#1B5E20]">BUFFER GUARD</span>
                    </div>
                    <p className="text-[10px] text-[#2E7D32] mt-0.5">Auto-injected 30m buffer to prevent cognitive fatigue</p>
                  </div>
                </div>
              )}

              <div onClick={() => interact('Event: Deep Work')} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5] cursor-pointer active:scale-95 transition">
                <span className="text-xs font-bold text-[#3525CD] w-14">{scheduleOptimized ? '01:45 PM' : '02:00 PM'}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#181B25]">Deep Work Sanctuary (Focus)</p>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E2DFFF] text-[#3525CD]">FOCUS</span>
                  </div>
                  <p className="text-[11px] text-[#464555] mt-0.5">DND auto-activates • Slack set to in focus</p>
                </div>
              </div>

              <div onClick={() => interact('Event: Team Daily Sync')} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5] cursor-pointer active:scale-95 transition">
                <span className="text-xs font-bold text-[#3525CD] w-14">04:30 PM</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#181B25]">Team Daily Sync & Demo</p>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDE7F6] text-[#673AB7]">MEETING</span>
                  </div>
                  <p className="text-[11px] text-[#464555] mt-0.5">Google Meet • Engineering & Design team</p>
                </div>
              </div>
            </>
          ) : selectedDay === 28 ? (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5]">
              <span className="text-xs font-bold text-[#3525CD] w-14">08:00 AM</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[#181B25]">Flight to London (LHR)</p>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E0F2FE] text-[#0288D1]">TRAVEL</span>
                </div>
                <p className="text-[11px] text-[#464555] mt-0.5">Terminal 4, JFK • 11 hours duration</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-[#F1F3FF] rounded-xl">
              <span className="material-symbols-rounded text-gray-300 text-[28px] mb-1">event_available</span>
              <p className="text-xs font-bold text-[#181B25]">No schedule blocks for {currentPill.fullLabel}</p>
              <button 
                onClick={() => setShowCalendarModal(true)}
                className="mt-2 px-3 py-1.5 bg-[#3525CD] text-white text-[11px] font-bold rounded-lg hover:bg-[#2B1DAE] transition shadow-xs"
              >
                Open Calendar Modal to Add Event
              </button>
            </div>
          )}
        </div>
      </div>

      <CalendarModal isOpen={showCalendarModal} onClose={() => setShowCalendarModal(false)} />
      <MeetingWhispererModal isOpen={showWhispererModal} onClose={() => setShowWhispererModal(false)} />
    </div>
  );
}

