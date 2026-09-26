import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInteraction } from '../hooks/useInteraction';

export default function FamilySyncScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();
  
  const [activeTab, setActiveTab] = useState('chores'); // 'chores', 'grocery', 'vehicles'

  const mockChores = [
    { id: 1, name: 'Replace HVAC Filter', assignedTo: 'You', dueDate: 'Tomorrow', icon: 'air', rotating: true },
    { id: 2, name: 'Take out Recycling', assignedTo: 'Alex', dueDate: 'Today, 8 PM', icon: 'recycling', rotating: true },
    { id: 3, name: 'Vacuum Living Room', assignedTo: 'Sarah', dueDate: 'Saturday', icon: 'cleaning_services', rotating: false }
  ];

  const mockGroceries = {
    'Produce': [
      { id: 'g1', name: 'Avocados (3x)', checked: false },
      { id: 'g2', name: 'Spinach', checked: true }
    ],
    'Dairy & Cold': [
      { id: 'g3', name: 'Oat Milk', checked: false },
      { id: 'g4', name: 'Eggs (Dozen)', checked: false }
    ],
    'Pantry': [
      { id: 'g5', name: 'Coffee Beans', checked: false }
    ]
  };

  const handleRouletteSpin = () => {
    interact('Spun Chore Roulette');
    // Simulated spin logic could happen here
    alert('Chore Roulette Spin: Assignments rotated!');
  };

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white border border-[#E5E8F5] flex items-center justify-center text-[#464555] hover:bg-gray-50 transition">
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181B25]">Household Command</h1>
          <p className="text-xs text-[#464555]">Sync chores, groceries, and home assets</p>
        </div>
      </div>

      <div className="flex bg-[#E5E8F5] p-1 rounded-xl">
        <button 
          onClick={() => { setActiveTab('chores'); interact('Household: Chores'); }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'chores' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">autorenew</span>
          Chores
        </button>
        <button 
          onClick={() => { setActiveTab('grocery'); interact('Household: Groceries'); }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'grocery' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">shopping_cart</span>
          Groceries
        </button>
      </div>

      {activeTab === 'chores' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-[#FFEBEE] to-[#FFF5F5] rounded-2xl p-4 border border-[#FFE0E0] shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#E53935] flex items-center gap-1.5">
                <span className="material-symbols-rounded">casino</span>
                Chore Roulette Engine
              </h3>
            </div>
            <p className="text-[10px] text-[#D32F2F] mt-1 mb-3">Fair-share rotation algorithm active for recurring household maintenance.</p>
            <button 
              onClick={handleRouletteSpin}
              className="w-full py-2 bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-bold rounded-xl active:scale-95 transition shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-rounded text-[16px]">sync</span>
              Spin the Roulette
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#181B25]">Active Duties</h3>
            {mockChores.map(chore => (
              <div key={chore.id} className="flex items-center justify-between p-3 bg-[#FAF9FF] rounded-xl border border-[#E5E8F5]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0288D1] flex items-center justify-center">
                    <span className="material-symbols-rounded text-[16px]">{chore.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181B25]">{chore.name}</p>
                    <p className="text-[10px] font-bold text-[#0288D1]">Assigned: {chore.assignedTo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#464555]">Due {chore.dueDate}</p>
                  {chore.rotating && <span className="text-[9px] font-bold text-[#10B981] bg-[#F0FDF4] px-1.5 py-0.5 rounded ml-auto w-fit mt-0.5 block">Rotating</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'grocery' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Aisle-Sorted List</h2>
            <button className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">add</span> Item
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(mockGroceries).map(([aisle, items]) => (
              <div key={aisle} className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-2">
                <h3 className="text-xs font-black text-[#8B899C] uppercase tracking-wider mb-2">{aisle}</h3>
                {items.map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${item.checked ? 'bg-[#10B981] border-[#10B981]' : 'border-[#E5E8F5] group-hover:border-[#3525CD]'}`}>
                      {item.checked && <span className="material-symbols-rounded text-[14px] text-white">check</span>}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${item.checked ? 'text-[#8B899C] line-through' : 'text-[#181B25]'}`}>{item.name}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
