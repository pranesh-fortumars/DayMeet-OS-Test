import React, { useState } from 'react';
import BudgetGauge from './charts/BudgetGauge';
import { Dialog } from '@capacitor/dialog';

export default function FinanceScreen() {
  const [unlocked, setUnlocked] = useState(false);

  const requestBiometric = async () => {
    try {
      const { value } = await Dialog.confirm({
        title: 'Biometric Authentication',
        message: 'Scan your FaceID or Fingerprint to unlock the Finance Ledger.'
      });
      if (value) setUnlocked(true);
    } catch (e) {
      console.log('Auth canceled');
    }
  };

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <div className="w-16 h-16 rounded-full bg-[#FFEBEE] text-[#E53935] flex items-center justify-center mb-4">
          <span className="material-symbols-rounded text-[32px]">lock</span>
        </div>
        <h2 className="text-xl font-black text-[#181B25] mb-2">Vault Locked</h2>
        <p className="text-sm text-[#464555] mb-6 text-center">Authentication required to view sensitive financial data.</p>
        <button onClick={requestBiometric} className="px-6 py-2.5 rounded-xl bg-[#181B25] text-white font-bold flex items-center gap-2 shadow-sm">
          <span className="material-symbols-rounded text-[18px]">fingerprint</span>
          Authenticate
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-black text-[#181B25]">Finance & Ledger</h2>
          <p className="text-xs text-[#464555]">Daily ₹5,000 ceiling, recurring bills, and accounts</p>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-[#005338] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#00422B]">
          <span className="material-symbols-rounded text-[14px]">add</span>
          <span>Log Expense</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm pt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#181B25]">Financial Health</h3>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">Optimal Pace</span>
        </div>
        <BudgetGauge />
      </div>
    </div>
  );
}
