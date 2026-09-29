import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { triggerHaptic } from '../../utils/haptics';

export default function PinFallbackModal({ isOpen, onSuccess, onCancel }) {
  const { appPin, setAppPin } = useAppStore();
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleKeyPress = (num) => {
    triggerHaptic('light');
    setError(false);
    if (pinInput.length < 4) {
      const newPin = pinInput + num;
      setPinInput(newPin);
      
      if (newPin.length === 4) {
        // Evaluate
        setTimeout(() => {
          if (!appPin) {
            triggerHaptic('success');
            setAppPin(newPin);
            onSuccess();
          } else {
            if (newPin === appPin) {
              triggerHaptic('success');
              onSuccess();
            } else {
              triggerHaptic('error');
              setError(true);
              setPinInput('');
            }
          }
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    triggerHaptic('light');
    setPinInput(prev => prev.slice(0, -1));
  };

  return (
    <div className="absolute inset-0 z-[99999] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-200">
      <div className="w-full max-w-sm flex flex-col items-center">
        <h2 className="text-2xl font-black text-white mb-2">{appPin ? 'Enter Master PIN' : 'Set Master PIN'}</h2>
        <p className="text-sm text-gray-400 mb-8 text-center">{appPin ? 'Biometrics failed. Please enter your backup PIN.' : 'No biometrics detected. Create a 4-digit backup PIN.'}</p>

        {/* PIN Dots */}
        <div className={`flex items-center gap-4 mb-10 ${error ? 'animate-bounce text-red-500' : ''}`}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full transition-all duration-200 ${pinInput.length > i ? 'bg-white scale-110' : 'bg-gray-700'}`}></div>
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-4 w-full px-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button key={num} onClick={() => handleKeyPress(num)} className="w-full aspect-square rounded-full flex items-center justify-center text-2xl font-medium text-white hover:bg-white/10 active:bg-white/20 transition">
              {num}
            </button>
          ))}
          <button onClick={onCancel} className="w-full aspect-square rounded-full flex items-center justify-center text-sm font-bold text-gray-400 hover:bg-white/10 active:bg-white/20 transition">
            CANCEL
          </button>
          <button onClick={() => handleKeyPress(0)} className="w-full aspect-square rounded-full flex items-center justify-center text-2xl font-medium text-white hover:bg-white/10 active:bg-white/20 transition">
            0
          </button>
          <button onClick={handleBackspace} className="w-full aspect-square rounded-full flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition">
            <span className="material-symbols-rounded">backspace</span>
          </button>
        </div>
      </div>
    </div>
  );
}
