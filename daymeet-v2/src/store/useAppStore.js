import { create } from 'zustand';
import { db, auth } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export const useAppStore = create((set, get) => ({
  tasks: [],
  spending: 3450,
  dailyBudget: 5000,
  sleepQuality: 85,
  steps: 7845,
  unsubscribeTasks: null,

  initSync: () => {
    const user = auth.currentUser;
    if (!user) return;
    
    // Unsubscribe from previous if exists
    if (get().unsubscribeTasks) get().unsubscribeTasks();

    const tasksRef = collection(db, `users/${user.uid}/tasks`);
    const unsub = onSnapshot(tasksRef, async (snapshot) => {
      if (snapshot.empty && !get()._seeded) {
        set({ _seeded: true });
        const defaultTasks = [
          { title: 'Product Strategy Review', subtitle: '4 attendees • Google Meet', tag: 'Meeting', tagType: 'meeting', status: 'pending', priority: 'Medium', time: '09:30 AM', createdAt: Date.now() },
          { title: 'Finalize Mobile Design Tokens', subtitle: 'Due at release freeze • 3 subtasks', tag: 'Priority', tagType: 'priority', status: 'pending', priority: 'High', time: '12:00 PM', createdAt: Date.now() + 1000 },
          { title: 'Tata Power Electricity Bill', subtitle: '₹2,400 due tomorrow • 1-tap UPI', tag: 'Autopay', tagType: 'autopay', status: 'pending', priority: 'High', time: '01:30 PM', createdAt: Date.now() + 2000 },
          { title: '90m Deep Work Sanctuary', subtitle: 'Calendar focus block • Slack DND', tag: 'Focus', tagType: 'focus', status: 'pending', priority: 'Medium', time: '02:00 PM', createdAt: Date.now() + 3000 },
          { title: 'Review Chennai Trip Packing Checklist', subtitle: 'Flight 6E 412 in 3 days', tag: 'Travel', tagType: 'travel', status: 'completed', priority: 'Low', time: '04:30 PM', createdAt: Date.now() + 4000 },
          { title: 'Hydration Target Check (2.5L)', subtitle: '1.8L logged • 700ml remaining', tag: 'Wellness', tagType: 'wellness', status: 'completed', priority: 'Low', time: '06:00 PM', createdAt: Date.now() + 5000 }
        ];
        for (const t of defaultTasks) {
          const docRef = doc(collection(db, `users/${user.uid}/tasks`));
          await setDoc(docRef, t);
        }
        return;
      }

      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort tasks by creation time ascending
      tasks.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
      set({ tasks });
    });

    set({ unsubscribeTasks: unsub });
  },

  addTask: async (task) => {
    const user = auth.currentUser;
    if (!user) return;
    // We don't set local state manually, Firestore snapshot listener will update it
    const taskDoc = doc(collection(db, `users/${user.uid}/tasks`));
    await setDoc(taskDoc, { ...task, createdAt: Date.now(), status: 'pending' });
  },

  completeTask: async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    const taskDoc = doc(db, `users/${user.uid}/tasks`, id);
    await setDoc(taskDoc, { status: 'completed' }, { merge: true });
  },

  // Life Inbox Actions
  inbox: [],
  captureToInbox: (rawText) => {
    set((state) => ({
      inbox: [
        {
          id: 'inbox_' + Date.now(),
          rawText,
          createdAt: Date.now(),
          status: 'pending' // pending, processing, approved
        },
        ...state.inbox
      ]
    }));
  },
  dismissInboxItem: (id) => {
    set((state) => ({
      inbox: state.inbox.filter(item => item.id !== id)
    }));
  },
  processInboxItem: (id, category, action) => {
    set((state) => ({
      inbox: state.inbox.map(item => 
        item.id === id ? { ...item, category, action, status: 'processing' } : item
      )
    }));
  },
  approveInboxItem: (id) => {
    const item = get().inbox.find(i => i.id === id);
    if (!item) return;

    // Simulate routing based on category
    if (item.category === 'Task') {
      get().addTask({
        title: item.rawText,
        subtitle: 'From Life Inbox',
        tag: 'Task',
        tagType: 'priority',
        priority: 'Medium',
      });
    }

    set((state) => ({
      inbox: state.inbox.filter(i => i.id !== id)
    }));
  }
}));
