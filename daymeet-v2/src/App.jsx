import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomDock from './components/BottomDock';
import HomeScreen from './components/HomeScreen';
import CalendarScreen from './components/CalendarScreen';
import TasksScreen from './components/TasksScreen';
import InsightsScreen from './components/InsightsScreen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

function App() {
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
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-[100px] flex-1 w-full relative overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/tasks" element={<TasksScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
          </Routes>
        </main>
        <BottomDock />
      </div>
    </BrowserRouter>
  );
}

export default App;
