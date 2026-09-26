import React, { useEffect, useRef } from 'react';
import { useInteraction } from '../../hooks/useInteraction';
import { useMeetingStore } from '../../store/useMeetingStore';

export default function MeetingWhispererModal({ isOpen, onClose }) {
  const { interact } = useInteraction();
  const { isRecording, startRecording, stopRecording, transcript, actionItems, speakerStats, addTranscriptLine, extractActionItems, resetMeeting } = useMeetingStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      resetMeeting();
    }
  }, [isOpen, resetMeeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      interact('Stopped Meeting Whisperer');
      // Simulate AI summarizing and extracting decisions
      setTimeout(() => {
        extractActionItems();
      }, 1000);
    } else {
      startRecording();
      interact('Started Live Transcriber');
      
      // Simulate live incoming audio stream
      setTimeout(() => addTranscriptLine('Alex', 'So I think we need to finish the API schema by Thursday to hit the deadline.'), 1500);
      setTimeout(() => addTranscriptLine('You', 'Agreed. I will review the new design tokens by EOD today.'), 4000);
      setTimeout(() => addTranscriptLine('Sarah', 'Perfect, that unblocks the frontend team.'), 6500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1E293B] w-full h-[90vh] rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-500">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#E5E8F5] dark:border-slate-700 bg-[#FAF9FF] dark:bg-slate-800">
          <div>
            <h3 className="font-black text-[#181B25] dark:text-white text-lg flex items-center gap-2">
              <span className="material-symbols-rounded text-[#3525CD]">record_voice_over</span>
              Live Whisperer
            </h3>
            <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-[#10B981] animate-pulse' : 'bg-gray-400'}`}></span>
              {isRecording ? 'Listening actively...' : 'Standby Mode'}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-200/50 dark:bg-slate-700 flex items-center justify-center text-gray-500 hover:bg-gray-300/50 transition">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
          
          {/* Sentiment & Speaker Breakdown */}
          <div className="bg-[#181B25] p-4 rounded-2xl shadow-sm text-white">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Speaker Distribution</h4>
            <div className="flex w-full h-2 rounded-full overflow-hidden mb-2">
              <div style={{ width: `${speakerStats.You}%` }} className="bg-[#3525CD] transition-all duration-500"></div>
              <div style={{ width: `${speakerStats.Alex}%` }} className="bg-[#10B981] transition-all duration-500"></div>
              <div style={{ width: `${speakerStats.Sarah}%` }} className="bg-[#F59E0B] transition-all duration-500"></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-[#818CF8]">You ({speakerStats.You}%)</span>
              <span className="text-[#34D399]">Alex ({speakerStats.Alex}%)</span>
              <span className="text-[#FBBF24]">Sarah ({speakerStats.Sarah}%)</span>
            </div>
          </div>

          {/* Live Transcript Stream */}
          <div>
            <h4 className="text-sm font-black text-[#181B25] dark:text-white mb-3">Live Transcript</h4>
            {transcript.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed border-[#E5E8F5] dark:border-slate-700 rounded-2xl">
                <p className="text-xs text-[#464555] dark:text-gray-400">Tap start to begin transcribing...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transcript.map((msg) => (
                  <div key={msg.id} className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <span className="text-[10px] font-bold text-gray-400 mb-1">{msg.speaker}</span>
                    <div className={`p-3 rounded-2xl text-sm w-fit max-w-[85%] ${msg.speaker === 'You' ? 'bg-[#3525CD] text-white self-end' : 'bg-[#F1F3FF] dark:bg-slate-800 text-[#181B25] dark:text-white border border-[#E5E8F5] dark:border-slate-700'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Extracted Actions */}
          {actionItems.length > 0 && (
            <div className="animate-in zoom-in-95 duration-500">
              <h4 className="text-sm font-black text-[#181B25] dark:text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-rounded text-[#F59E0B] text-[18px]">bolt</span>
                Extracted Action Items
              </h4>
              <div className="space-y-2">
                {actionItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-[#FFFBF0] dark:bg-amber-900/10 border border-[#FDE68A] dark:border-amber-700/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-[#F59E0B] bg-white flex items-center justify-center"></div>
                      <div>
                        <p className="text-xs font-bold text-[#181B25] dark:text-white">{item.task}</p>
                        <p className="text-[10px] text-[#B45309] font-semibold mt-0.5">Assigned to: {item.owner} • Due: {item.deadline}</p>
                      </div>
                    </div>
                    <button className="px-2 py-1 rounded bg-[#F59E0B]/20 text-[#B45309] text-[10px] font-bold">Add to Tasks</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E5E8F5] dark:border-slate-700 flex gap-3 bg-white dark:bg-[#1E293B]">
          <button 
            onClick={handleToggleRecording}
            className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 flex justify-center items-center gap-2 ${
              isRecording 
                ? 'bg-[#FFEBEB] text-[#E53935] hover:bg-[#FFD6D6]' 
                : 'bg-[#3525CD] text-white hover:bg-[#2B1DAE]'
            }`}
          >
            <span className="material-symbols-rounded">{isRecording ? 'stop_circle' : 'mic'}</span>
            {isRecording ? 'Stop Transcribing' : 'Start Whisperer'}
          </button>
          
          {actionItems.length > 0 && (
            <button className="px-4 py-3 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] font-black text-sm hover:bg-[#C8E6C9] active:scale-95 transition flex items-center gap-2">
              <span className="material-symbols-rounded text-[18px]">send</span>
              Dispatch Email
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
