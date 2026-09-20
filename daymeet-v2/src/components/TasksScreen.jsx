import React from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useAppStore } from '../store/useAppStore';

export default function TasksScreen() {
  const { tasks, completeTask } = useAppStore();
  const openQuickAddWith = (type) => console.log('Quick Add:', type);
  
  const setLocationReminder = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
      alert(`Location reminder set for coordinates: ${coordinates.coords.latitude.toFixed(4)}, ${coordinates.coords.longitude.toFixed(4)}`);
    } catch (e) {
      alert('Location permission denied or unavailable on this device.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-black text-[#181B25]">Tasks & Checklists</h2>
          <p className="text-xs text-[#464555]">Action items connected across meetings and modules</p>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => openQuickAddWith('Task')} className="px-3 py-1.5 rounded-xl bg-[#3525CD] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#2B1DAE]">
            <span className="material-symbols-rounded text-[14px]">add</span>
            <span>New Task</span>
          </button>
          <button onClick={setLocationReminder} className="px-3 py-1.5 rounded-xl bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold flex items-center gap-1 hover:bg-[#C8E6C9]">
            <span className="material-symbols-rounded text-[14px]">location_on</span>
            <span>Location Alert</span>
          </button>
        </div>
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
      
      <div className="space-y-2.5 pt-2">
        {tasks.map((task) => (
          <div key={task.id} className={`p-3 rounded-xl border border-[#E5E8F5] shadow-sm flex items-start gap-3 transition ${task.status === 'completed' ? 'bg-[#FAF9FF] opacity-60' : 'bg-white'}`}>
            <button 
              onClick={() => completeTask(task.id)}
              className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center shrink-0 border-2 transition ${task.status === 'completed' ? 'bg-[#10B981] border-[#10B981]' : 'border-[#E5E8F5] bg-[#FAF9FF] hover:border-[#3525CD]'}`}
            >
              {task.status === 'completed' && <span className="material-symbols-rounded text-[14px] text-white">check</span>}
            </button>
            <div className="flex-1">
              <p className={`text-sm font-bold ${task.status === 'completed' ? 'text-[#777587] line-through' : 'text-[#181B25]'}`}>{task.title}</p>
              <p className="text-[10px] text-[#464555] mt-1 flex items-center gap-1">
                <span className="material-symbols-rounded text-[12px]">schedule</span>
                {new Date(task.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center text-[#464555] text-sm py-10">
            No tasks found. Add one!
          </div>
        )}
      </div>
    </div>
  );
}
