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
        {tasks.map((task) => {
          // Determine styles based on priority
          const prio = task.priority || 'Medium';
          let prioBadge = null;
          let leftBorder = 'border-l-4 border-l-slate-300';
          if (prio === 'High') {
            prioBadge = <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300">HIGH</span>;
            leftBorder = 'border-l-4 border-l-red-500';
          } else if (prio === 'Medium') {
            prioBadge = <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">MED</span>;
            leftBorder = 'border-l-4 border-l-amber-500';
          } else {
            prioBadge = <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">LOW</span>;
            leftBorder = 'border-l-4 border-l-blue-500';
          }

          // Determine styles based on tagType
          const getTagStyles = (tagType) => {
            switch(tagType) {
              case 'meeting': return { bg: '#EDE7F6', text: '#673AB7', line: '#3525CD' };
              case 'priority': return { bg: '#FFEBEE', text: '#E53935', line: '#E53935' };
              case 'expense': return { bg: '#E8F5E9', text: '#2E7D32', line: '#2E7D32' };
              case 'focus': return { bg: '#EDE7F6', text: '#3525CD', line: '#3525CD' };
              case 'wellness': return { bg: '#E1F5FE', text: '#0288D1', line: '#0288D1' };
              case 'autopay': return { bg: '#ECEFF1', text: '#455A64', line: '#005338' };
              case 'travel': return { bg: '#E8EAF6', text: '#3949AB', line: '#5C6BC0' };
              default: return { bg: '#E5E8F5', text: '#464555', line: '#3525CD' };
            }
          };
          const style = getTagStyles(task.tagType);

          return (
            <div key={task.id} className={`bg-white dark:bg-[#1E293B] rounded-xl p-3.5 border border-[#E5E8F5] dark:border-slate-700 shadow-sm flex items-center justify-between gap-3 ${leftBorder}`}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button 
                  onClick={() => completeTask(task.id)} 
                  className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition ${task.status === 'completed' ? 'bg-[#10B981] border-[#10B981] text-white' : 'bg-[#E5E8F5] dark:bg-slate-800 border-[#C7C4D8] dark:border-slate-600 text-transparent hover:border-[#3525CD]'}`}
                >
                  <span className="material-symbols-rounded text-[16px]">{task.status === 'completed' ? 'check' : ''}</span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-xs font-bold truncate ${task.status === 'completed' ? 'line-through text-[#777587]' : 'text-[#181B25] dark:text-white'}`}>{task.title}</p>
                    {prioBadge}
                  </div>
                  <p className="text-[10px] text-[#464555] dark:text-gray-400 truncate">
                    {task.subtitle || 'Task'} • Due {task.time || new Date(task.createdAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
              {task.tag && (
                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold" style={{backgroundColor: style.bg, color: style.text}}>
                  {task.tag}
                </span>
              )}
            </div>
          );
        })}
        
        {tasks.length === 0 && (
          <div className="text-center text-[#464555] text-sm py-10">
            No tasks found. Add one!
          </div>
        )}
      </div>
    </div>
  );
}
