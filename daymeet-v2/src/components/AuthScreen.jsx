import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInAnonymously } from 'firebase/auth';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function AuthScreen({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthAction = async () => {
    Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    setLoading(true);
    try {
      await signInAnonymously(auth);
      onAuthSuccess();
    } catch (e) {
      console.error("Auth failed:", e);
      alert("Error: Make sure 'Anonymous Auth' is enabled in your Firebase console.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] selection:bg-indigo-500/30 font-sans pb-10">
      {/* Top Bar */}
      <div className="px-5 py-4 flex items-center justify-between sticky top-0 z-10 bg-[#F8F9FE]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center text-[#464555] active:scale-95 transition">
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="DayMeet" className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-[#181B25] text-lg tracking-tight">DayMeet</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#464555]">Auth {isLogin ? 'Login' : 'Signup'}</span>
          <div className="w-8 h-8 rounded-full bg-[#3525CD] text-white flex items-center justify-center">
            <span className="material-symbols-rounded text-[18px]">person</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Toggle / Tabs (Only in Login mode to switch, or let's use the explicit UI) */}
        
        {isLogin ? (
          // --- LOGIN VIEW ---
          <>
            {/* Header Art & Titles */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5E8F5] text-[10px] font-bold text-[#464555]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                Version 2.4 • Unified Life OS
              </div>

              {/* Login Icon Illustration */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center border border-white p-4">
                   <img src="/favicon.png" alt="Logo" className="w-full h-full object-contain rounded-xl shadow-sm" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#3525CD] text-white border-2 border-[#F8F9FE] flex items-center justify-center">
                  <span className="material-symbols-rounded text-[16px]">bolt</span>
                </div>
              </div>

              <h1 className="text-3xl font-black text-[#181B25] mb-2">Welcome Back</h1>
              <p className="text-sm text-[#464555] px-4 leading-relaxed">
                Your day, scheduled tasks, and focus — synchronized in one place.
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex p-1 bg-[#F1F3FF] rounded-xl mb-6">
              <button className="flex-1 py-2.5 bg-white text-[#3525CD] font-bold text-sm rounded-lg shadow-sm" onClick={() => setIsLogin(true)}>
                Sign In
              </button>
              <button className="flex-1 py-2.5 text-[#464555] font-semibold text-sm rounded-lg hover:bg-white/50 transition" onClick={() => setIsLogin(false)}>
                Create Account
              </button>
            </div>

            {/* Social Logins */}
            <div className="space-y-3 mb-6">
              <button className="w-full h-12 bg-white rounded-xl font-bold text-sm text-[#181B25] flex items-center justify-center gap-2 shadow-sm border border-[#E5E8F5] hover:bg-gray-50 transition active:scale-95">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Continue with Google
              </button>
              <button className="w-full h-12 bg-white rounded-xl font-bold text-sm text-[#181B25] flex items-center justify-center gap-2 shadow-sm border border-[#E5E8F5] hover:bg-gray-50 transition active:scale-95">
                <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-5 h-5" alt="Apple" />
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#E5E8F5]"></div>
              <span className="text-[10px] font-bold tracking-wider text-[#777587] uppercase">Or continue with work email</span>
              <div className="flex-1 h-px bg-[#E5E8F5]"></div>
            </div>

            {/* Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#464555] mb-1.5">Work Email</label>
                <div className="relative">
                  <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[20px]">mail</span>
                  <input type="email" placeholder="alex@company.com" className="w-full h-12 pl-10 pr-4 bg-white rounded-xl border-none outline-none ring-1 ring-[#E5E8F5] focus:ring-2 focus:ring-[#3525CD] transition shadow-sm text-sm text-[#181B25]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#464555] mb-1.5">Password</label>
                <div className="relative">
                  <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[20px]">lock</span>
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full h-12 pl-10 pr-10 bg-white rounded-xl border-none outline-none ring-1 ring-[#E5E8F5] focus:ring-2 focus:ring-[#3525CD] transition shadow-sm text-sm text-[#181B25]" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777587]">
                    <span className="material-symbols-rounded text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${rememberDevice ? 'bg-[#3525CD]' : 'border-2 border-[#E5E8F5] bg-white'}`} onClick={() => setRememberDevice(!rememberDevice)}>
                  {rememberDevice && <span className="material-symbols-rounded text-white text-[16px]">check</span>}
                </div>
                <span className="text-xs font-medium text-[#464555]">Remember device</span>
              </label>
              <button className="text-xs font-bold text-[#3525CD] hover:underline">Forgot password?</button>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <button onClick={handleAuthAction} disabled={loading} className="w-full h-14 bg-[#3525CD] hover:bg-[#2A1CA3] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95 disabled:opacity-70">
                {loading ? 'Authenticating...' : 'Enter DayMeet'}
                {!loading && <span className="material-symbols-rounded text-[20px]">arrow_forward</span>}
              </button>
              
              <button onClick={handleAuthAction} className="w-full h-12 bg-[#F1F3FF] hover:bg-[#E2E6FF] text-[#3525CD] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition active:scale-95">
                <span className="material-symbols-rounded text-[20px]">fingerprint</span>
                Quick sign-in with Face ID
              </button>
            </div>

          </>
        ) : (
          // --- SIGNUP VIEW ---
          <>
             {/* Header Art & Titles */}
             <div className="flex flex-col items-center text-center mb-6">
              {/* Signup Icon Illustration */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#6366F1] to-[#3B82F6] shadow-[0_8px_30px_rgb(59,130,246,0.3)] flex items-center justify-center text-white">
                   <span className="material-symbols-rounded text-[40px]">calendar_month</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#10B981] text-white border-2 border-[#F8F9FE] flex items-center justify-center">
                  <span className="material-symbols-rounded text-[16px]">check</span>
                </div>
              </div>

              <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F3FF] text-[10px] font-bold text-[#3525CD]">
                <span className="material-symbols-rounded text-[14px] text-[#10B981]">eco</span>
                Free 14-day Pro Trial Included
              </div>

              <h1 className="text-2xl font-black text-[#181B25] mb-2 leading-tight">Create your DayMeet Space</h1>
              <p className="text-sm text-[#464555] px-2 leading-relaxed">
                Unify your calendar, tasks, finances, and wellness in 60 seconds.
              </p>
            </div>

            {/* Persona Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[10px] font-bold tracking-wider text-[#777587] uppercase">How will you use DayMeet?</p>
                <span className="text-[10px] font-bold text-[#3525CD]">Select primary</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-[#3525CD] text-white text-xs font-bold flex items-center gap-2 shadow-sm">
                  💼 Work & Executive
                </button>
                <button className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-[#E5E8F5] text-[#464555] text-xs font-bold flex items-center gap-2 hover:bg-[#DCDFEA] transition">
                  🚀 Freelance & Solopreneur
                </button>
              </div>
            </div>

            {/* Social Logins */}
            <div className="space-y-3 mb-6">
              <button className="w-full h-12 bg-white rounded-xl font-bold text-sm text-[#181B25] flex items-center justify-center gap-2 shadow-sm border border-[#E5E8F5] hover:bg-gray-50 transition active:scale-95">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Sign up with Google
              </button>
              <button className="w-full h-12 bg-[#181B25] rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-sm hover:bg-black transition active:scale-95">
                <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-5 h-5 invert" alt="Apple" />
                Sign up with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#E5E8F5]"></div>
              <span className="text-[10px] font-bold tracking-wider text-[#777587] uppercase">or register with email</span>
              <div className="flex-1 h-px bg-[#E5E8F5]"></div>
            </div>

            {/* Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#464555] mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[20px]">person</span>
                  <input type="text" placeholder="Alex Chen" className="w-full h-12 pl-10 pr-4 bg-[#F1F3FF]/50 rounded-xl border-none outline-none ring-1 ring-transparent focus:ring-[#3525CD] transition text-sm text-[#181B25]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#464555] mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[20px]">mail</span>
                  <input type="email" placeholder="alex.chen@workspace.io" className="w-full h-12 pl-10 pr-4 bg-[#F1F3FF]/50 rounded-xl border-none outline-none ring-1 ring-transparent focus:ring-[#3525CD] transition text-sm text-[#181B25]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <label className="block text-xs font-semibold text-[#464555]">Password</label>
                  <span className="text-[10px] font-bold text-[#10B981] flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span> Strong</span>
                </div>
                <div className="relative mb-2">
                  <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777587] text-[20px]">lock</span>
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••••••" className="w-full h-12 pl-10 pr-10 bg-[#F1F3FF]/50 rounded-xl border-none outline-none ring-1 ring-transparent focus:ring-[#3525CD] transition text-sm text-[#181B25]" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777587]">
                    <span className="material-symbols-rounded text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <div className="flex gap-1.5 mb-1.5">
                  <div className="h-1.5 flex-1 rounded-full bg-[#10B981]"></div>
                  <div className="h-1.5 flex-1 rounded-full bg-[#10B981]"></div>
                  <div className="h-1.5 flex-1 rounded-full bg-[#10B981]"></div>
                </div>
                <p className="text-[9px] text-[#10B981] font-bold flex items-start gap-1">
                  <span className="material-symbols-rounded text-[12px]">check_circle</span>
                  Strong: 8+ chars, numbers & special character included
                </p>
              </div>
            </div>

            {/* Integrations Preview */}
            <div className="bg-[#F1F3FF]/50 rounded-xl p-3 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-medium text-[#464555]">Syncs ready at launch</span>
                <span className="text-[10px] font-bold text-[#3525CD] flex items-center gap-1">5 connected <span className="material-symbols-rounded text-[14px]">tune</span></span>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-[#181B25] flex items-center gap-1.5 shadow-sm border border-[#E5E8F5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></span> Google Cal
                </div>
                <div className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-[#181B25] flex items-center gap-1.5 shadow-sm border border-[#E5E8F5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#611F69]"></span> Slack
                </div>
                <div className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-[#181B25] flex items-center gap-1.5 shadow-sm border border-[#E5E8F5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D8CFF]"></span> Zoom
                </div>
                <div className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-[#181B25] flex items-center gap-1.5 shadow-sm border border-[#E5E8F5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span> Notion
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-6">
              <button onClick={handleAuthAction} disabled={loading} className="w-full h-14 bg-[#5642F4] hover:bg-[#4733DE] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95 disabled:opacity-70">
                {loading ? 'Creating Space...' : 'Get Started Free'}
                {!loading && <span className="material-symbols-rounded text-[20px]">arrow_forward</span>}
              </button>
              
              <p className="text-center text-[10px] font-medium text-[#464555] flex items-center justify-center gap-1">
                <span className="material-symbols-rounded text-[#10B981] text-[12px]">verified</span>
                No credit card required • Cancel anytime
              </p>
            </div>

            <p className="text-center text-[10px] text-[#777587] leading-relaxed mb-6">
              By continuing, you agree to DayMeet's <a href="#" className="text-[#3525CD] underline">Terms of Service</a><br />
              and <a href="#" className="text-[#3525CD] underline">Privacy Policy</a>.
            </p>

            <p className="text-center text-xs text-[#464555]">
              Already have an account? <button onClick={() => setIsLogin(true)} className="font-bold text-[#3525CD] hover:underline">Sign In</button>
            </p>

          </>
        )}

        {/* Global Footer (Login View only to match design) */}
        {isLogin && (
          <div className="mt-8 mb-4 flex items-center justify-center gap-1 text-[10px] font-bold text-[#464555]">
            <span className="material-symbols-rounded text-[14px]">verified_user</span>
            End-to-end encrypted • Zero data tracking • SOC2 Type II
          </div>
        )}

      </div>
    </div>
  );
}
