import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomDock from './components/BottomDock';
import GlobalSmartCapture from './components/GlobalSmartCapture';
import AuthScreen from './components/AuthScreen';
import PullToRefresh from './components/PullToRefresh';

// Lazy loaded screens
const HomeScreen = lazy(() => import('./components/HomeScreen'));
const CalendarScreen = lazy(() => import('./components/CalendarScreen'));
const TasksScreen = lazy(() => import('./components/TasksScreen'));
const InsightsScreen = lazy(() => import('./components/InsightsScreen'));
const FinanceScreen = lazy(() => import('./components/FinanceScreen'));
const MoreScreen = lazy(() => import('./components/MoreScreen'));
const CleanupScreen = lazy(() => import('./components/CleanupScreen'));
const WeeklyResetScreen = lazy(() => import('./components/WeeklyResetScreen'));
const GrowthHubScreen = lazy(() => import('./components/GrowthHubScreen'));
const KnowledgeVaultScreen = lazy(() => import('./components/KnowledgeVaultScreen'));
const SecurityVaultScreen = lazy(() => import('./components/SecurityVaultScreen'));
const DelegationHubScreen = lazy(() => import('./components/DelegationHubScreen'));
const RelationshipsScreen = lazy(() => import('./components/RelationshipsScreen'));
const ProfileScreen = lazy(() => import('./components/ProfileScreen'));
const FamilySyncScreen = lazy(() => import('./components/FamilySyncScreen'));
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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appLocked, setAppLocked] = useState(false);
  const { initSync, activeProfile, setActiveProfile, setCurrentLocation, globalLockEnabled } = useAppStore();

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

  const handleUnlock = async () => {
    try {
      const result = await NativeBiometric.isAvailable();
      if (result.isAvailable) {
        await NativeBiometric.verifyIdentity({
          reason: "Unlock DayMeet OS",
          title: "Biometric Authentication",
          subtitle: "Confirm your identity to resume session",
        });
        setAppLocked(false);
      } else {
        // Fallback for Web/Emulators without biometric hardware
        setAppLocked(false);
      }
    } catch (e) {
      console.error("Biometric failed:", e);
      // Don't unlock if user cancels or fails
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

  return (
    <div className="h-[100dvh] flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200 bg-[#FAF9FF] overflow-hidden">
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
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/calendar" element={<CalendarScreen />} />
                <Route path="/tasks" element={<TasksScreen />} />
                <Route path="/insights" element={<InsightsScreen />} />
                <Route path="/finance" element={<FinanceScreen />} />
                <Route path="/more" element={<MoreScreen />} />
                <Route path="/cleanup" element={<CleanupScreen />} />
                <Route path="/weekly-reset" element={<WeeklyResetScreen />} />
                <Route path="/growth-hub" element={<GrowthHubScreen />} />
                <Route path="/knowledge" element={<KnowledgeVaultScreen />} />
                <Route path="/security-vault" element={<SecurityVaultScreen />} />
                <Route path="/delegation" element={<DelegationHubScreen />} />
                <Route path="/relationships" element={<RelationshipsScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/household" element={<FamilySyncScreen />} />
              </Routes>
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
      {appLocked && (
        <div className="fixed inset-0 z-[999] bg-[#FAF9FF] dark:bg-[#0F172A] flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="w-20 h-20 rounded-full bg-[#FFEBEE] text-[#D32F2F] flex items-center justify-center mb-6">
            <span className="material-symbols-rounded text-[40px]">lock</span>
          </div>
          <h2 className="text-2xl font-black text-[#181B25] dark:text-white mb-2">DayMeet OS Locked</h2>
          <p className="text-sm text-[#464555] dark:text-slate-400 text-center mb-8">
            FaceID or Fingerprint required to resume session.
          </p>
          <button 
            onClick={handleUnlock}
            className="w-full max-w-xs h-[52px] rounded-xl bg-[#181B25] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition"
          >
            <span className="material-symbols-rounded text-[20px]">fingerprint</span>
            <span>Authenticate</span>
          </button>
        </div>
      )}
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
