import { create } from 'zustand';

export const useMeetingStore = create((set) => ({
  isRecording: false,
  transcript: [],
  actionItems: [],
  speakerStats: { You: 45, Alex: 35, Sarah: 20 },
  
  startRecording: () => set({ isRecording: true }),
  stopRecording: () => set({ isRecording: false }),
  
  // Simulate live speech-to-text
  addTranscriptLine: (speaker, text) => 
    set((state) => ({ 
      transcript: [...state.transcript, { id: Date.now(), speaker, text }] 
    })),
    
  extractActionItems: () => 
    set((state) => ({
      actionItems: [
        { id: 1, owner: 'Alex', task: 'Finish API schema', deadline: 'Thursday', status: 'pending' },
        { id: 2, owner: 'You', task: 'Review new design tokens', deadline: 'EOD', status: 'pending' }
      ]
    })),
    
  resetMeeting: () => set({
    isRecording: false,
    transcript: [],
    actionItems: [],
    speakerStats: { You: 33, Alex: 33, Sarah: 34 }
  })
}));
