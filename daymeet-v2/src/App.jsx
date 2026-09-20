import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomDock from './components/BottomDock';
import HomeScreen from './components/HomeScreen';
import CalendarScreen from './components/CalendarScreen';
import TasksScreen from './components/TasksScreen';
import InsightsScreen from './components/InsightsScreen';
import FinanceScreen from './components/FinanceScreen';
import AuthScreen from './components/AuthScreen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
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

  if (loading) return null;

  if (!user) {
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200 bg-[#FAF9FF]">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-[100px] flex-1 w-full relative overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/tasks" element={<TasksScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
            <Route path="/finance" element={<FinanceScreen />} />
          </Routes>
        </main>
        <BottomDock />
      </div>
    </BrowserRouter>
  );
}

export default App;
