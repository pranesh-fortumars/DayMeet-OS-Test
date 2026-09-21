import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RelationshipsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('network'); // 'network', 'gifts', 'family'

  const triggerToast = (msg) => {
    alert(msg);
  };

  const mockNetwork = [
    {
      id: 'n1',
      name: 'Mom',
      relationship: 'Family',
      lastContacted: '2 days ago',
      nextEvent: 'Birthday in 14 days',
      health: 'good', // good, warning
      avatar: 'bg-[#FFEBEE] text-[#E53935]'
    },
    {
      id: 'n2',
      name: 'David Smith',
      relationship: 'College Friend',
      lastContacted: '4 months ago',
      nextEvent: 'No upcoming events',
      health: 'warning',
      avatar: 'bg-[#E0F2FE] text-[#0288D1]'
    }
  ];

  const mockGifts = [
    {
      id: 'g1',
      person: 'Sarah (Wife)',
      idea: 'Espresso Machine (Breville)',
      occasion: 'Anniversary',
      price: '~$500',
      status: 'saving'
    },
    {
      id: 'g2',
      person: 'Mom',
      idea: 'Gardening Toolkit',
      occasion: 'Birthday',
      price: '$45',
      status: 'ready to buy'
    }
  ];

  const mockFamilyHub = [
    {
      id: 'f1',
      title: 'Groceries',
      type: 'List',
      items: 'Milk, Eggs, Bread...',
      icon: 'shopping_cart',
      color: 'bg-[#E8F5E9] text-[#2E7D32]'
    },
    {
      id: 'f2',
      title: 'Weekend Chores',
      type: 'Rotation',
      items: 'Sarah: Vacuum, John: Dishes',
      icon: 'cleaning_services',
      color: 'bg-[#FFF3E0] text-[#F57C00]'
    },
    {
      id: 'f3',
      title: 'Home WiFi',
      type: 'Shared Secret',
      items: 'Pass: SummerVibes24!',
      icon: 'wifi',
      color: 'bg-[#F1F3FF] text-[#3525CD]'
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
          <h1 className="text-xl font-black text-[#181B25]">Relationships</h1>
          <p className="text-xs text-[#464555]">Network, Gifts & Family</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#E5E8F5] p-1 rounded-xl">
        <button 
          onClick={() => setActiveTab('network')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'network' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">diversity_1</span>
          Network
        </button>
        <button 
          onClick={() => setActiveTab('gifts')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'gifts' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">featured_seasonal_and_gifts</span>
          Gifts
        </button>
        <button 
          onClick={() => setActiveTab('family')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'family' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">home</span>
          Family
        </button>
      </div>

      {/* TAB 1: NETWORK & CRM */}
      {activeTab === 'network' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Personal CRM</h2>
            <button onClick={() => triggerToast('Add contact form coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">person_add</span> Add Person
            </button>
          </div>

          <div className="space-y-3">
            {mockNetwork.map(person => (
              <div key={person.id} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${person.avatar}`}>
                  {person.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[#181B25] text-sm leading-tight flex items-center gap-2">
                    {person.name}
                    {person.health === 'warning' && (
                      <span className="material-symbols-rounded text-[#E53935] text-[14px]" title="Needs attention">error</span>
                    )}
                  </h3>
                  <p className="text-[10px] text-[#3525CD] font-bold">{person.relationship}</p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] text-[#464555]">
                      <span className="font-bold">Last:</span> {person.lastContacted}
                    </p>
                    <p className="text-[10px] text-[#464555]">
                      <span className="font-bold text-[#F57C00]">{person.nextEvent}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GIFT PLANNER */}
      {activeTab === 'gifts' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Gift Vault</h2>
            <button onClick={() => triggerToast('Add gift idea form coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">add</span> Add Idea
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockGifts.map(gift => (
              <div key={gift.id} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-bold text-[#3525CD] bg-[#F1F3FF] px-2 py-0.5 rounded">{gift.person}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${gift.status === 'saving' ? 'bg-[#FFF3E0] text-[#F57C00]' : 'bg-[#E8F5E9] text-[#2E7D32]'}`}>
                    {gift.status.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="font-bold text-[#181B25] text-sm leading-tight">{gift.idea}</h3>
                
                <div className="flex justify-between items-end pt-1">
                  <p className="text-[11px] text-[#464555] font-medium">{gift.occasion}</p>
                  <p className="text-sm font-black text-[#181B25]">{gift.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FAMILY HUB */}
      {activeTab === 'family' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Shared Admin</h2>
            <button onClick={() => triggerToast('Invite family members coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">group_add</span> Invite
            </button>
          </div>

          <div className="space-y-3">
            {mockFamilyHub.map(hub => (
              <div key={hub.id} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#3525CD] transition">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${hub.color}`}>
                  <span className="material-symbols-rounded text-[20px]">{hub.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#181B25] text-sm leading-tight">{hub.title}</h3>
                    <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wide">{hub.type}</span>
                  </div>
                  <p className="text-[11px] text-[#464555] mt-1">{hub.items}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
