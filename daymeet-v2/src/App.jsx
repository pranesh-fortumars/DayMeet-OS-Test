import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomDock from './components/BottomDock';
import HomeScreen from './components/HomeScreen';
import CalendarScreen from './components/CalendarScreen';
import TasksScreen from './components/TasksScreen';
import InsightsScreen from './components/InsightsScreen';
import FinanceScreen from './components/FinanceScreen';
import MoreScreen from './components/MoreScreen';
import CleanupScreen from './components/CleanupScreen';
import WeeklyResetScreen from './components/WeeklyResetScreen';
import GrowthHubScreen from './components/GrowthHubScreen';
import KnowledgeVaultScreen from './components/KnowledgeVaultScreen';
import RelationshipsScreen from './components/RelationshipsScreen';
import GlobalSmartCapture from './components/GlobalSmartCapture';
import AuthScreen from './components/AuthScreen';
import PullToRefresh from './components/PullToRefresh';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppStore } from './store/useAppStore';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const initSync = useAppStore(state => state.initSync);

  useEffect(() => {
    const initApp = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#FAF9FF' });
        await SplashScreen.hide();
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

    return () => unsubscribe();
  }, [initSync]);

  const handleGlobalRefresh = async () => {
    // Simulate a network sync delay
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  if (loading) return null;

  if (!user) {
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200 bg-[#FAF9FF]">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-[100px] flex-1 w-full relative overflow-x-hidden">
        <PullToRefresh onRefresh={handleGlobalRefresh}>
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
            <Route path="/relationships" element={<RelationshipsScreen />} />
          </Routes>
        </PullToRefresh>
      </main>
      <BottomDock />
      <GlobalSmartCapture />
    </div>
  );
}

// Wrapper component to handle routing context for the hardware back button
function AppWrapper() {
  return (
    <BrowserRouter>
      <BackButtonHandler />
      <App />
    </BrowserRouter>
  );
}

function BackButtonHandler() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleBackButton = ({ canGoBack }) => {
      const path = window.location.pathname;
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
