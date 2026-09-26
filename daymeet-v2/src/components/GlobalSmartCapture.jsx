import React, { useState, useRef } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useAppStore } from '../store/useAppStore';
import LifeInboxModal from './LifeInboxModal';

export default function GlobalSmartCapture() {
  const { captureToInbox, inbox } = useAppStore();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const pressTimer = useRef(null);
  
  const fileInputRef = useRef(null);
  const pendingCount = inbox.length;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
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
    
    captureToInbox(inputValue.trim() || 'Attached Image', selectedImage);
    
    setInputValue('');
    setSelectedImage(null);
    setIsInputOpen(false);
    setIsInboxOpen(true);
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
          className={`pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_8px_24px_rgba(53,37,205,0.4)] transition-all duration-300 select-none touch-none ${
            isRecording ? 'bg-[#E53935] scale-125 shadow-[0_0_30px_rgba(229,57,53,0.6)] animate-pulse' : 'bg-[#3525CD] hover:bg-[#2B1DAE] active:scale-95'
          }`}
        >
          <span className="material-symbols-rounded text-[28px]">
            {isRecording ? 'mic' : 'center_focus_strong'}
          </span>
        </button>
      </div>

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
                  <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"><span className="material-symbols-rounded text-[20px]">mic</span></button>
                  
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
