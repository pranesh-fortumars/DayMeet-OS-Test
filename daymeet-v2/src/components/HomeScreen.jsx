import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useAppStore } from '../store/useAppStore';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { setModalOpen, spending, dailyBudget, steps, stepsGoal, hydration, hydrationGoal, meditationStreak, exerciseStreak, tasks, activeProfile, currentLocation, setCurrentLocation, setActiveProfile, widgets } = useAppStore();
  const [isTravelMode, setIsTravelMode] = useState(true);
  const triggerHaptic = () => Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  
  const filteredTasks = tasks.filter(t => !t.profile || t.profile === activeProfile);
  
  const triggerToast = (msg) => { triggerHaptic(); console.log('Toast:', msg); };
  const openBriefingModal = () => { triggerHaptic(); setModalOpen('briefing', true); };
  const switchTab = (tab) => { triggerHaptic(); navigate(tab === 'home' ? '/' : `/${tab}`); };
  const payBill = (id) => { triggerHaptic(); console.log('Pay Bill:', id); };
  const openQuickScheduleMeetingModal = () => { triggerHaptic(); setModalOpen('quickMeeting', true); };
  
  const openQuickAddWith = async (type) => { 
    triggerHaptic(); 
    if (type === 'Expense' || type === 'Health Entry') {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera
        });
        console.log('Captured Document/Receipt for:', type);
      } catch (e) {
        console.log('Camera error/cancelled');
      }
    } else {
      setModalOpen('quickAdd', true);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Header Greeting & Weather Strip */}
      <div className="pt-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#181B25] tracking-tight">Good morning, Alex</h1>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#6FFBBE]/40 text-[#005338] border border-[#6FFBBE]">
            33 Modules Synced
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-[#464555] font-medium flex-wrap">
          <span>Thursday, Oct 24</span>
          <span className="text-[#C7C4D8]">•</span>
          <span className="inline-flex items-center gap-1 text-[#D97706]">
            <span className="material-symbols-rounded text-[15px]">wb_sunny</span>
            72°F Sunny (10% rain)
          </span>
          <span className="text-[#C7C4D8]">•</span>
          <span>New York</span>
        </div>
      </div>

      {/* 1.5 Boarding Pass & Travel Nomad Concierge (Travel Mode) */}
      {isTravelMode && (
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-[20px] p-4 shadow-xl text-white animate-in slide-in-from-top-4 duration-500 overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="px-2 py-1 rounded-md text-[10px] font-black bg-white/10 text-white tracking-widest uppercase flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">flight_takeoff</span>
              Boarding Now
            </span>
            <span className="text-[10px] text-gray-400 font-bold">Gate closes in 45m</span>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-3xl font-black tracking-tighter">JFK</p>
              <p className="text-[10px] text-gray-400">New York, US</p>
            </div>
            
            <div className="flex-1 px-4">
              <div className="flex items-center justify-center gap-2">
                <div className="h-px bg-white/20 flex-1"></div>
                <span className="material-symbols-rounded text-[#38BDF8] rotate-90">flight</span>
                <div className="h-px bg-white/20 flex-1"></div>
              </div>
              <p className="text-center text-[10px] font-bold text-gray-400 mt-1">11h 20m</p>
            </div>
            
            <div className="text-right">
              <p className="text-3xl font-black tracking-tighter">LHR</p>
              <p className="text-[10px] text-gray-400">London, UK</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 p-3 bg-white/5 rounded-xl border border-white/10 relative z-10">
            <div>
              <p className="text-[10px] text-gray-400">Flight</p>
              <p className="text-sm font-bold">BA 112</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Gate</p>
              <p className="text-sm font-bold text-[#38BDF8]">42B</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Seat</p>
              <p className="text-sm font-bold">14F</p>
            </div>
            <button className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition">
              <span className="material-symbols-rounded text-[20px]">qr_code_2</span>
            </button>
          </div>
          
          <div className="flex gap-2 mt-3 relative z-10">
            <button onClick={() => triggerToast('Currency Converter: USD to GBP')} className="flex-1 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-white/20">
              <span className="material-symbols-rounded text-[14px]">currency_exchange</span>
              Convert £
            </button>
            <button onClick={() => { triggerToast('Timezone shifting Protocol Active'); setIsTravelMode(false); }} className="flex-1 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-white/20">
              <span className="material-symbols-rounded text-[14px]">bedtime</span>
              Jetlag Protocol
            </button>
          </div>
        </div>
      )}

      {/* Geofence & Context Switcher Trigger Card */}
      <div className="bg-[#181B25] rounded-xl p-3 shadow-md flex items-center justify-between text-white animate-in slide-in-from-top-2 duration-500">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="material-symbols-rounded text-[#10B981] text-[18px]">location_on</span>
          </div>
          <div>
            <p className="text-xs font-bold">Arrived at {currentLocation}</p>
            <p className="text-[10px] text-gray-400">Context active: {activeProfile}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            triggerHaptic();
            if (currentLocation === 'Office HQ') {
              setCurrentLocation('Home Base');
              setActiveProfile('Personal');
            } else {
              setCurrentLocation('Office HQ');
              setActiveProfile('Work');
            }
          }} 
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-[10px] font-bold"
        >
          Simulate Geofence
        </button>
      </div>

      {/* 2. Daily Briefing Card */}
      {widgets.briefing && (
        <div className="bg-white rounded-[18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E8F5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-rounded text-[#3525CD] text-[18px]">auto_awesome</span>
              <h2 className="text-sm font-bold text-[#181B25]">Daily Briefing</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E2DFFF] text-[#3525CD]">
              Auto-Synced
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-3 text-center">
            <div className="p-1">
              <p className="text-lg font-bold text-[#181B25] leading-tight">3</p>
              <p className="text-[11px] text-[#464555]">Meetings</p>
            </div>
            <div className="p-1">
              <p className="text-lg font-bold text-[#181B25] leading-tight">6</p>
              <p className="text-[11px] text-[#464555]">Tasks</p>
            </div>
            <div className="p-1">
              <p className="text-lg font-bold text-[#181B25] leading-tight">₹{spending.toLocaleString()}</p>
              <p className="text-[11px] text-[#464555]">Spent</p>
            </div>
            <div className="p-1">
              <p className="text-lg font-bold text-[#181B25] leading-tight">{steps >= 1000 ? (steps / 1000).toFixed(1) + 'k' : steps}</p>
              <p className="text-[11px] text-[#464555]">Steps</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mt-3.5 pt-2 border-t border-[#F1F3FF]">
            <div className="flex items-center gap-2.5 flex-1">
              <div className="w-full bg-[#E5E8F5] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3525CD] h-full rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
              </div>
              <span className="text-[11px] text-[#464555] whitespace-nowrap font-medium">2/6 Done</span>
            </div>
            <button onClick={openBriefingModal} className="px-3.5 py-1.5 rounded-full bg-[#3525CD] text-white text-xs font-bold hover:bg-[#2B1DAE] transition whitespace-nowrap flex items-center gap-1 shadow-sm">
              <span>Start My Day</span>
              <span className="material-symbols-rounded text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. My Day Widgets Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-[#181B25]">My Day Widgets</h3>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#6FFBBE]/40 text-[#005338]">Live</span>
        </div>
        <button onClick={() => triggerToast('Widget customization: Reorder & toggles')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F1F3FF] text-[11px] text-[#464555] font-medium hover:bg-[#E5E8F5] transition">
          <span className="material-symbols-rounded text-[14px]">tune</span>
          <span>Customize & Reorder</span>
        </button>
      </div>

      {/* 4. Hero Next Meeting Card */}
      {widgets.calendar && (
        <div className="bg-white rounded-[18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E8F5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] bg-[#E2DFFF] flex items-center justify-center text-[#3525CD]">
                <span className="material-symbols-rounded text-[20px]">videocam</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFEBEE] text-[#D32F2F]">In 20m</span>
                  <span className="text-[11px] text-[#464555] font-medium">09:30 AM - 10:15 AM</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#E5E8F5] text-[#3525CD]">Google Meet</span>
          </div>

          <h4 className="text-base font-bold text-[#181B25] mt-2.5">Product Strategy Review</h4>

          <div className="flex items-center justify-between mt-3 pt-2">
            <div className="flex items-center -space-x-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-[#4F46E5] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">AC</div>
              <div className="w-7 h-7 rounded-full bg-[#39B8FD] text-[#004666] text-[9px] font-bold flex items-center justify-center ring-2 ring-white">ML</div>
              <div className="w-7 h-7 rounded-full bg-[#006E4B] text-[#67F4B7] text-[9px] font-bold flex items-center justify-center ring-2 ring-white">DK</div>
              <div className="w-7 h-7 rounded-full bg-[#E5E8F5] text-[#464555] text-[10px] font-bold flex items-center justify-center ring-2 ring-white">+4</div>
            </div>

            <button onClick={() => triggerToast('Connecting to Google Meet room...')} className="h-[38px] px-4 rounded-xl bg-[#3525CD] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2B1DAE] transition shadow-sm">
              <span className="material-symbols-rounded text-[16px]">videocam</span>
              <span>Join Meeting</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Electricity Bill Due Banner */}
      {widgets.bills && (
        <div id="electricity-bill-card" className="bg-[#F1F5FD] rounded-2xl p-3 px-3.5 flex items-center justify-between border border-blue-100 mt-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0288D1] flex items-center justify-center">
              <span className="material-symbols-rounded text-[18px]">bolt</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#D32F2F]">Electricity Bill Due Tomorrow</p>
              <p className="text-[11px] text-[#464555]">Tata Power • ₹2,400</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => switchTab('finance')} className="text-xs font-bold text-[#3525CD] hover:underline">View</button>
            <button onClick={() => payBill('b1')} className="h-8 px-3 rounded-full bg-[#181B25] text-white text-[11px] font-bold hover:bg-black transition">
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* 6. Daily Vitals (4 Streams) 2x2 Bento Grid */}
      {widgets.vitals && (
        <div className="space-y-2.5 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#181B25]">Daily Vitals</h3>
            <span className="text-xs text-[#464555]">4 Streams</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Bento 1: Focus & Work */}
            <div onClick={() => switchTab('tasks')} className="bg-white rounded-2xl p-3 border border-[#E5E8F5] shadow-sm hover:border-[#3525CD]/40 cursor-pointer transition">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#E5E8F5] text-[#3525CD] flex items-center justify-center">
                  <span className="material-symbols-rounded text-[16px]">filter_center_focus</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#3525CD]/10 text-[#3525CD]">33%</span>
              </div>
              <p className="text-[11px] text-[#464555] mt-2">Focus & Work</p>
              <p className="text-sm font-bold text-[#181B25]">2/6 Tasks</p>
              <div className="w-full bg-[#E5E8F5] h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#3525CD] h-full rounded-full" style={{ width: '33%' }}></div>
              </div>
              <p className="text-[10px] text-[#464555] mt-1.5 truncate">3 meetings scheduled</p>
            </div>

            {/* Bento 2: Finance (Daily) */}
            <div onClick={() => switchTab('finance')} className="bg-white rounded-2xl p-3 border border-[#E5E8F5] shadow-sm hover:border-[#005338]/40 cursor-pointer transition">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#E5E8F5] text-[#005338] flex items-center justify-center">
                  <span className="material-symbols-rounded text-[16px]">account_balance_wallet</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#005338]/10 text-[#005338]">Safe</span>
              </div>
              <p className="text-[11px] text-[#464555] mt-2">Finance (Daily)</p>
              <p className="text-sm font-bold text-[#181B25]">₹{spending.toLocaleString()} / {dailyBudget / 1000}k</p>
              <div className="w-full bg-[#E5E8F5] h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#005338] h-full rounded-full" style={{ width: `${Math.min((spending / dailyBudget) * 100, 100)}%` }}></div>
              </div>
              <p className="text-[10px] text-[#464555] mt-1.5 truncate">{Math.round((spending / dailyBudget) * 100)}% of daily ceiling</p>
            </div>

            {/* Bento 3: Health & Vitality */}
            <div onClick={() => switchTab('insights')} className="bg-white rounded-2xl p-3 border border-[#E5E8F5] shadow-sm hover:border-[#0288D1]/40 cursor-pointer transition">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#E5E8F5] text-[#0288D1] flex items-center justify-center">
                  <span className="material-symbols-rounded text-[16px]">favorite</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0288D1]/10 text-[#0288D1]">88 Score</span>
              </div>
              <p className="text-[11px] text-[#464555] mt-2">Health & Vitality</p>
              <p className="text-sm font-bold text-[#181B25]">{steps.toLocaleString()} Steps</p>
              <div className="w-full bg-[#E5E8F5] h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#0288D1] h-full rounded-full" style={{ width: `${Math.min((steps / stepsGoal) * 100, 100)}%` }}></div>
              </div>
              <p className="text-[10px] text-[#464555] mt-1.5 truncate">Hydration: {hydration}L / {hydrationGoal}L</p>
            </div>

            {/* Bento 4: Habits & Goals */}
            <div onClick={() => triggerToast('Daily Habits: 18-day streak active')} className="bg-white rounded-2xl p-3 border border-[#E5E8F5] shadow-sm hover:border-[#F59E0B]/40 cursor-pointer transition">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#E5E8F5] text-[#F59E0B] flex items-center justify-center">
                  <span className="material-symbols-rounded text-[16px]">local_fire_department</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F59E0B]/10 text-[#D97706]">{Math.max(meditationStreak, exerciseStreak)}d streak</span>
              </div>
              <p className="text-[11px] text-[#464555] mt-2">Habits & Goals</p>
              <p className="text-sm font-bold text-[#181B25]">2 / 3 Done</p>
              <div className="w-full bg-[#E5E8F5] h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '66%' }}></div>
              </div>
              <p className="text-[10px] text-[#464555] mt-1.5 truncate">66% consistency</p>
            </div>
          </div>

          {/* Bento 5: Daily Habit Check-in Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#E5E8F5] shadow-sm space-y-3 mt-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF3E0] text-[#D97706] flex items-center justify-center">
                  <span className="material-symbols-rounded text-[18px]">self_improvement</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#181B25]">Daily Habit Check-in</p>
                  <p className="text-[10px] text-[#464555]">Single-tap morning routine logging</p>
                </div>
              </div>
              <button onClick={() => triggerToast('Viewing all 5 habits & streaks')} className="text-xs font-bold text-[#3525CD] flex items-center gap-0.5 hover:underline">
                <span>View All</span>
                <span className="material-symbols-rounded text-[14px]">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div onClick={() => triggerToast('Morning Meditation logged!')} className="p-2.5 rounded-xl border border-[#E5E8F5] bg-[#FAF9FF] hover:border-[#673AB7] cursor-pointer transition flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full bg-[#EDE7F6] text-[#673AB7] flex items-center justify-center">
                    <span className="material-symbols-rounded text-[16px]">self_improvement</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3525CD]/10 text-[#3525CD]">Tap to Log</span>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-bold text-[#181B25] truncate">Morning Meditation</p>
                  <p className="text-[10px] text-[#464555]">{meditationStreak}d streak • 15m</p>
                </div>
              </div>

              <div onClick={() => triggerToast('Morning Exercise logged!')} className="p-2.5 rounded-xl border border-[#E5E8F5] bg-[#FAF9FF] hover:border-[#2E7D32] cursor-pointer transition flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                    <span className="material-symbols-rounded text-[16px]">fitness_center</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3525CD]/10 text-[#3525CD]">Tap to Log</span>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-bold text-[#181B25] truncate">Morning Exercise</p>
                  <p className="text-[10px] text-[#464555]">{exerciseStreak}d streak • 30m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Cross-Module Stream (Full View) */}
      <div className="space-y-2.5 pt-1 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-bold text-[#181B25]">Cross-Module Stream</h3>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          </div>
          <button onClick={() => switchTab('calendar')} className="text-xs font-bold text-[#3525CD] hover:underline">Full View</button>
        </div>
        
        <div className="space-y-2">
          {filteredTasks.slice(0, 3).map((task) => (
            <div key={task.id || task.title} className="flex gap-2.5 p-3 rounded-2xl bg-white border border-[#E5E8F5] shadow-sm active:scale-95 transition cursor-pointer" onClick={() => navigate('/tasks')}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                task.tagType === 'expense' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 
                task.tagType === 'meeting' ? 'bg-[#EDE7F6] text-[#673AB7]' : 
                'bg-[#FFEBEE] text-[#E53935]'
              }`}>
                <span className="material-symbols-rounded text-[16px]">
                  {task.tagType === 'expense' ? 'account_balance_wallet' : task.tagType === 'meeting' ? 'videocam' : 'check_circle'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold leading-tight truncate ${task.status === 'completed' ? 'line-through text-[#777587]' : 'text-[#181B25]'}`}>{task.title}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-[#464555]">
                  <span className={`font-semibold ${task.tagType === 'expense' ? 'text-[#2E7D32]' : 'text-[#3525CD]'}`}>{task.time}</span>
                  <span>•</span>
                  <span className="truncate">{task.subtitle}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="p-4 text-center text-xs text-[#464555]">
              No upcoming items in the stream for this profile.
            </div>
          )}
        </div>
      </div>
      
      {/* 8. Quick Capture Hub */}
      <div className="bg-white rounded-[18px] p-4 border border-[#E5E8F5] shadow-sm mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#181B25]">Quick Capture Hub</h3>
          <span className="text-[11px] text-[#464555]">Tap to create</span>
        </div>
        <div className="grid grid-cols-6 gap-2 text-center">
          <div onClick={openQuickScheduleMeetingModal} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#EDE7F6] text-[#673AB7] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">calendar_today</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Meeting</p>
          </div>
          <div onClick={() => openQuickAddWith('Task')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#FFEBEE] text-[#E53935] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">check_circle</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Task</p>
          </div>
          <div onClick={() => openQuickAddWith('Expense')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">account_balance_wallet</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Expense</p>
          </div>
          <div onClick={() => openQuickAddWith('Note')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#E3F2FD] text-[#1976D2] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">edit_note</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Note</p>
          </div>
          <div onClick={() => openQuickAddWith('Habit')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">local_fire_department</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Habit</p>
          </div>
          <div onClick={() => openQuickAddWith('Health Entry')} className="cursor-pointer group">
            <div className="w-11 h-11 mx-auto rounded-full bg-[#E0F2F1] text-[#00897B] flex items-center justify-center group-hover:scale-105 transition">
              <span className="material-symbols-rounded text-[20px]">favorite_border</span>
            </div>
            <p className="text-[10px] text-[#464555] font-medium mt-1">Health</p>
          </div>
        </div>
      </div>
    </div>
  );
}
