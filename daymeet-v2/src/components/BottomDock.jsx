import React from 'react';
import { NavLink } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import { useAppStore } from '../store/useAppStore';

export default function BottomDock() {
  const handleNav = () => Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  const { setModalOpen } = useAppStore();
  const startCapture = () => document.getElementById('cameraInput')?.click();

  const navClass = ({ isActive }) => 
    `flex flex-col items-center justify-center flex-1 py-1 transition ${
      isActive ? 'text-[#3525CD]' : 'text-[#464555] hover:text-[#181B25]'
    }`;

  return (
    <nav className="fixed bottom-0 w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-xl border-t border-[#E5E8F5] pb-safe pt-2 px-2 z-40">
      <div className="flex justify-between items-end relative pb-2">
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
        <NavLink to="/more" onClick={handleNav} className={navClass}>
          <span className="material-symbols-rounded text-[24px]">grid_view</span>
          <span className="text-[10px] font-bold mt-0.5">More</span>
        </NavLink>
      </div>
    </nav>
  );
}
