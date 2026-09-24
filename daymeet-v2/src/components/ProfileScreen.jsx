import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useInteraction } from '../hooks/useInteraction';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();
  
  const handleSignOut = async () => {
    interact('Sign Out Initiated');
    try {
      await signOut(auth);
      // App.jsx will automatically route to AuthScreen because user state will become null
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-10">
      <div className="flex items-center gap-4 pt-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#6FFBBE] p-0.5 shadow-md">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover bg-[#F1F3FF]" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#181B25]">Pranesh Fortumars</h2>
          <p className="text-sm text-[#464555] font-medium">pranesh@daymeet.com</p>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-[#F59E0B]/10 text-[#D97706]">
            <span className="material-symbols-rounded text-[12px]">workspace_premium</span>
            DayMeet Pro
          </span>
        </div>
      </div>

      {/* Account Settings Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div onClick={() => interact('Subscription Details')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] shadow-sm cursor-pointer active:scale-95 transition">
          <div className="w-8 h-8 rounded-full bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center mb-3">
            <span className="material-symbols-rounded text-[18px]">credit_card</span>
          </div>
          <h3 className="text-sm font-bold text-[#181B25]">Billing & Plan</h3>
          <p className="text-[11px] text-[#464555] mt-0.5">Pro • Renews Nov 12</p>
        </div>
        <div onClick={() => interact('Cloud Sync')} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] shadow-sm cursor-pointer active:scale-95 transition relative overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-3">
            <span className="material-symbols-rounded text-[18px]">cloud_sync</span>
          </div>
          <h3 className="text-sm font-bold text-[#181B25]">Cloud Storage</h3>
          <p className="text-[11px] text-[#464555] mt-0.5">2.4 GB / 15 GB Used</p>
          <div className="absolute bottom-0 left-0 h-1 bg-[#2E7D32]" style={{ width: '15%' }}></div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-2xl border border-[#E5E8F5] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F5] bg-[#FAF9FF]">
          <h3 className="text-xs font-bold text-[#464555] uppercase tracking-wider">App Preferences</h3>
        </div>
        
        <div onClick={() => interact('Appearance')} className="flex items-center justify-between p-4 border-b border-[#E5E8F5] cursor-pointer hover:bg-gray-50 transition active:bg-gray-100">
          <div className="flex items-center gap-3">
            <span className="material-symbols-rounded text-[#3525CD]">palette</span>
            <span className="text-sm font-bold text-[#181B25]">Appearance</span>
          </div>
          <div className="flex items-center gap-2 text-[#464555]">
            <span className="text-[11px]">System Default</span>
            <span className="material-symbols-rounded text-[18px]">chevron_right</span>
          </div>
        </div>

        <div onClick={() => interact('AI Copilot Voice')} className="flex items-center justify-between p-4 border-b border-[#E5E8F5] cursor-pointer hover:bg-gray-50 transition active:bg-gray-100">
          <div className="flex items-center gap-3">
            <span className="material-symbols-rounded text-[#673AB7]">record_voice_over</span>
            <span className="text-sm font-bold text-[#181B25]">AI Copilot Voice</span>
          </div>
          <div className="flex items-center gap-2 text-[#464555]">
            <span className="text-[11px]">British (Nova)</span>
            <span className="material-symbols-rounded text-[18px]">chevron_right</span>
          </div>
        </div>

        <div onClick={() => interact('Connected Integrations')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition active:bg-gray-100">
          <div className="flex items-center gap-3">
            <span className="material-symbols-rounded text-[#0288D1]">api</span>
            <span className="text-sm font-bold text-[#181B25]">Connected Apps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center border-2 border-white"><span className="material-symbols-rounded text-white text-[10px]">music_note</span></div>
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center border-2 border-white"><span className="material-symbols-rounded text-white text-[10px]">watch</span></div>
            </div>
            <span className="material-symbols-rounded text-[18px] text-[#464555]">chevron_right</span>
          </div>
        </div>
      </div>

      {/* Security & Support */}
      <div className="bg-white rounded-2xl border border-[#E5E8F5] shadow-sm overflow-hidden">
        <div onClick={() => interact('Biometrics')} className="flex items-center justify-between p-4 border-b border-[#E5E8F5] cursor-pointer hover:bg-gray-50 transition active:bg-gray-100">
          <div className="flex items-center gap-3">
            <span className="material-symbols-rounded text-[#10B981]">fingerprint</span>
            <span className="text-sm font-bold text-[#181B25]">FaceID / Fingerprint</span>
          </div>
          <span className="material-symbols-rounded text-[18px] text-[#464555]">chevron_right</span>
        </div>
        <div onClick={() => interact('Help Center')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition active:bg-gray-100">
          <div className="flex items-center gap-3">
            <span className="material-symbols-rounded text-[#464555]">support_agent</span>
            <span className="text-sm font-bold text-[#181B25]">Help & Support</span>
          </div>
          <span className="material-symbols-rounded text-[18px] text-[#464555]">chevron_right</span>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-2">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#FFF5F5] text-[#D32F2F] font-bold border border-[#FFE0E0] active:scale-95 transition hover:bg-[#FFEBEB]"
        >
          <span className="material-symbols-rounded">logout</span>
          Sign Out of DayMeet OS
        </button>
        <p className="text-center text-[10px] text-[#9CA3AF] mt-4">DayMeet OS v1.0.4 • Build 8042</p>
      </div>
    </div>
  );
}
