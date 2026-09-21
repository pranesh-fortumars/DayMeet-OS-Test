import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CleanupScreen() {
  const navigate = useNavigate();
  
  // Mock stale data
  const [staleTasks, setStaleTasks] = useState([
    { id: 't1', title: 'Buy printer ink', daysOld: 45 },
    { id: 't2', title: 'Call broadband provider', daysOld: 32 }
  ]);
  
  const [expiredReminders, setExpiredReminders] = useState([
    { id: 'r1', title: 'Cancel Adobe trial', expiredDays: 14 }
  ]);
  
  const [unusedSubs, setUnusedSubs] = useState([
    { id: 's1', title: 'Netflix', cost: '$15.99/mo', unusedDays: 60 }
  ]);

  const removeTask = (id) => setStaleTasks(prev => prev.filter(t => t.id !== id));
  const removeReminder = (id) => setExpiredReminders(prev => prev.filter(r => r.id !== id));
  const removeSub = (id) => setUnusedSubs(prev => prev.filter(s => s.id !== id));

  const totalItems = staleTasks.length + expiredReminders.length + unusedSubs.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white border border-[#E5E8F5] flex items-center justify-center text-[#464555] hover:bg-gray-50 transition">
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181B25]">Digital Cleanup</h1>
          <p className="text-xs text-[#464555]">{totalItems} items need your attention</p>
        </div>
      </div>

      {totalItems === 0 && (
        <div className="bg-white p-8 rounded-3xl border border-[#10B981] flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#10B981] flex items-center justify-center mb-4">
            <span className="material-symbols-rounded text-[32px]">cleaning_services</span>
          </div>
          <h3 className="font-bold text-[#181B25] text-lg">All Clean!</h3>
          <p className="text-sm text-[#464555] mt-1">Your digital space is decluttered.</p>
        </div>
      )}

      {staleTasks.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#181B25] flex items-center gap-2">
            <span className="material-symbols-rounded text-[18px] text-[#E53935]">warning</span>
            Stale Tasks (&gt;30 Days)
          </h2>
          <div className="space-y-2">
            {staleTasks.map(task => (
              <div key={task.id} className="bg-white p-3 rounded-2xl border border-[#E5E8F5] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#181B25]">{task.title}</p>
                  <p className="text-[10px] text-[#E53935] font-medium">{task.daysOld} days old</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => removeTask(task.id)} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition">Keep</button>
                  <button onClick={() => removeTask(task.id)} className="px-3 py-1.5 rounded-lg bg-[#FFEBEE] text-[#E53935] text-xs font-bold hover:bg-[#FFCDD2] transition flex items-center gap-1">
                    <span className="material-symbols-rounded text-[14px]">delete</span> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expiredReminders.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#181B25] flex items-center gap-2">
            <span className="material-symbols-rounded text-[18px] text-[#F57C00]">history_toggle_off</span>
            Expired Reminders
          </h2>
          <div className="space-y-2">
            {expiredReminders.map(rem => (
              <div key={rem.id} className="bg-white p-3 rounded-2xl border border-[#E5E8F5] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#181B25]">{rem.title}</p>
                  <p className="text-[10px] text-[#F57C00] font-medium">Expired {rem.expiredDays} days ago</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => removeReminder(rem.id)} className="px-3 py-1.5 rounded-lg bg-[#FFF3E0] text-[#F57C00] text-xs font-bold hover:bg-[#FFE0B2] transition flex items-center gap-1">
                    <span className="material-symbols-rounded text-[14px]">clear_all</span> Clear
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {unusedSubs.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#181B25] flex items-center gap-2">
            <span className="material-symbols-rounded text-[18px] text-[#3525CD]">credit_card</span>
            Unused Subscriptions
          </h2>
          <div className="space-y-2">
            {unusedSubs.map(sub => (
              <div key={sub.id} className="bg-white p-3 rounded-2xl border border-[#E5E8F5] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#181B25]">{sub.title}</p>
                  <p className="text-[10px] text-[#3525CD] font-medium">Not used in {sub.unusedDays} days • {sub.cost}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => removeSub(sub.id)} className="px-3 py-1.5 rounded-lg bg-[#F1F3FF] text-[#3525CD] text-xs font-bold hover:bg-[#D9D7FF] transition flex items-center gap-1">
                    <span className="material-symbols-rounded text-[14px]">cancel</span> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
