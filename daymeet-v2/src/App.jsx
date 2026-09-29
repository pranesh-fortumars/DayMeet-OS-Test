import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import BottomDock from './components/BottomDock';
import GlobalSmartCapture from './components/GlobalSmartCapture';
import AuthScreen from './components/AuthScreen';
import PullToRefresh from './components/PullToRefresh';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import PinFallbackModal from './components/modals/PinFallbackModal';
import AmbientBackground from './components/AmbientBackground';

// Handle ChunkLoadErrors gracefully
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );
    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        // Return a promise that never resolves to prevent React from trying to render
        return new Promise(() => {});
      }
      throw error;
    }
  });

// Lazy loaded screens
const HomeScreen = lazyWithRetry(() => import('./components/HomeScreen'));
const CalendarScreen = lazyWithRetry(() => import('./components/CalendarScreen'));
const TasksScreen = lazyWithRetry(() => import('./components/TasksScreen'));
const InsightsScreen = lazyWithRetry(() => import('./components/InsightsScreen'));
const FinanceScreen = lazyWithRetry(() => import('./components/FinanceScreen'));
const MoreScreen = lazyWithRetry(() => import('./components/MoreScreen'));
const CleanupScreen = lazyWithRetry(() => import('./components/CleanupScreen'));
const WeeklyResetScreen = lazyWithRetry(() => import('./components/WeeklyResetScreen'));
const GrowthHubScreen = lazyWithRetry(() => import('./components/GrowthHubScreen'));
const KnowledgeVaultScreen = lazyWithRetry(() => import('./components/KnowledgeVaultScreen'));
const SecurityVaultScreen = lazyWithRetry(() => import('./components/SecurityVaultScreen'));
const DelegationHubScreen = lazyWithRetry(() => import('./components/DelegationHubScreen'));
const RelationshipsScreen = lazyWithRetry(() => import('./components/RelationshipsScreen'));
const ProfileScreen = lazyWithRetry(() => import('./components/ProfileScreen'));
const FamilySyncScreen = lazyWithRetry(() => import('./components/FamilySyncScreen'));

import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { initDB } from './services/DatabaseService';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppStore } from './store/useAppStore';
import { Geolocation } from '@capacitor/geolocation';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { LocalNotifications } from '@capacitor/local-notifications';

