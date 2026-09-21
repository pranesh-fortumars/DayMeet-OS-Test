import React, { useState } from 'react';
import BudgetGauge from './charts/BudgetGauge';
import { Dialog } from '@capacitor/dialog';
import { useAppStore } from '../store/useAppStore';

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

      {/* Finance Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-[#E5E8F5] shadow-sm">
          <p className="text-xs text-[#464555] font-medium">Liquid Net Worth</p>
          <p className="text-2xl font-black text-[#181B25] mt-1">₹1,42,850</p>
          <p className="text-[11px] text-[#464555] mt-0.5">HDFC ••4109 & ICICI ••8912</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E5E8F5] shadow-sm">
          <p className="text-xs text-[#005338] font-semibold">Today's Total Spend</p>
          <p className="text-2xl font-black text-[#005338] mt-1">₹3,450</p>
          <p className="text-[11px] text-[#10B981] mt-0.5">₹1,550 safe buffer remaining</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E5E8F5] shadow-sm">
          <p className="text-xs text-[#D97706] font-semibold">Upcoming Bills (48h)</p>
          <p className="text-2xl font-black text-[#181B25] mt-1">₹2,400</p>
          <p className="text-[11px] text-[#D32F2F] mt-0.5">Tata Power Electricity</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm pt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#181B25]">Financial Health</h3>
            <button 
              onClick={() => useAppStore.getState().setModalOpen('budgetTarget', true)}
              className="w-6 h-6 rounded-md bg-[#F1F3FF] text-[#3525CD] flex items-center justify-center hover:bg-[#E5E8F5] transition"
              title="Edit Budget Target"
            >
              <span className="material-symbols-rounded text-[14px]">edit</span>
            </button>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">Optimal Pace</span>
        </div>
        <BudgetGauge />
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-[#181B25]">Recent Ledger Activity</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFEBEE] text-[#E53935] flex items-center justify-center">
                <span className="material-symbols-rounded text-[18px]">coffee</span>
              </div>
              <div>
                <p className="font-bold text-[#181B25]">Blue Tokai Coffee Roasters</p>
                <p className="text-[10px] text-[#464555]">Dining • Today, 08:30 AM</p>
              </div>
            </div>
            <p className="font-bold text-[#E53935]">-₹280</p>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFEBEE] text-[#E53935] flex items-center justify-center">
                <span className="material-symbols-rounded text-[18px]">local_taxi</span>
              </div>
              <div>
                <p className="font-bold text-[#181B25]">Uber Premier Transit</p>
                <p className="text-[10px] text-[#464555]">Transportation • Today, 07:45 AM</p>
              </div>
            </div>
            <p className="font-bold text-[#E53935]">-₹450</p>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9FF] border border-[#E5E8F5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                <span className="material-symbols-rounded text-[18px]">payments</span>
              </div>
              <div>
                <p className="font-bold text-[#181B25]">Consulting Client Payment</p>
                <p className="text-[10px] text-[#464555]">Direct Deposit • Yesterday</p>
              </div>
            </div>
            <p className="font-bold text-[#10B981]">+₹45,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
