import React from 'react';

export default function InsightsScreen() {
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm">
          <p className="text-[11px] text-[#464555]">Sleep Quality</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">7h 20m</p>
          <span className="text-[10px] font-bold text-[#10B981]">85% Optimal</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm">
          <p className="text-[11px] text-[#464555]">Steps Walked</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">7,845</p>
          <span className="text-[10px] font-bold text-[#3525CD]">Goal: 10,000</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm">
          <p className="text-[11px] text-[#464555]">Water Hydration</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">1.8 L</p>
          <span className="text-[10px] font-bold text-[#0288D1]">Goal: 2.5 L</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] text-center shadow-sm">
          <p className="text-[11px] text-[#464555]">Active Burn</p>
          <p className="text-xl font-extrabold text-[#181B25] mt-1">480 kcal</p>
          <span className="text-[10px] font-bold text-[#F59E0B]">Goal: 600 kcal</span>
        </div>
      </div>
    </div>
  );
}
