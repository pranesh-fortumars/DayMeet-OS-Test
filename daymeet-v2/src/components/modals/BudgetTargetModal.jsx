import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function BudgetTargetModal() {
  const { modals, setModalOpen, dailyBudget, updateDailyBudget } = useAppStore();
  const isOpen = modals.budgetTarget;
  const [val, setVal] = useState(dailyBudget.toString());

  if (!isOpen) return null;

  const handleClose = () => setModalOpen('budgetTarget', false);

  const handleSave = () => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      updateDailyBudget(num);
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 p-5 space-y-4">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
            <span className="material-symbols-rounded text-[18px]">track_changes</span>
          </div>
          <h3 className="font-bold text-[#181B25]">Set Daily Limit</h3>
        </div>

        <div>
          <label className="text-[10px] font-bold text-[#464555] uppercase tracking-wider mb-1 block">
            Target Ceiling (₹)
          </label>
          <input 
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full text-2xl font-black text-[#181B25] border-b-2 border-[#E5E8F5] focus:border-[#005338] bg-transparent outline-none py-1"
            autoFocus
          />
          <p className="text-[10px] text-[#464555] mt-2 leading-tight">
            This will automatically recalculate your Financial Health gauge.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={handleClose} className="px-4 py-2 text-xs font-bold text-[#464555] hover:bg-gray-100 rounded-xl transition">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2 text-xs font-bold bg-[#005338] text-white rounded-xl shadow-sm hover:bg-[#00422B] transition">
            Save Target
          </button>
        </div>
      </div>
    </div>
  );
}
