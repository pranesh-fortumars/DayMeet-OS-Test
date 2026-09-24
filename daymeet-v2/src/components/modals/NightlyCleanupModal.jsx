import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function NightlyCleanupModal() {
  const { tasks, updateTask } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  const pendingTasks = tasks.filter(t => t.status !== 'completed');

  useEffect(() => {
    // Check time on mount
    const hour = new Date().getHours();
    if (hour >= 21 && pendingTasks.length > 0 && !hasPrompted) {
      setIsOpen(true);
      setHasPrompted(true); // Ensure it only prompts once per session
    }
  }, [pendingTasks.length, hasPrompted]);

  const handlePushToTomorrow = () => {
    pendingTasks.forEach(task => {
      updateTask(task.id, { title: task.title + ' (Rescheduled)' });
    });
    setIsOpen(false);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#181B25] text-[#F59E0B] mx-auto mb-4">
          <span className="material-symbols-rounded text-[28px]">bedtime</span>
        </div>
        
        <h3 className="text-xl font-bold text-center text-[#181B25] dark:text-white mb-2">Day's End Cleanup</h3>
        <p className="text-sm text-center text-[#464555] dark:text-slate-400 mb-6">
          It's past 9:00 PM and you still have {pendingTasks.length} pending task(s). Would you like to push them to tomorrow to clear your mind?
        </p>

        <div className="space-y-3">
          <button 
            onClick={handlePushToTomorrow}
            className="w-full h-[52px] rounded-xl bg-[#3525CD] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2B1DAE] transition"
          >
            <span>Push All to Tomorrow</span>
            <span className="material-symbols-rounded text-[18px]">event_forward</span>
          </button>
          
          <button 
            onClick={handleDismiss}
            className="w-full h-[52px] rounded-xl bg-gray-100 dark:bg-slate-800 text-[#464555] dark:text-white text-sm font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            I'll do them tonight
          </button>
        </div>
      </div>
    </div>
  );
}
