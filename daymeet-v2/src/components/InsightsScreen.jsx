import React from 'react';
import WeeklyTrendChart from './charts/WeeklyTrendChart';
import { useInteraction } from '../hooks/useInteraction';

export default function InsightsScreen() {
  const { interact } = useInteraction();
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
          <p className="text-xl font-extrabold text-[#181B25] mt-1">7h 20m</p>
          <span className="text-[10px] font-bold text-[#10B981]">85% Optimal</span>
        </div>
        <div onClick={() => interact('Activity Metrics')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm cursor-pointer active:scale-95 transition">
          <p className="text-[11px] text-[#464555]">Steps Walked</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">7,845</p>
          <span className="text-[10px] font-bold text-[#3525CD]">Goal: 10,000</span>
        </div>
        <div onClick={() => interact('Hydration')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm cursor-pointer active:scale-95 transition">
          <p className="text-[11px] text-[#464555]">Water Hydration</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">1.8 L</p>
          <span className="text-[10px] font-bold text-[#0288D1]">Goal: 2.5 L</span>
        </div>
        <div onClick={() => interact('Calories Burned')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm cursor-pointer active:scale-95 transition">
          <p className="text-[11px] text-[#464555]">Active Burn</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">480 kcal</p>
          <span className="text-[10px] font-bold text-[#F59E0B]">Goal: 600 kcal</span>
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
    </div>
  );
}
