import React, { useState } from 'react';
import BudgetGauge from './charts/BudgetGauge';
import { useAppStore } from '../store/useAppStore';
import { useInteraction } from '../hooks/useInteraction';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { startSmsListener } from '../services/SmsService';

export default function FinanceScreen() {
  const [unlocked, setUnlocked] = useState(false);
  const [recentTxns, setRecentTxns] = useState([
    { name: 'Starbucks', amount: '-₹450', date: 'Today, 09:15 AM', icon: 'local_cafe' },
    { name: 'Salary', amount: '+₹1,25,000', date: 'Yesterday', icon: 'account_balance' },
    { name: 'Uber', amount: '-₹320', date: 'Yesterday', icon: 'directions_car' }
  ]);
  const [mockSubscriptions, setMockSubscriptions] = useState([
    { id: 1, name: 'Netflix Premium', amount: '₹649/mo', status: 'Active', icon: 'movie', color: 'bg-[#FFEBEE] text-[#E53935]', lastUsed: '2 days ago' },
    { id: 2, name: 'Adobe Creative Cloud', amount: '₹4,230/mo', status: 'Zombie', icon: 'design_services', color: 'bg-[#E0F2FE] text-[#0288D1]', lastUsed: '45 days ago' }
  ]);
  const { interact } = useInteraction();
  const { liquidNetWorth, spending, dailyBudget, upcomingBills, addExpense } = useAppStore();

  const simulateBankSMS = () => {
    interact('Simulate SMS Received (Manual)');
    const newTxn = {
      name: 'Amazon.in',
      amount: '-₹1,499',
      date: 'Just Now (via Mock Button)',
      icon: 'shopping_bag'
    };
    setRecentTxns(prev => [newTxn, ...prev]);
    addExpense(1499);
  };

  const handleIncomingSms = (body, sender) => {
    // Regex Engine to extract currency
    const amountMatch = body.match(/(?:(?:RS|INR|MRP|Rs)\.?\s?)(\d+(:?\,\d+)?(\.\d{1,2})?)/i);
    const merchantMatch = body.match(/at\s([a-zA-Z0-9\.]+)/i);

    if (amountMatch) {
      const amountStr = amountMatch[1].replace(',', '');
      const amount = parseFloat(amountStr);
      const merchant = merchantMatch ? merchantMatch[1] : sender;
      
      const newTxn = {
        name: merchant,
        amount: `-₹${amount.toLocaleString()}`,
        date: 'Just Now (Auto-Sync)',
        icon: 'account_balance_wallet'
      };
      setRecentTxns(prev => [newTxn, ...prev]);
      addExpense(amount);
    }
  };

  const startAutoSync = () => {
    interact('Enabled SMS Background Sync');
    startSmsListener(handleIncomingSms);
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
            Mock SMS
          </button>
          <button onClick={startAutoSync} className="px-3 py-1.5 rounded-xl bg-[#E8F5E9] text-[#2E7D32] border border-green-100 text-xs font-bold flex items-center gap-1 hover:bg-[#C8E6C9] active:scale-95 transition">
            <span className="material-symbols-rounded text-[16px]">sync</span>
            Auto-Sync
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
          <p className="text-xs text-[#005338] font-semibold flex items-center gap-1"><span className="material-symbols-rounded text-[14px]">verified_user</span> Safe-Spend Allowance</p>
          <p className="text-2xl font-black text-[#005338] mt-1">₹{(dailyBudget - spending).toLocaleString()}</p>
          <p className="text-[11px] text-[#10B981] mt-0.5">₹{spending.toLocaleString()} burned today</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E5E8F5] shadow-sm">
          <p className="text-xs text-[#D97706] font-semibold">Upcoming Bills (48h)</p>
          <p className="text-2xl font-black text-[#181B25] mt-1">₹{upcomingBills.toLocaleString()}</p>
          <p className="text-[11px] text-[#D32F2F] mt-0.5 animate-pulse">Tata Power Electricity</p>
        </div>
      </div>

      {/* Subscription Radar & Zombie Hunter */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E8F5] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#181B25] flex items-center gap-1.5">
            <span className="material-symbols-rounded text-[#3525CD] text-[18px]">radar</span>
            Subscription Radar
          </h3>
          <span className="text-[10px] font-bold text-[#D32F2F] bg-[#FFF5F5] px-2 py-1 rounded-lg flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full animate-ping"></span> 1 Zombie Found
          </span>
        </div>

        <div className="space-y-3">
          {mockSubscriptions.map(sub => (
            <div key={sub.id} className={`p-3 rounded-xl border flex flex-col gap-3 ${sub.status === 'Zombie' ? 'bg-[#FFF5F5] border-[#FFE0E0]' : 'bg-[#FAF9FF] border-[#E5E8F5]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sub.color}`}>
                    <span className="material-symbols-rounded text-[16px]">{sub.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181B25]">{sub.name}</p>
                    <p className="text-[10px] text-[#464555]">Last Used: {sub.lastUsed}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#181B25]">{sub.amount}</span>
              </div>
              
              {sub.status === 'Zombie' && (
                <div className="pt-2 border-t border-[#FFE0E0] flex flex-col gap-2">
                  <p className="text-[10px] text-[#D32F2F] font-bold leading-snug">
                    <span className="material-symbols-rounded text-[12px] inline align-middle mr-1">warning</span>
                    Zombie Flag: Zero app usage detected in 45 days. High burn rate risk.
                  </p>
                  <button 
                    onClick={() => { interact('Cancelled Zombie Subscription'); setMockSubscriptions(prev => prev.filter(s => s.id !== sub.id)) }}
                    className="w-full py-1.5 bg-[#E53935] hover:bg-[#D32F2F] text-white text-[10px] font-bold rounded-lg active:scale-95 transition shadow-sm"
                  >
                    1-Tap Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          ))}
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