// Modals
import BriefingModal from './components/modals/BriefingModal';
import QuickAddModal from './components/modals/QuickAddModal';
import QuickMeetingModal from './components/modals/QuickMeetingModal';
import SearchModal from './components/modals/SearchModal';
import BudgetTargetModal from './components/modals/BudgetTargetModal';
import CopilotModal from './components/modals/CopilotModal';
import FocusSanctuaryModal from './components/modals/FocusSanctuaryModal';
import WindDownModal from './components/modals/WindDownModal';
import NightlyCleanupModal from './components/modals/NightlyCleanupModal';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -15, scale: 0.98, filter: 'blur(4px)' }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.8 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appLocked, setAppLocked] = useState(false);
  const timeOfDay = useTimeOfDay();
  const location = useLocation();
  const { initSync, activeProfile, setActiveProfile, setCurrentLocation, globalLockEnabled, detoxMode } = useAppStore();

  useEffect(() => {
    const initApp = async () => {
      try {
        await initDB();
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#FAF9FF' });
        await SplashScreen.hide();
        
        // Request Local Notification Permissions
        const permStatus = await LocalNotifications.requestPermissions();
        if (permStatus.display === 'granted') {
          console.log('Notification permissions granted');
        }
      } catch (e) {
        // Will throw on web, safe to ignore
      }
    };
    initApp();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        initSync();
      }
    });

    let geoWatchId = null;
    const initGeofencing = async () => {
      try {
        await Geolocation.requestPermissions();
        geoWatchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (position, err) => {
          if (!position) return;
          // Mock Geofencing: Switch context if longitude > some arbitrary threshold
          // In a real app, you'd calculate distance to known HQ/Home coords
          const isAtOffice = position.coords.longitude % 2 > 1; // Arbitrary toggle based on movement
          if (isAtOffice && activeProfile !== 'Work') {
            setCurrentLocation('Office HQ');
            setActiveProfile('Work');
          } else if (!isAtOffice && activeProfile !== 'Personal') {
            setCurrentLocation('Home Base');
            setActiveProfile('Personal');
          }
        });
      } catch (e) {
        console.log("Geofencing mocked/disabled without permissions");
      }
    };
    initGeofencing();

    return () => {
      unsubscribe();
      if (geoWatchId) Geolocation.clearWatch({ id: geoWatchId });
    };
  }, [initSync, activeProfile, setActiveProfile, setCurrentLocation]);

  useEffect(() => {
    let listener = null;
    if (globalLockEnabled) {
      listener = CapacitorApp.addListener('appStateChange', ({ isActive }) => {
        if (!isActive) {
          setAppLocked(true);
        }
      });
    }
    return () => {
      if (listener) listener.then(l => l.remove()).catch(() => {});
    };
  }, [globalLockEnabled]);

  const [showPinModal, setShowPinModal] = useState(false);

  const handleUnlock = async () => {
    // Fail-safe: If the native biometric plugin hangs on initialization, prompt for PIN after 2.5s
    const fallbackTimer = setTimeout(() => {
      setShowPinModal(true);
    }, 2500);

    try {
      const result = await NativeBiometric.isAvailable();
      clearTimeout(fallbackTimer); // Clear immediately once we know the plugin is responsive
      
      if (result.isAvailable) {
        await NativeBiometric.verifyIdentity({
          reason: "Unlock DayMeet OS",
          title: "Biometric Authentication",
          subtitle: "Confirm your identity to resume session",
        });
        setAppLocked(false);
      } else {
        setShowPinModal(true);
      }
    } catch (e) {
      console.error("Biometric failed:", e);
      clearTimeout(fallbackTimer);
      setShowPinModal(true); 
    }
  };

  const handleGlobalRefresh = async () => {
    // Simulate a network sync delay
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#FAF9FF] flex flex-col items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          {/* Pulsing gradient aura behind the logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-tr from-[#3525CD] to-[#6FFBBE] rounded-full blur-[48px] opacity-30 animate-pulse"></div>
          
          {/* Bouncing High-Res Logo */}
          <img 
            src="/favicon.png" 
            alt="DayMeet OS" 
            className="w-28 h-28 rounded-3xl shadow-[0_8px_30px_rgb(53,37,205,0.2)] relative z-10 animate-bounce" 
            style={{ animationDuration: '2s' }}
          />
          
          {/* App Title */}
          <h1 className="mt-8 text-2xl font-black text-[#181B25] tracking-tight relative z-10">DayMeet OS</h1>
          <p className="text-xs text-[#464555] font-medium mt-1 mb-6 relative z-10 tracking-widest uppercase">Initializing</p>
          
          {/* Sequential Dot Animation */}
          <div className="flex items-center gap-1.5 relative z-10">
            <div className="w-2 h-2 rounded-full bg-[#3525CD] animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#3525CD] animate-ping" style={{ animationDuration: '1.5s', animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#3525CD] animate-ping" style={{ animationDuration: '1.5s', animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

  const getThemeFilter = () => {
    switch(activeProfile) {
      case 'Personal': return 'hue-rotate-[15deg]';
      case 'Creative': return 'hue-rotate-[-45deg] saturate-150'; // Warmer/Amber
      case 'Family': return 'hue-rotate-[90deg]'; // Greener
      default: return 'hue-rotate-0';
    }
  };

  return (
    <div className={`h-[100dvh] flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200 time-gradient-transition bg-mesh-${timeOfDay} overflow-hidden transition-all duration-[3000ms] ease-in-out ${getThemeFilter()} ${detoxMode ? 'grayscale' : ''}`}>
      <AmbientBackground />
      <Header />
      <main className="max-w-3xl mx-auto flex-1 w-full relative flex flex-col min-h-0">
        <PullToRefresh onRefresh={handleGlobalRefresh}>
          <div className="px-4 sm:px-6 pt-3 pb-[100px]">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center pt-20 animate-pulse space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E5E8F5]"></div>
                <div className="w-32 h-4 rounded-md bg-[#E5E8F5]"></div>
                <div className="w-48 h-3 rounded-md bg-[#F1F3FF]"></div>
              </div>
            }>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><HomeScreen /></PageTransition>} />
                  <Route path="/calendar" element={<PageTransition><CalendarScreen /></PageTransition>} />
                  <Route path="/tasks" element={<PageTransition><TasksScreen /></PageTransition>} />
                  <Route path="/insights" element={<PageTransition><InsightsScreen /></PageTransition>} />
                  <Route path="/finance" element={<PageTransition><FinanceScreen /></PageTransition>} />
                  <Route path="/more" element={<PageTransition><MoreScreen /></PageTransition>} />
                  <Route path="/cleanup" element={<PageTransition><CleanupScreen /></PageTransition>} />
                  <Route path="/weekly-reset" element={<PageTransition><WeeklyResetScreen /></PageTransition>} />
                  <Route path="/growth-hub" element={<PageTransition><GrowthHubScreen /></PageTransition>} />
                  <Route path="/knowledge" element={<PageTransition><KnowledgeVaultScreen /></PageTransition>} />
                  <Route path="/security-vault" element={<PageTransition><SecurityVaultScreen /></PageTransition>} />
                  <Route path="/delegation" element={<PageTransition><DelegationHubScreen /></PageTransition>} />
                  <Route path="/relationships" element={<PageTransition><RelationshipsScreen /></PageTransition>} />
                  <Route path="/profile" element={<PageTransition><ProfileScreen /></PageTransition>} />
                  <Route path="/household" element={<PageTransition><FamilySyncScreen /></PageTransition>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </div>
        </PullToRefresh>
      </main>
      <BottomDock />
      <GlobalSmartCapture />

      {/* Global Modals */}
      <BriefingModal />
      <QuickAddModal />
      <QuickMeetingModal />
      <SearchModal />
      <BudgetTargetModal />
      <CopilotModal />
      <FocusSanctuaryModal />
      <WindDownModal />
      <NightlyCleanupModal />

      {/* Global Biometric Lock Overlay */}
      <AnimatePresence>
        {appLocked && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)', scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] bg-[#FAF9FF]/80 dark:bg-[#0F172A]/80 flex flex-col items-center justify-center p-6"
          >
            {/* Animated Scanner Ring */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#3525CD]/30 dark:border-[#818CF8]/30"
              />
              <motion.div 
                animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#3525CD]/20 to-[#673AB7]/20 blur-md"
              />
              
              {/* Central Lock Icon with Sweeping Scanner Line */}
              <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center overflow-hidden border border-white/50 dark:border-slate-600">
                <span className="material-symbols-rounded text-[32px] text-[#3525CD] dark:text-[#818CF8]">lock</span>
                
                {/* Laser Sweep */}
                <motion.div 
                  animate={{ top: ['-10%', '110%', '-10%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-[#6FFBBE] shadow-[0_0_8px_2px_rgba(111,251,190,0.8)]"
                />
              </div>
            </div>

            <h2 className="text-3xl font-black text-[#181B25] dark:text-white mb-2 tracking-tight">DayMeet Vault</h2>
            <p className="text-sm font-medium text-[#464555] dark:text-slate-400 text-center mb-10">
              Hardware biometric scan required to resume.
            </p>
            
            <button 
              onClick={handleUnlock}
              className="w-full max-w-xs h-14 rounded-2xl bg-[#181B25] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition shadow-[0_8px_24px_rgba(24,27,37,0.3)] active:scale-95"
            >
              <span className="material-symbols-rounded text-[20px]">fingerprint</span>
              <span>Scan to Authenticate</span>
            </button>

            {/* Developer/Emergency Bypass */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <button 
                onClick={() => setShowPinModal(true)}
                className="text-[10px] font-bold tracking-widest text-[#464555] hover:text-[#181B25] uppercase underline decoration-[#E5E8F5] underline-offset-4 active:scale-95 transition"
              >
                Master PIN Fallback
              </button>
              
              <button 
                onClick={() => setAppLocked(false)}
                className="text-[10px] font-bold tracking-widest text-[#E53935] hover:text-[#B71C1C] uppercase active:scale-95 transition"
              >
                Direct Login (Dev Bypass)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PinFallbackModal 
        isOpen={showPinModal} 
        onSuccess={() => { setShowPinModal(false); setAppLocked(false); }} 
        onCancel={() => setShowPinModal(false)} 
      />
    </div>
  );
}

// Wrapper component to handle routing context for the hardware back button
function AppWrapper() {
  return (
    <HashRouter>
      <BackButtonHandler />
      <App />
    </HashRouter>
  );
}

function BackButtonHandler() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleBackButton = ({ canGoBack }) => {
      const path = window.location.hash.replace('#', '') || '/';
      const rootPaths = ['/', '/calendar', '/tasks', '/insights', '/finance', '/more'];
      
      if (!rootPaths.includes(path)) {
        // If we are on a sub-screen, go back in history
        navigate(-1);
      } else {
        // If on a root tab, minimize the app (native Android behavior)
        CapacitorApp.minimizeApp();
      }
    };

    const listener = CapacitorApp.addListener('backButton', handleBackButton);
    return () => {
      listener.then(l => l.remove()).catch(() => {});
    };
  }, [navigate]);
  
  return null;
}

export default AppWrapper;
