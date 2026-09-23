import React from 'react';
import { NavLink } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useAppStore } from '../store/useAppStore';

export default function BottomDock() {
  const handleNav = () => Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  const { setModalOpen } = useAppStore();
  
  const startCapture = async () => {
    try {
      await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      console.log('Scanned QR / Document from BottomDock');
    } catch (e) {
      console.log('Camera error/cancelled');
    }
  };

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
        <div className="flex-1 flex justify-center mt-[-20px] gap-2 z-50">
          <button 
            onClick={() => setModalOpen('quickAdd', true)}
            className="w-12 h-12 rounded-full bg-[#181B25] shadow-[0_8px_16px_rgba(24,27,37,0.3)] flex items-center justify-center text-white relative hover:scale-105 transition"
          >
            <span className="material-symbols-rounded text-[24px]">add</span>
          </button>
          <button 
            onClick={startCapture}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#673AB7] shadow-[0_8px_16px_rgba(53,37,205,0.3)] flex items-center justify-center text-white relative hover:scale-105 transition"
          >
            <span className="material-symbols-rounded text-[24px]">center_focus_strong</span>
          </button>
        </div>        <NavLink to="/insights" onClick={handleNav} className={navClass}>
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
