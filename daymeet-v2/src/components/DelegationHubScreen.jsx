import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInteraction } from '../hooks/useInteraction';

export default function DelegationHubScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();

  const mockDelegations = [
    {
      id: 'd1',
      title: 'Fix auth edge cases in mobile build',
      assignee: 'Alice (Engineering)',
      initials: 'AL',
      avatarColor: 'bg-[#E2DFFF] text-[#3525CD]',
      status: 'In Progress',
      statusColor: 'bg-[#E8F5E9] text-[#2E7D32]',
      dueDate: 'Today, 5 PM',
      pinged: false
    },
    {
      id: 'd2',
      title: 'Design updated OKR widgets',
      assignee: 'Bob (Design)',
      initials: 'BO',
      avatarColor: 'bg-[#FFF3E0] text-[#F57C00]',
      status: 'Pending Accept',
      statusColor: 'bg-[#FFF8E1] text-[#F57C00]',
      dueDate: 'Tomorrow',
      pinged: true
    },
    {
      id: 'd3',
      title: 'Review Q4 legal disclaimers',
      assignee: 'Claire (Legal)',
      initials: 'CL',
      avatarColor: 'bg-[#FCE4EC] text-[#C2185B]',
      status: 'In Review',
      statusColor: 'bg-[#E3F2FD] text-[#1976D2]',
      dueDate: 'Friday',
      pinged: false
    },
    {
      id: 'd4',
      title: 'Pick up dry cleaning',
      assignee: 'Partner (Family)',
      initials: 'PT',
      avatarColor: 'bg-[#F1F3FF] text-[#464555]',
      status: 'Accepted',
      statusColor: 'bg-[#E8F5E9] text-[#2E7D32]',
      dueDate: 'Tonight',
      pinged: false
    }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white border border-[#E5E8F5] flex items-center justify-center text-[#464555] hover:bg-gray-50 transition">
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181B25]">Delegation Hub</h1>
          <p className="text-xs text-[#464555]">Cross-functional tasks & tracking</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <h2 className="text-sm font-bold text-[#181B25]">Active Delegations</h2>
        <button onClick={() => interact('New Delegation')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
          <span className="material-symbols-rounded text-[14px]">add</span> Delegate
        </button>
      </div>

      <div className="space-y-3">
        {mockDelegations.map(del => (
          <div key={del.id} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm active:scale-[0.98] transition">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${del.avatarColor}`}>
                  {del.initials}
                </div>
                <div>
                  <h3 className="font-bold text-[#181B25] text-sm leading-tight">{del.title}</h3>
                  <p className="text-[10px] text-[#464555]">{del.assignee} • Due {del.dueDate}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-[#F1F3FF] pt-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${del.statusColor}`}>
                {del.status}
              </span>
              <button 
                onClick={() => interact(`Pinged ${del.assignee}`)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${del.pinged ? 'bg-gray-100 text-gray-400' : 'bg-[#E2DFFF] text-[#3525CD] hover:bg-[#D0CCFF]'}`}
                disabled={del.pinged}
              >
                <span className="material-symbols-rounded text-[14px]">{del.pinged ? 'check' : 'notifications_active'}</span>
                {del.pinged ? 'Pinged' : 'Ping'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Autonomous Synthesis Card */}
      <div className="bg-[#181B25] p-5 rounded-3xl shadow-xl mt-8 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#6366F1]/20 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-rounded text-[#818CF8]">smart_toy</span>
            <h3 className="font-bold text-lg">Delegation Health: 94%</h3>
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
            You have successfully delegated 12 hours of work this week. All cross-functional teams are operating within SLA. 
          </p>
          <button className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition">
            View Weekly Digest
          </button>
        </div>
      </div>

    </div>
  );
}
