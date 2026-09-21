import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../../store/useAppStore';

export default function WeeklyTrendChart() {
  const { weeklySummaryData } = useAppStore();
  return (
    <div className="w-full h-56 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={weeklySummaryData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3525CD" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3525CD" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorHabits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E8F5" />
          <XAxis dataKey="day" tick={{fontSize: 10, fill: '#777587'}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize: 10, fill: '#777587'}} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: '1px solid #E5E8F5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#181B25', marginBottom: '4px' }}
          />
          <Area type="monotone" dataKey="tasks" stroke="#3525CD" strokeWidth={2} fillOpacity={1} fill="url(#colorTasks)" />
          <Area type="monotone" dataKey="habits" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorHabits)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
