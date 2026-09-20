import React from 'react';
import { NavLink } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function BottomDock() {
  const handleNav = () => Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});

  const navClass = ({ isActive }) => 
    `flex flex-col items-center justify-center w-[60px] h-[60px] rounded-2xl transition ${isActive ? 'text-[#3525CD] bg-[#E2DFFF]' : 'text-[#464555] hover:bg-[#EBEDFB]'}`;

  return (
    <nav className="fixed bottom-0 w-full bg-[#FAF9FF]/95 backdrop-blur-md border-t border-[#E5E8F5] pb-safe z-50">
      <div className="max-w-3xl mx-auto px-4 h-[80px] flex items-center justify-between">
        <NavLink to="/" onClick={handleNav} className={navClass}>
          <span className="material-symbols-rounded text-[24px]">home</span>
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </NavLink>
        <NavLink to="/calendar" onClick={handleNav} className={navClass}>
          <span className="material-symbols-rounded text-[24px]">calendar_month</span>
          <span className="text-[10px] font-bold mt-0.5">Plan</span>
        </NavLink>
        <NavLink to="/tasks" onClick={handleNav} className={navClass}>
          <span className="material-symbols-rounded text-[24px]">task_alt</span>
          <span className="text-[10px] font-bold mt-0.5">Tasks</span>
        </NavLink>
        <NavLink to="/insights" onClick={handleNav} className={navClass}>
          <span className="material-symbols-rounded text-[24px]">insights</span>
          <span className="text-[10px] font-bold mt-0.5">Vitals</span>
        </NavLink>
      </div>
    </nav>
  );
}
