import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { useAppStore } from '../../store/useAppStore';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl p-3 border border-white/50 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl">
        <p className="text-[10px] font-bold text-[#464555] dark:text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-lg font-black text-[#3525CD] dark:text-[#818CF8]">
          ₹{payload[0].value.toLocaleString()}
        </p>
        <p className="text-[10px] text-[#10B981] font-bold mt-0.5 flex items-center gap-1">
          <span className="material-symbols-rounded text-[12px]">trending_up</span>
          Optimal Burn Rate
        </p>
      </div>
    );
  }
  return null;
};

export default function SpendingChart() {
  const { weeklySummaryData } = useAppStore();

  return (
    <div className="w-full h-48 mt-4 relative">
      {/* Decorative Glow behind the chart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#3525CD] blur-[60px] opacity-10 dark:opacity-20 rounded-full pointer-events-none"></div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={weeklySummaryData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3525CD" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3525CD" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSpendDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818CF8" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E8F5" strokeOpacity={0.5} />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#777587', fontWeight: 700 }}
            dy={10}
          />
          <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#3525CD', strokeWidth: 2, strokeDasharray: '4 4', opacity: 0.4 }}
          />
          <Area 
            type="monotone" 
            dataKey="spending" 
            stroke="var(--chart-stroke, #3525CD)" 
            strokeWidth={3}
            fill="url(#colorSpend)" 
            activeDot={{ r: 6, fill: '#3525CD', stroke: '#fff', strokeWidth: 3, shadow: '0 4px 12px rgba(53,37,205,0.5)' }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <style dangerouslySetInnerHTML={{__html: `
        :root { --chart-stroke: #3525CD; }
        .dark { --chart-stroke: #818CF8; }
        .dark [fill="url(#colorSpend)"] { fill: url(#colorSpendDark); }
      `}} />
    </div>
  );
}
