import React from 'react';

export default function Header() {
  const triggerToast = (msg) => console.log('Toast:', msg);
  const openAiAssistant = () => console.log('Open AI Assistant');
  const toggleGlobalTheme = () => document.documentElement.classList.toggle('dark');
  const openSearchModal = () => console.log('Open Search');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9FF]/95 backdrop-blur-md border-b border-[#E5E8F5] transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div onClick={openAiAssistant} className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="w-9 h-9 rounded-[10px] bg-[#3525CD] border border-white/20 flex items-center justify-center text-white shadow-sm shadow-indigo-600/20">
            <span className="material-symbols-rounded text-[22px]">widgets</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold tracking-tight text-[#181B25]">DayMeet</span>
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button onClick={toggleGlobalTheme} title="Toggle Global Dark / Light Theme" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#EBEDFB] transition">
            <span className="material-symbols-rounded text-[20px]">dark_mode</span>
          </button>

          <button onClick={openSearchModal} title="Search Across All Modules" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#EBEDFB] transition">
            <span className="material-symbols-rounded text-[20px]">search</span>
          </button>

          <button onClick={() => triggerToast('All systems synced')} title="Sync & Notifications" className="w-9 h-9 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#EBEDFB] transition relative">
            <span className="material-symbols-rounded text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E53935]"></span>
          </button>

          <button onClick={openAiAssistant} title="AI Assistant Copilot" className="h-8 px-2.5 rounded-full bg-[#E2DFFF] text-[#3525CD] text-xs font-bold flex items-center gap-1.5 hover:bg-[#DAD7FF] transition ml-1">
            <span className="material-symbols-rounded text-[16px] animate-pulse">auto_awesome</span>
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          <button onClick={() => triggerToast('Alex Chen • Profile')} title="Profile" className="w-8 h-8 rounded-full ml-1 overflow-hidden ring-2 ring-[#E2DFFF] hover:ring-[#3525CD] transition">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120" alt="Alex Chen" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}
