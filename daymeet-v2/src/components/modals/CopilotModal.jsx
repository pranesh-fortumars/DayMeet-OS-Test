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
    // Basic intent detection for actioning the OS
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF9FF] w-full max-w-lg h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3525CD] to-[#673AB7] p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-[#6FFBBE] text-[20px]">auto_awesome</span>
            <h3 className="font-bold text-sm">DayMeet Copilot</h3>
          </div>
          <button onClick={handleClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
            <span className="material-symbols-rounded text-[16px]">close</span>
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#673AB7] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <span className="material-symbols-rounded text-[16px]">auto_awesome</span>
                </div>
              )}
              <div className={`p-3 rounded-2xl border shadow-sm text-sm ${msg.sender === 'user' ? 'bg-[#3525CD] text-white rounded-tr-none border-[#3525CD]' : 'bg-white text-[#181B25] rounded-tl-none border-[#E5E8F5]'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#673AB7] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <span className="material-symbols-rounded text-[16px]">auto_awesome</span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#E5E8F5] shadow-sm text-sm text-[#181B25] flex gap-1 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3525CD] animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#3525CD] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#3525CD] animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#E5E8F5] shrink-0">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot anything..." 
              className="w-full bg-[#FAF9FF] border border-[#E5E8F5] rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#3525CD]"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="absolute right-1 w-10 h-10 rounded-full bg-[#3525CD] text-white flex items-center justify-center hover:bg-[#2B1DAE] transition shadow-sm disabled:opacity-50"
            >
              <span className="material-symbols-rounded text-[18px]">send</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
