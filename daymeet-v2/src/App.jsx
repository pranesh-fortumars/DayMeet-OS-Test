import React, { useEffect } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import { StatusBar, Style } from '@capacitor/status-bar';

function App() {
  useEffect(() => {
    const initStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#FAF9FF' });
      } catch (e) {
        // Will throw on web, safe to ignore
      }
    };
    initStatusBar();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-32 flex-1 w-full">
        <HomeScreen />
      </main>
    </div>
  );
}

export default App;
