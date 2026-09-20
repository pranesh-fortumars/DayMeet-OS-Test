import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInAnonymously } from 'firebase/auth';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function AuthScreen({ onAuthSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    setLoading(true);
    try {
      // Using Anonymous auth for now. Ensure Anonymous auth is enabled in Firebase Console.
      await signInAnonymously(auth);
      onAuthSuccess();
    } catch (e) {
      console.error("Login failed:", e);
      alert("Error: Make sure 'Anonymous Auth' is enabled in your Firebase console.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9FF] p-6 selection:bg-indigo-500/30">
      <div className="bg-white p-8 rounded-[32px] border border-[#E5E8F5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center max-w-sm w-full animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded-3xl bg-[#3525CD] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-600/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <span className="material-symbols-rounded text-[40px] relative z-10">widgets</span>
        </div>
        
        <h1 className="text-3xl font-black text-[#181B25] tracking-tight">DayMeet</h1>
        <p className="text-sm font-medium text-[#464555] mt-1.5 mb-8">Unified Life Operating System</p>
        
        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-[#181B25] text-white font-bold transition hover:bg-black flex justify-center items-center gap-2 disabled:opacity-50 shadow-sm active:scale-95"
        >
          {loading ? (
            <span className="material-symbols-rounded text-[20px] animate-spin">refresh</span>
          ) : (
            <span className="material-symbols-rounded text-[20px]">login</span>
          )}
          <span>{loading ? 'Authenticating...' : 'Enter System'}</span>
        </button>

        <p className="text-[10px] text-[#777587] mt-5">
          End-to-End Encrypted via Firebase Auth
        </p>
      </div>
    </div>
  );
}
