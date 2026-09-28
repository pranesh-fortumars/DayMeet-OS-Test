import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function CopilotModal() {
  const { modals, setModalOpen, addTask } = useAppStore();
  const isOpen = modals.copilot;

  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your DayMeet Copilot. How can I help you organize your day, schedule a meeting, or check your finances?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  if (!isOpen) return null;

  const handleClose = () => setModalOpen('copilot', false);

  const processQuery = async (query) => {
    const lQuery = query.toLowerCase();
    if (lQuery.includes('remind') || lQuery.includes('task') || lQuery.includes('schedule')) {
       addTask({
         title: query,
         subtitle: 'Auto-extracted by AI Copilot',
         tag: 'Task',
         tagType: 'priority',
         priority: 'High',
         profile: 'Work'
       });
    }

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return "I've processed that for you! (Note: I am running in mock mode. Add `VITE_GEMINI_API_KEY` to your .env to connect me to a real Google Gemini LLM.)";
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are DayMeet Copilot, an AI assistant for a productivity app. Keep responses concise, friendly, and under 3 sentences. User says: ${query}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (e) {
      console.error(e);
      return "Oops, my neural net is currently offline. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const reply = await processQuery(userMsg);
    
    setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      
      {/* GLASSMORPHIC CONTAINER */}
      <div className="bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur-3xl w-full max-w-lg h-[85vh] sm:h-[650px] rounded-t-[32px] sm:rounded-[32px] flex flex-col shadow-[0_16px_40px_rgba(0,0,0,0.3)] border border-white dark:border-white/20 overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 duration-300">
        
        {/* Header - Transparent/Blurred Gradient */}
        <div className="bg-gradient-to-r from-[#3525CD]/90 to-[#673AB7]/90 backdrop-blur-md p-4 text-white flex items-center justify-between shrink-0 border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
              <span className="material-symbols-rounded text-[#6FFBBE] text-[18px]">auto_awesome</span>
            </div>
            <h3 className="font-bold text-base tracking-tight">DayMeet Copilot</h3>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition shadow-inner">
            <span className="material-symbols-rounded text-[18px]">close</span>
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-5">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#673AB7] text-white flex items-center justify-center shrink-0 shadow-md mt-1 border border-white/20">
                  <span className="material-symbols-rounded text-[16px]">auto_awesome</span>
                </div>
              )}
              <div className={`p-3.5 rounded-[20px] shadow-sm text-sm border backdrop-blur-md ${msg.sender === 'user' ? 'bg-[#3525CD]/90 text-white rounded-tr-none border-[#3525CD]/50' : 'bg-white/80 dark:bg-black/40 text-[#181B25] dark:text-white rounded-tl-none border-white/50 dark:border-white/10'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#673AB7] text-white flex items-center justify-center shrink-0 shadow-md mt-1 border border-white/20">
                <span className="material-symbols-rounded text-[16px]">auto_awesome</span>
              </div>
              <div className="bg-white/80 dark:bg-black/40 p-3.5 rounded-[20px] rounded-tl-none border border-white/50 dark:border-white/10 shadow-sm text-sm flex gap-1.5 items-center backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-[#3525CD] dark:bg-[#818CF8] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#3525CD] dark:bg-[#818CF8] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-[#3525CD] dark:bg-[#818CF8] animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area - Frosted Glass */}
        <div className="p-4 bg-white/50 dark:bg-black/30 backdrop-blur-2xl border-t border-white/40 dark:border-white/10 shrink-0">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot anything..." 
              className="w-full bg-white/60 dark:bg-black/40 border border-white/50 dark:border-white/10 rounded-full pl-5 pr-14 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3525CD]/50 text-[#181B25] dark:text-white shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="absolute right-1.5 w-11 h-11 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#673AB7] text-white flex items-center justify-center hover:opacity-90 transition shadow-md disabled:opacity-50 border border-white/20"
            >
              <span className="material-symbols-rounded text-[20px]">send</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
