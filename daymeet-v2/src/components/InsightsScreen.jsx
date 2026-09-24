import React from 'react';
import WeeklyTrendChart from './charts/WeeklyTrendChart';
import { useInteraction } from '../hooks/useInteraction';
import { useAppStore } from '../store/useAppStore';

export default function InsightsScreen() {
  const { interact } = useInteraction();
  const { sleepTime, sleepQuality, steps, stepsGoal, hydration, hydrationGoal, activeBurn, activeBurnGoal } = useAppStore();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-black text-[#181B25]">Insights & Analytics</h2>
          <p className="text-xs text-[#464555]">Cross-stream trends, biometrics & weekly correlation</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#2E7D32] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
          Oura Ring Active
        </span>
      </div>
      
      <div className="bg-[#1E293B] rounded-2xl p-4 shadow-sm space-y-4 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-rounded text-[#34D399]">psychology</span>
          <h3 className="text-sm font-bold text-white">Cognitive Load & Interruption Risk</h3>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-bold text-white">
            <span>68% Focus Blocks</span>
            <span className="text-[#F59E0B]">32% Meetings</span>
          </div>
          <div className="w-full h-2 bg-[#334155] rounded-full overflow-hidden flex">
            <div className="bg-[#6366F1] h-full" style={{ width: '68%' }}></div>
            <div className="bg-[#F59E0B] h-full" style={{ width: '32%' }}></div>
          </div>
        </div>

        <div className="bg-[#0F172A] rounded-xl p-3 border border-[#334155] flex items-start gap-3">
          <span className="material-symbols-rounded text-[#F59E0B] text-[18px]">warning</span>
          <div>
            <h4 className="text-xs font-bold text-white">High Fragmentation Detected</h4>
            <p className="text-[10px] text-[#94A3B8] mt-0.5 leading-snug">
              You have 3 gap periods under 30 minutes today. This increases context-switching friction.
            </p>
            <button onClick={() => interact('Consolidate Gaps')} className="mt-2 px-3 py-1.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[10px] font-bold rounded-lg transition active:scale-95 shadow-sm">
              Consolidate Gaps
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-3.5">
        <h3 className="text-sm font-bold text-[#181B25]">Weekly Summary</h3>
        <WeeklyTrendChart />
        
        {/* 3-Column Metrics Summary Grid */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#E5E8F5]">
          <div onClick={() => interact('View Tasks Velocity')} className="p-2.5 rounded-xl bg-[#F1F3FF] text-center border border-[#E5E8F5] cursor-pointer active:scale-95 transition">
            <p className="text-[10px] text-[#464555] font-medium">Tasks Velocity</p>
            <p className="text-base font-extrabold text-[#3525CD] mt-0.5">53 Done</p>
            <span className="text-[9px] font-bold text-[#10B981]">88% weekly goal</span>
          </div>
          <div onClick={() => interact('View Habits')} className="p-2.5 rounded-xl bg-[#F1F3FF] text-center border border-[#E5E8F5] cursor-pointer active:scale-95 transition">
            <p className="text-[10px] text-[#464555] font-medium">Habits Kept</p>
            <p className="text-base font-extrabold text-[#10B981] mt-0.5">32 / 35</p>
            <span className="text-[9px] font-bold text-[#10B981]">91% consistency</span>
          </div>
          <div onClick={() => interact('View Total Spending')} className="p-2.5 rounded-xl bg-[#F1F3FF] text-center border border-[#E5E8F5] cursor-pointer active:scale-95 transition">
            <p className="text-[10px] text-[#464555] font-medium">Total Spending</p>
            <p className="text-base font-extrabold text-[#0288D1] mt-0.5">₹19,050</p>
            <span className="text-[9px] font-bold text-[#10B981]">₹15.9k under limit</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div onClick={() => interact('Sleep Metrics')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm cursor-pointer active:scale-95 transition">
          <p className="text-[11px] text-[#464555]">Sleep Quality</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">{sleepTime}</p>
          <span className="text-[10px] font-bold text-[#10B981]">{sleepQuality}% Optimal</span>
        </div>
        <div onClick={() => interact('Activity Metrics')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm cursor-pointer active:scale-95 transition">
          <p className="text-[11px] text-[#464555]">Steps Walked</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">{steps.toLocaleString()}</p>
          <span className="text-[10px] font-bold text-[#3525CD]">Goal: {stepsGoal.toLocaleString()}</span>
        </div>
        <div onClick={() => interact('Hydration')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm cursor-pointer active:scale-95 transition">
          <p className="text-[11px] text-[#464555]">Water Hydration</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">{hydration} L</p>
          <span className="text-[10px] font-bold text-[#0288D1]">Goal: {hydrationGoal} L</span>
        </div>
        <div onClick={() => interact('Calories Burned')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm cursor-pointer active:scale-95 transition">
          <p className="text-[11px] text-[#464555]">Active Burn</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">{activeBurn} kcal</p>
          <span className="text-[10px] font-bold text-[#F59E0B]">Goal: {activeBurnGoal} kcal</span>
        </div>
      </div>

      {/* Deep Sleep Architecture (Biometrics) */}
      <div className="bg-[#FAF9FF] rounded-2xl p-4 border border-[#E5E8F5] shadow-sm mt-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-rounded text-[#673AB7]">bedtime</span>
          <h3 className="text-sm font-bold text-[#181B25]">Sleep Architecture</h3>
        </div>
        
        <div className="space-y-3">
          {/* Sleep Stages Bar */}
          <div>
            <div className="flex justify-between text-[10px] text-[#464555] mb-1 font-bold">
              <span>Light (50%)</span>
              <span>REM (25%)</span>
              <span>Deep (25%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full overflow-hidden flex gap-0.5">
              <div className="bg-[#818CF8] h-full" style={{ width: '50%' }}></div>
              <div className="bg-[#C084FC] h-full" style={{ width: '25%' }}></div>
              <div className="bg-[#312E81] h-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="bg-white p-2.5 rounded-xl border border-[#E5E8F5]">
              <p className="text-[10px] text-[#464555] font-medium">HRV (Heart Rate Variability)</p>
              <p className="text-sm font-bold text-[#181B25] mt-0.5">62 ms <span className="text-[#10B981] text-[10px] font-bold">+4</span></p>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#E5E8F5]">
              <p className="text-[10px] text-[#464555] font-medium">Respiratory Rate</p>
              <p className="text-sm font-bold text-[#181B25] mt-0.5">14.2 rpm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Bio-Readiness Graph Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm mt-4">
        <h3 className="text-sm font-bold text-[#181B25] mb-2">Readiness & Vitals Curve</h3>
        <p className="text-xs text-[#464555] mb-4">Peak cognitive window identified between 10:00 AM and 01:00 PM today.</p>
        <div className="h-28 flex items-end justify-between gap-2 px-2 pt-4 border-b border-[#E5E8F5]">
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#3525CD]/20 rounded-t h-16 hover:bg-[#3525CD] transition"></div>
            <span className="text-[10px] text-[#464555]">6AM</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#3525CD] rounded-t h-24"></div>
            <span className="text-[10px] font-bold text-[#3525CD]">9AM</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#3525CD] rounded-t h-26"></div>
            <span className="text-[10px] font-bold text-[#3525CD]">12PM</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#3525CD]/70 rounded-t h-20"></div>
            <span className="text-[10px] text-[#464555]">3PM</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#3525CD]/40 rounded-t h-14"></div>
            <span className="text-[10px] text-[#464555]">6PM</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#3525CD]/20 rounded-t h-10"></div>
            <span className="text-[10px] text-[#464555]">9PM</span>
          </div>
        </div>
      </div>

      {/* Habit Heatmaps (Sprint 3) */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm mt-4">
        <h3 className="text-sm font-bold text-[#181B25] mb-1">Consistency Heatmap</h3>
        <p className="text-[10px] text-[#464555] mb-3">Your last 365 days of logged habits</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#181B25] flex items-center gap-1"><span className="material-symbols-rounded text-[14px] text-[#673AB7]">self_improvement</span> Meditation</span>
              <span className="text-[10px] font-bold text-[#673AB7]">{meditationStreak} Day Streak</span>
            </div>
            <div className="flex gap-[2px] overflow-x-auto pb-1 scrollbar-hide">
              {Array.from({ length: 52 }).map((_, col) => (
                <div key={col} className="flex flex-col gap-[2px]">
                  {Array.from({ length: 7 }).map((_, row) => {
                    const isActive = Math.random() > 0.4;
                    return (
                      <div key={row} className={`w-2.5 h-2.5 rounded-[2px] ${isActive ? 'bg-[#673AB7]/80' : 'bg-[#E5E8F5]'}`}></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#181B25] flex items-center gap-1"><span className="material-symbols-rounded text-[14px] text-[#2E7D32]">fitness_center</span> Exercise</span>
              <span className="text-[10px] font-bold text-[#2E7D32]">{exerciseStreak} Day Streak</span>
            </div>
            <div className="flex gap-[2px] overflow-x-auto pb-1 scrollbar-hide">
              {Array.from({ length: 52 }).map((_, col) => (
                <div key={col} className="flex flex-col gap-[2px]">
                  {Array.from({ length: 7 }).map((_, row) => {
                    const isActive = Math.random() > 0.6;
                    return (
                      <div key={row} className={`w-2.5 h-2.5 rounded-[2px] ${isActive ? 'bg-[#2E7D32]/80' : 'bg-[#E5E8F5]'}`}></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
