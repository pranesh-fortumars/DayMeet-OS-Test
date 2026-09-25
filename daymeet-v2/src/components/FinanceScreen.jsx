import React, { useState } from 'react';
import BudgetGauge from './charts/BudgetGauge';
import { useAppStore } from '../store/useAppStore';
import { useInteraction } from '../hooks/useInteraction';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

export default function FinanceScreen() {
  const [unlocked, setUnlocked] = useState(false);
  const [recentTxns, setRecentTxns] = useState([
    { name: 'Starbucks', amount: '-₹450', date: 'Today, 09:15 AM', icon: 'local_cafe' },
    { name: 'Salary', amount: '+₹1,25,000', date: 'Yesterday', icon: 'account_balance' },
    { name: 'Uber', amount: '-₹320', date: 'Yesterday', icon: 'directions_car' }
  ]);
  const { interact } = useInteraction();
  const { liquidNetWorth, spending, dailyBudget, upcomingBills, addExpense } = useAppStore();

  const simulateBankSMS = () => {
    interact('Simulate SMS Received');
    const newTxn = {
      name: 'Amazon.in',
      amount: '-₹1,499',
      date: 'Just Now (via SMS)',
      icon: 'shopping_bag'
    };
    setRecentTxns(prev => [newTxn, ...prev]);
    addExpense(1499);
  };

  const requestBiometric = async () => {
    interact('Biometric Scan Initiated');
    try {
      const result = await NativeBiometric.isAvailable();
      if (result.isAvailable) {
        await NativeBiometric.verifyIdentity({
          reason: "Unlock the Finance Ledger",
          title: "Biometric Authentication",
          subtitle: "Confirm your identity to view sensitive data",
        });
        setUnlocked(true);
      } else {
        // Fallback for Web/Emulators without biometric hardware
        setUnlocked(true);
      }
    } catch (e) {
      console.log('Biometric failed or canceled', e);
      // User failed or cancelled, do not unlock
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
        <h2 className="text-xl font-black tracking-tight text-[#181B25]">Finance</h2>
        <div className="flex gap-2">
          <button onClick={simulateBankSMS} className="px-3 py-1.5 rounded-xl bg-[#F1F5FD] text-[#0288D1] border border-blue-100 text-xs font-bold flex items-center gap-1 hover:bg-[#E0F2FE]">
            <span className="material-symbols-rounded text-[16px]">sms</span>
            Simulate SMS
          </button>
          <button onClick={() => interact('Log Expense')} className="px-3 py-1.5 rounded-xl bg-[#005338] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#00422B]">
            <span className="material-symbols-rounded text-[16px]">add</span>
            Expense
          </button>
        </div>
      </div>

      {/* Finance Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-[#E5E8F5] shadow-sm">
          <p className="text-xs text-[#464555] font-medium">Liquid Net Worth</p>
          <p className="text-2xl font-black text-[#181B25] mt-1">₹{liquidNetWorth.toLocaleString()}</p>
          <p className="text-[11px] text-[#464555] mt-0.5">HDFC ••4109 & ICICI ••8912</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E5E8F5] shadow-sm">
          <p className="text-xs text-[#005338] font-semibold">Today's Total Spend</p>
          <p className="text-2xl font-black text-[#005338] mt-1">₹{spending.toLocaleString()}</p>
          <p className="text-[11px] text-[#10B981] mt-0.5">₹{(dailyBudget - spending).toLocaleString()} safe buffer remaining</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E5E8F5] shadow-sm">
          <p className="text-xs text-[#D97706] font-semibold">Upcoming Bills (48h)</p>
          <p className="text-2xl font-black text-[#181B25] mt-1">₹{upcomingBills.toLocaleString()}</p>
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
        <div className="space-y-3">
          {recentTxns.map((txn, i) => (
            <div key={i} onClick={() => interact(`Transaction ${txn.name}`)} className="flex items-center justify-between bg-[#FAF9FF] p-3 rounded-xl border border-[#E5E8F5] active:scale-95 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.amount.startsWith('+') ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#F57C00]'}`}>
                  <span className="material-symbols-rounded text-[20px]">{txn.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#181B25]">{txn.name}</p>
                  <p className="text-[10px] text-[#464555]">{txn.date}</p>
                </div>
              </div>
              <span className={`text-sm font-black ${txn.amount.startsWith('+') ? 'text-[#2E7D32]' : 'text-[#181B25]'}`}>{txn.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
