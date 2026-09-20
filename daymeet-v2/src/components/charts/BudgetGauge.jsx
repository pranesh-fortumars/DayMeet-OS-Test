import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../../store/useAppStore';

export default function BudgetGauge() {
  const { spending, dailyBudget } = useAppStore();
  
  // Calculate percentage for a semi-circle gauge (180 degrees)
  const percent = Math.min((spending / dailyBudget) * 100, 100);
  
  const data = [
    { name: 'Spent', value: percent },
    { name: 'Remaining', value: 100 - percent }
  ];
  
  const COLORS = ['#3525CD', '#E5E8F5'];

  return (
    <div className="relative w-full h-32 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            cornerRadius={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 text-center flex flex-col items-center justify-center w-full">
        <span className="text-[10px] font-black bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full mb-1">
          {percent.toFixed(0)}% USED
        </span>
        <p className="text-2xl font-black text-[#181B25]">₹{spending}</p>
        <p className="text-[10px] text-[#464555]">of ₹{dailyBudget} daily target</p>
      </div>
    </div>
  );
}
