import React from 'react';

export default function TasksScreen() {
  const openQuickAddWith = (type) => console.log('Quick Add:', type);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-black text-[#181B25]">Tasks & Checklists</h2>
          <p className="text-xs text-[#464555]">Action items connected across meetings and modules</p>
        </div>
        <button onClick={() => openQuickAddWith('Task')} className="px-3 py-1.5 rounded-xl bg-[#3525CD] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#2B1DAE]">
          <span className="material-symbols-rounded text-[14px]">add</span>
          <span>New Task</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded-full text-xs font-bold bg-[#181B25] text-white">All (6)</button>
        <button className="px-3 py-1 rounded-full text-xs font-medium bg-[#EBEDFB] text-[#464555] hover:bg-[#E5E8F5]">Pending (4)</button>
        <button className="px-3 py-1 rounded-full text-xs font-medium bg-[#EBEDFB] text-[#464555] hover:bg-[#E5E8F5]">Completed (2)</button>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-xl p-3 border border-[#E5E8F5] dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EDE7F6] dark:bg-slate-800 text-[#3525CD] flex items-center justify-center">
            <span className="material-symbols-rounded text-[18px]">low_priority</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#181B25] dark:text-white">Auto-sort by Priority</span>
            </div>
            <p className="text-[10px] text-[#464555] dark:text-gray-400">Dynamically reorder tasks by priority and due date</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3525CD]"></div>
        </label>
      </div>
      
      <div className="space-y-2.5 pt-2 text-center text-[#464555] text-sm">
        <p>Loading tasks from state...</p>
      </div>
    </div>
  );
}
