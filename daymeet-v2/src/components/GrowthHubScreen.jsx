import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInteraction } from '../hooks/useInteraction';
import HabitHeatmap from './charts/HabitHeatmap';

export default function GrowthHubScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();
  const [activeTab, setActiveTab] = useState('horizons'); // 'horizons', 'decisions', 'experiments', 'challenges'

  const mockOKRs = [
    { id: 'okr1', title: 'Launch MVP to 10k Users', progress: 65, status: 'on-track' },
    { id: 'okr2', title: 'Achieve 15% Body Fat', progress: 40, status: 'at-risk' },
    { id: 'okr3', title: 'Read 24 Books This Year', progress: 85, status: 'on-track' },
  ];

  const mockDecisions = [
    {
      id: 'd1',
      title: 'Move to a fully remote role',
      options: ['Stay at current office job', 'Take remote offer', 'Negotiate hybrid'],
      decision: 'Take remote offer',
      reasoning: 'Gives me 2 hours of commute time back daily for side projects.',
      dateMade: 'Oct 1, 2026',
      reviewDate: 'Jan 1, 2027',
      status: 'waiting' // waiting, reviewed
    }
  ];

  const mockExperiments = [
    {
      id: 'e1',
      title: 'No Caffeine After 2 PM',
      duration: '14 Days',
      progress: 6,
      hypothesis: 'My deep sleep score will improve by at least 10%.',
      status: 'active'
    },
    {
      id: 'e2',
      title: 'Read 20 pages every morning',
      duration: '30 Days',
      progress: 30,
      hypothesis: 'I will finish 2 books a month without feeling rushed.',
      status: 'completed'
    }
  ];

  const mockChallenges = [
    {
      id: 'c1',
      title: '30-Day Savings Sprint',
      description: 'Cook all meals at home, $0 on dining out.',
      progress: 12,
      total: 30,
      color: 'bg-green-500'
    },
    {
      id: 'c2',
      title: 'Digital Detox Weekend',
      description: 'Screen time under 1 hour Sat/Sun.',
      progress: 1,
      total: 2,
      color: 'bg-purple-500'
    }
  ];


  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white border border-[#E5E8F5] flex items-center justify-center text-[#464555] hover:bg-gray-50 transition">
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181B25]">Growth Hub</h1>
          <p className="text-xs text-[#464555]">Decisions, Experiments & Challenges</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#E5E8F5] p-1 rounded-xl overflow-x-auto no-scrollbar">
        <button 
          onClick={() => { setActiveTab('horizons'); interact('Tab: Horizons'); }}
          className={`flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === 'horizons' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          Horizons
        </button>
        <button 
          onClick={() => { setActiveTab('decisions'); interact('Tab: Decisions'); }}
          className={`flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === 'decisions' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          Decisions
        </button>
        <button 
          onClick={() => { setActiveTab('experiments'); interact('Tab: Experiments'); }}
          className={`flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === 'experiments' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          Experiments
        </button>
        <button 
          onClick={() => { setActiveTab('challenges'); interact('Tab: Challenges'); }}
          className={`flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === 'challenges' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          Challenges
        </button>
      </div>

      {/* HORIZONS & OKRS */}
      {activeTab === 'horizons' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <HabitHeatmap title="Habit Consistency (30 Days)" />

          <div className="flex items-center justify-between mt-6">
            <h2 className="text-sm font-bold text-[#181B25]">Strategic OKRs (Q4)</h2>
            <button onClick={() => interact('New OKR')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">add</span> Add
            </button>
          </div>

          <div className="space-y-3">
            {mockOKRs.map(okr => (
              <div key={okr.id} onClick={() => interact(`OKR: ${okr.title}`)} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm cursor-pointer active:scale-[0.98] transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#181B25] text-sm leading-tight">{okr.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${okr.status === 'on-track' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFEBEE] text-[#C62828]'}`}>
                    {okr.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${okr.status === 'on-track' ? 'bg-[#3525CD]' : 'bg-[#EF4444]'}`} 
                    style={{ width: `${okr.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DECISION JOURNAL */}
      {activeTab === 'decisions' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Decision Journal</h2>
            <button onClick={() => interact('New decision form coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">add</span> Log Decision
            </button>
          </div>
          
          <div className="space-y-3">
            {mockDecisions.map(dec => (
              <div key={dec.id} onClick={() => interact(`Decision: ${dec.title}`)} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm space-y-3 cursor-pointer active:scale-[0.98] transition">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[#181B25] text-sm leading-tight">{dec.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF3E0] text-[#F57C00]">Review: {dec.reviewDate}</span>
                </div>
                
                <div className="bg-[#FAF9FF] p-3 rounded-xl border border-[#E5E8F5] text-xs space-y-2">
                  <p><span className="font-bold text-[#3525CD]">Chosen:</span> {dec.decision}</p>
                  <p><span className="font-bold text-[#464555]">Why:</span> {dec.reasoning}</p>
                </div>

                <div className="flex gap-2 text-[10px] text-[#464555] font-medium pt-1">
                  <span className="px-2 py-1 rounded bg-gray-100">Options considered: {dec.options.length}</span>
                  <span className="px-2 py-1 rounded bg-gray-100">Made: {dec.dateMade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIMENT TRACKER */}
      {activeTab === 'experiments' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Personal Experiments</h2>
            <button onClick={() => interact('New experiment form coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">science</span> Start
            </button>
          </div>

          <div className="space-y-3">
            {mockExperiments.map(exp => (
              <div key={exp.id} onClick={() => interact(`Experiment: ${exp.title}`)} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm relative overflow-hidden cursor-pointer active:scale-[0.98] transition">
                {exp.status === 'completed' && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#10B981]/10 rounded-bl-full flex items-start justify-end p-2">
                    <span className="material-symbols-rounded text-[20px] text-[#10B981]">task_alt</span>
                  </div>
                )}
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-[#3525CD] font-bold">{exp.duration} Experiment</p>
                  <h3 className="font-bold text-[#181B25] text-sm pr-8">{exp.title}</h3>
                </div>
                
                <p className="text-[11px] text-[#464555] italic border-l-2 border-gray-300 pl-2 mb-3">
                  "Hypothesis: {exp.hypothesis}"
                </p>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-[#181B25]">
                    <span>Day {exp.progress}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${exp.status === 'completed' ? 'bg-[#10B981]' : 'bg-[#3525CD]'}`} 
                      style={{ width: `${(exp.progress / parseInt(exp.duration)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHALLENGE SYSTEM */}
      {activeTab === 'challenges' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Active Challenges</h2>
            <button onClick={() => interact('Challenge catalog coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">explore</span> Browse
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {mockChallenges.map(chal => (
              <div key={chal.id} onClick={() => interact(`Challenge: ${chal.title}`)} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] shadow-sm flex flex-col justify-between h-36 cursor-pointer active:scale-[0.95] transition">
                <div>
                  <h3 className="font-bold text-[#181B25] text-xs leading-tight mb-1">{chal.title}</h3>
                  <p className="text-[9px] text-[#464555] leading-snug">{chal.description}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-right">{chal.progress} / {chal.total}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${chal.color}`} 
                      style={{ width: `${(chal.progress / chal.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
