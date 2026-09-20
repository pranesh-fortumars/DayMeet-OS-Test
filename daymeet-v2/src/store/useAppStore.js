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
    const unsub = onSnapshot(tasksRef, (snapshot) => {
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
  }
}));
