import React, { useState, useRef } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useAppStore } from '../store/useAppStore';
import LifeInboxModal from './LifeInboxModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalSmartCapture() {
  const { captureToInbox, inbox, toggleDetoxMode, setActiveProfile, toggleGlobalLock, triggerConfetti } = useAppStore();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const pressTimer = useRef(null);
  
  const fileInputRef = useRef(null);
  const pendingCount = inbox.length;

  const triggerToast = (msg) => {
    // Simple custom toast fallback if we don't have a global toast system imported here
    console.log('Copilot Toast:', msg);
  };

  const processCopilotCommand = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    let actionExecuted = false;

    if (lower.includes('detox mode')) {
      toggleDetoxMode();
      actionExecuted = true;
    }
    if (lower.includes('work mode') || lower.includes('work profile')) {
      setActiveProfile('Work');
      actionExecuted = true;
    }
    if (lower.includes('personal mode') || lower.includes('personal profile')) {
      setActiveProfile('Personal');
      actionExecuted = true;
    }
    if (lower.includes('lock vault') || lower.includes('ghost mode')) {
      toggleGlobalLock();
      actionExecuted = true;
    }

    if (actionExecuted) {
      triggerConfetti();
      triggerToast('Copilot executed your command.');
      Haptics.notification({ type: 'SUCCESS' }).catch(() => {});
      return true;
    }
    return false;
  };
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const startDictation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice dictation is not supported on this device/browser combination.");
      return;
    }
    
    Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    setIsDictating(true);
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => prev ? `${prev} ${transcript}` : transcript);
      setIsDictating(false);
      Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
    };
    
    recognition.onerror = () => {
      setIsDictating(false);
    };
    
    recognition.onend = () => {
      setIsDictating(false);
    };
    
    recognition.start();
  };

  const startDirectScan = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      if (image && image.webPath) {
        // Mock OCR Receipt Parsing (Sprint 1)
        setTimeout(() => {
          captureToInbox('Receipt Scanned: ₹240 (Starbucks)', image.webPath);
          setIsInboxOpen(true);
        }, 800);
      }
    } catch (e) {
      console.log('Camera error/cancelled');
    }
  };

  const startPress = () => {
    pressTimer.current = setTimeout(() => {
      Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => {});
      setIsRecording(true);
    }, 400); // 400ms for long press
  };

  const endPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (isRecording) {
      setIsRecording(false);
      // Mock Whisper AI processing
      setTimeout(() => {
        captureToInbox('Remind me to call John tomorrow (Voice)', null);
        setIsInboxOpen(true);
      }, 600);
    } else {
      // Open the smart capture text/image input modal
      setIsInputOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedImage) return;
    
    const text = inputValue.trim();
    const wasCommand = processCopilotCommand(text);

    if (!wasCommand) {
      captureToInbox(text || 'Attached Image', selectedImage);
      setIsInboxOpen(true);
    }
    
    setInputValue('');
    setSelectedImage(null);
    setIsInputOpen(false);
  };

  const closeInput = () => {
    setIsInputOpen(false);
    setInputValue('');
    setSelectedImage(null);
  };

  return (
    <>
      <div className="fixed bottom-[80px] right-4 flex flex-col items-end gap-3 z-40 pointer-events-none">
        {pendingCount > 0 && (
          <button 
            onClick={() => setIsInboxOpen(true)}
            className="pointer-events-auto relative w-12 h-12 rounded-full bg-[#181B25] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform animate-in zoom-in duration-300"
          >
            <span className="material-symbols-rounded">inbox_customize</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E53935] rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {pendingCount}
            </span>
          </button>
        )}

        <button 
          onPointerDown={startPress}
          onPointerUp={endPress}
          onPointerLeave={endPress}
          className={`pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_8px_24px_rgba(53,37,205,0.4)] transition-all duration-300 select-none touch-none z-50 relative ${
            isRecording ? 'bg-transparent shadow-none' : 'bg-[#3525CD] hover:bg-[#2B1DAE] active:scale-95'
          }`}
        >
          {!isRecording && (
            <span className="material-symbols-rounded text-[28px]">
              center_focus_strong
            </span>
          )}
        </button>
      </div>

      {/* AI Conversational Orb Overlay */}
      <AnimatePresence>
        {isRecording && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-[45] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/70 text-sm font-medium mb-12"
              >
                Listening...
              </motion.p>
              
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer Breathing Glow */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full blur-3xl opacity-50 bg-gradient-to-tr from-[#3525CD] via-[#10B981] to-[#38BDF8]"
                />
                
                {/* Inner Pulsing Core */}
                <motion.div
                  animate={{ 
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="absolute inset-4 rounded-full blur-xl opacity-80 bg-gradient-to-bl from-[#6366F1] to-[#C084FC]"
                />

                {/* Solid Center Orb */}
                <motion.div 
                  className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-[#3525CD] to-[#6FFBBE] shadow-[0_0_40px_rgba(111,251,190,0.5)]"
                />
              </div>

              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white text-lg font-bold mt-12 text-center px-8"
              >
                "Remind me to call John tomorrow..."
              </motion.p>
            </div>
            
            <div className="pb-12 text-white/50 text-xs font-bold uppercase tracking-widest">
              Release to Process
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isInputOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#181B25] dark:text-white text-lg flex items-center gap-2">
                <span className="material-symbols-rounded text-[#3525CD]">bolt</span>
                Smart Capture
              </h3>
              <button onClick={closeInput} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea 
                  autoFocus
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What's on your mind? Or attach a screenshot..."
                  className="w-full min-h-[120px] p-4 bg-[#FAF9FF] dark:bg-slate-800 border border-[#E5E8F5] dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#3525CD] dark:focus:border-[#3525CD] resize-none text-sm text-[#181B25] dark:text-white pb-20"
                />
                
                {selectedImage && (
                  <div className="absolute bottom-4 left-4 relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-md group">
                    <img src={selectedImage} alt="Attachment preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setSelectedImage(null)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white">
                      <span className="material-symbols-rounded text-[20px]">delete</span>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <button type="button" onClick={startDictation} className={`p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition ${isDictating ? 'text-[#E53935] bg-[#FFEBEE] animate-pulse' : ''}`} title="Voice Dictation">
                    <span className="material-symbols-rounded text-[20px]">mic</span>
                  </button>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageSelect}
                  />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition text-[#3525CD] bg-[#F1F3FF] dark:bg-[#3525CD]/20" title="Upload Image">
                    <span className="material-symbols-rounded text-[20px]">image</span>
                  </button>
                  <button type="button" onClick={() => { closeInput(); startDirectScan(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition text-[#3525CD] bg-[#F1F3FF] dark:bg-[#3525CD]/20" title="Live Camera">
                    <span className="material-symbols-rounded text-[20px]">photo_camera</span>
                  </button>
                </div>
                
                <button 
                  type="submit"
                  disabled={!inputValue.trim() && !selectedImage}
                  className="px-6 py-2.5 bg-[#3525CD] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl hover:bg-[#2B1DAE] transition flex items-center gap-2"
                >
                  <span>Send to Inbox</span>
                  <span className="material-symbols-rounded text-[18px]">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <LifeInboxModal isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
    </>
  );
}
