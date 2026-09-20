import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', tasks: 12, habits: 4, spending: 2100 },
  { name: 'Tue', tasks: 15, habits: 5, spending: 1500 },
  { name: 'Wed', tasks: 8, habits: 3, spending: 3200 },
  { name: 'Thu', tasks: 18, habits: 5, spending: 900 },
  { name: 'Fri', tasks: 22, habits: 5, spending: 4500 },
  { name: 'Sat', tasks: 5, habits: 2, spending: 5100 },
  { name: 'Sun', tasks: 7, habits: 4, spending: 1200 },
];

export default function WeeklyTrendChart() {
  return (
    <div className="w-full h-56 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
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
          <XAxis dataKey="name" tick={{fontSize: 10, fill: '#777587'}} axisLine={false} tickLine={false} />
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
