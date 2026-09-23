import React from 'react';

export default function HabitHeatmap({ data = [], title = "30-Day Consistency" }) {
  // Generate a mock 30-day array if no data is provided
  // Levels: 0 (none), 1 (light), 2 (medium), 3 (high)
  const days = data.length > 0 ? data : Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    level: Math.floor(Math.random() * 4)
  }));

  const getColor = (level) => {
    switch(level) {
      case 1: return 'bg-[#C7D2FE]'; // Indigo-200
      case 2: return 'bg-[#818CF8]'; // Indigo-400
      case 3: return 'bg-[#4F46E5]'; // Indigo-600
      default: return 'bg-[#F1F5F9]'; // Slate-100 (Empty)
    }
  };

  // Group into columns of 7 for the grid layout (similar to GitHub)
  const columns = [];
  for (let i = 0; i < days.length; i += 7) {
    columns.push(days.slice(i, i + 7));
  }

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#181B25]">{title}</h3>
          <p className="text-[10px] text-[#464555]">Daily habit completion ratio</p>
        </div>
        <div className="flex gap-1 items-center text-[9px] font-bold text-[#94A3B8]">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#F1F5F9]"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#C7D2FE]"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#818CF8]"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#4F46E5]"></div>
          <span>More</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1.5">
            {col.map((day, dayIdx) => (
              <div 
                key={dayIdx} 
                title={`${day.date}: Level ${day.level}`}
                className={`w-3.5 h-3.5 rounded-sm ${getColor(day.level)} transition-colors duration-300 hover:ring-2 hover:ring-offset-1 hover:ring-[#4F46E5]`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
