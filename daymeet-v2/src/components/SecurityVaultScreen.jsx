import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useInteraction } from '../hooks/useInteraction';

export default function SecurityVaultScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();
  const [keyGenerated, setKeyGenerated] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const simulateBackup = () => {
    Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => {});
      interact('AES-256-GCM Backup Successful');
    }, 2000);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white border border-[#E5E8F5] flex items-center justify-center text-[#464555] hover:bg-gray-50 transition">
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181B25]">Security Vault</h1>
          <p className="text-xs text-[#464555]">End-to-End Encryption Settings</p>
        </div>
      </div>

      <div className="bg-[#181B25] p-5 rounded-3xl shadow-xl mt-4 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#10B981]/20 rounded-full blur-xl"></div>
        <div className="relative z-10 flex flex-col items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <span className="material-symbols-rounded text-[#10B981] text-[24px]">gpp_good</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">E2EE is Active</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed mt-1">
              All your local OS data, including biometrics, finance, and knowledge docs, are encrypted with AES-256-GCM before syncing to the cloud.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#181B25]">Encryption Keys</h2>
        </div>
        
        <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F3FF]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-rounded text-[#3525CD]">key</span>
              <div>
                <p className="text-xs font-bold text-[#181B25]">Master Recovery Key</p>
                <p className="text-[10px] text-[#464555]">Generated on Oct 10, 2026</p>
              </div>
            </div>
            <button onClick={() => interact('View Key Prompt')} className="px-3 py-1.5 bg-[#F1F3FF] text-[#3525CD] text-[10px] font-bold rounded-lg hover:bg-[#E5E8F5] transition">
              Reveal
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-rounded text-[#E53935]">change_circle</span>
              <div>
                <p className="text-xs font-bold text-[#181B25]">Rotate Encryption Keys</p>
                <p className="text-[10px] text-[#464555]">Invalidates old backups</p>
              </div>
            </div>
            <button onClick={() => interact('Rotate Keys Triggered')} className="px-3 py-1.5 bg-[#FFEBEE] text-[#E53935] text-[10px] font-bold rounded-lg hover:bg-[#FFCDD2] transition">
              Rotate
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <h2 className="text-sm font-bold text-[#181B25]">Local Backup Engine</h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm">
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${isSyncing ? 'bg-[#E2DFFF] text-[#3525CD]' : 'bg-[#E8F5E9] text-[#2E7D32]'}`}>
              <span className={`material-symbols-rounded text-[32px] ${isSyncing ? 'animate-spin' : ''}`}>
                {isSyncing ? 'sync' : 'cloud_done'}
              </span>
            </div>
            <p className="text-sm font-bold text-[#181B25]">{isSyncing ? 'Encrypting & Syncing...' : 'Last backup: 2 hours ago'}</p>
            <p className="text-xs text-[#464555] mt-1 mb-4">Size: 45.2 MB (Encrypted payload)</p>
            
            <button 
              onClick={simulateBackup} 
              disabled={isSyncing}
              className={`w-full py-3 rounded-xl text-white text-sm font-bold transition shadow-sm ${isSyncing ? 'bg-[#A5B4FC]' : 'bg-[#3525CD] hover:bg-[#2B1DAE]'}`}
            >
              {isSyncing ? 'Processing...' : 'Force Encrypted Sync Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
