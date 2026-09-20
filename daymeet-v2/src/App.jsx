import React from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';

function App() {
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
