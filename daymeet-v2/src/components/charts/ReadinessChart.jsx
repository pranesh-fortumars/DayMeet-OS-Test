import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { triggerHaptic } from '../../utils/haptics';

const data = [
  { time: '6AM', readiness: 40 },
  { time: '9AM', readiness: 85 },
  { time: '12PM', readiness: 95 },
  { time: '3PM', readiness: 65 },
  { time: '6PM', readiness: 45 },
  { time: '9PM', readiness: 30 }
];

export default function ReadinessChart() {
  const [activeValue, setActiveValue] = useState(data[2].readiness);
  const [activeLabel, setActiveLabel] = useState(data[2].time);

  const handleMouseMove = (state) => {
    if (state && state.activePayload && state.activePayload.length) {
      const payload = state.activePayload[0].payload;
      if (activeValue !== payload.readiness) {
        setActiveValue(payload.readiness);
        setActiveLabel(payload.time);
        triggerHaptic('light'); // Scrubbing haptic feedback
      }
    }
  };

  const handleMouseLeave = () => {
    setActiveValue(data[2].readiness);
    setActiveLabel(data[2].time);
  };

  return (
    <div className="w-full flex flex-col pt-2">
      {/* Dynamic Header */}
      <div className="mb-4">
        <p className="text-[10px] font-bold text-[#464555] dark:text-gray-400 uppercase tracking-wider transition-all">
          {activeLabel} Readiness
        </p>
        <p className="text-3xl font-black text-[#10B981] transition-all">
          {activeValue}%
        </p>
      </div>

      <div className="w-full h-40 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#10B981] blur-[60px] opacity-10 dark:opacity-20 rounded-full pointer-events-none"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E8F5" strokeOpacity={0.5} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#777587', fontWeight: 700 }}
              dy={10}
            />
            <YAxis hide domain={[0, 100]} />
            
            <Tooltip 
              content={<></>} 
              cursor={{ stroke: '#10B981', strokeWidth: 2, strokeDasharray: '4 4', opacity: 0.4 }}
            />
            
            <Area 
              type="monotone" 
              dataKey="readiness" 
              stroke="#10B981" 
              strokeWidth={4}
              fill="url(#colorReadiness)" 
              activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 3, shadow: '0 4px 12px rgba(16,185,129,0.5)' }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
