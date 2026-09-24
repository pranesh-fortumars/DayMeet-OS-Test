import { create } from 'zustand';
import { db, auth } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

export const useAppStore = create((set, get) => ({
  // Navigation / UI State
  activeProfile: 'Work', // Work, Personal, Creative, Family
  currentLocation: 'Office HQ', // Office HQ, Home Base, Coffee Shop, Transit
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  setCurrentLocation: (loc) => set({ currentLocation: loc }),
  modals: { budgetTarget: false, focusSanctuary: false, windDown: false },
  setModalOpen: (modalId, isOpen) => set((state) => ({ modals: { ...state.modals, [modalId]: isOpen } })),
  
  // Custom Widget Engine & Security
  widgets: { briefing: true, calendar: true, bills: true, vitals: true },
  toggleWidget: (widget) => set((state) => ({ widgets: { ...state.widgets, [widget]: !state.widgets[widget] } })),
  globalLockEnabled: false,
  toggleGlobalLock: () => set((state) => ({ globalLockEnabled: !state.globalLockEnabled })),
  
  // Finance Data
  spending: 3450, // Today's spending
  dailyBudget: 5000,
  monthlySpent: 38450,
  monthlyBudgetTarget: 60000,
  liquidNetWorth: 142850,
  upcomingBills: 2400,
  addExpense: (amount) => set((state) => ({ spending: state.spending + amount })),
  
  // Health & Insights Data
  sleepQuality: 85,
  sleepTime: '7h 20m',
  steps: 7845,
  stepsGoal: 10000,
  hydration: 1.8,
  hydrationGoal: 2.5,
  activeBurn: 480,
  activeBurnGoal: 600,
  weeklySummaryData: [
    { day: 'Mon', fullDay: 'Monday', tasks: 6, habits: 4, spending: 2100 },
    { day: 'Tue', fullDay: 'Tuesday', tasks: 8, habits: 5, spending: 1850 },
    { day: 'Wed', fullDay: 'Wednesday', tasks: 7, habits: 5, spending: 3200 },
    { day: 'Thu', fullDay: 'Thursday (Today)', tasks: 11, habits: 5, spending: 3450 },
    { day: 'Fri', fullDay: 'Friday', tasks: 9, habits: 4, spending: 2400 },
    { day: 'Sat', fullDay: 'Saturday', tasks: 5, habits: 5, spending: 1950 },
    { day: 'Sun', fullDay: 'Sunday', tasks: 7, habits: 4, spending: 4100 }
  ],
  
  // Habits Data
  meditationStreak: 19,
  meditationLogged: false,
  exerciseStreak: 14,
  exerciseLogged: false,
  
  // Tasks Data
  tasks: [],
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
          { title: 'Product Strategy Review', subtitle: '4 attendees • Google Meet', tag: 'Meeting', tagType: 'meeting', status: 'pending', priority: 'Medium', time: '09:30 AM', profile: 'Work', createdAt: Date.now() },
          { title: 'Finalize Mobile Design Tokens', subtitle: 'Due at release freeze • 3 subtasks', tag: 'Priority', tagType: 'priority', status: 'pending', priority: 'High', time: '12:00 PM', profile: 'Work', createdAt: Date.now() + 1000 },
          { title: 'Tata Power Electricity Bill', subtitle: '₹2,400 due tomorrow • 1-tap UPI', tag: 'Autopay', tagType: 'autopay', status: 'pending', priority: 'High', time: '01:30 PM', profile: 'Personal', createdAt: Date.now() + 2000 },
          { title: '90m Deep Work Sanctuary', subtitle: 'Calendar focus block • Slack DND', tag: 'Focus', tagType: 'focus', status: 'pending', priority: 'Medium', time: '02:00 PM', profile: 'Creative', createdAt: Date.now() + 3000 },
          { title: 'Review Chennai Trip Packing Checklist', subtitle: 'Flight 6E 412 in 3 days', tag: 'Travel', tagType: 'travel', status: 'completed', priority: 'Low', time: '04:30 PM', profile: 'Family', createdAt: Date.now() + 4000 },
          { title: 'Hydration Target Check (2.5L)', subtitle: '1.8L logged • 700ml remaining', tag: 'Wellness', tagType: 'wellness', status: 'completed', priority: 'Low', time: '06:00 PM', profile: 'Personal', createdAt: Date.now() + 5000 }
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
  captureToInbox: (rawText, imageUrl = null) => {
    set((state) => ({
      inbox: [
        {
          id: 'inbox_' + Date.now(),
          rawText,
          imageUrl,
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
