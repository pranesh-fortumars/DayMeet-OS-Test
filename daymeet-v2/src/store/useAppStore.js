import { create } from 'zustand';

export const useAppStore = create((set) => ({
  tasks: [
    { id: 1, title: 'Product Strategy Review', status: 'pending', priority: 'high' },
    { id: 2, title: 'Finalize Mobile Design Tokens', status: 'pending', priority: 'high' },
    { id: 3, title: 'Weekly Groceries', status: 'completed', priority: 'normal' },
  ],
  spending: 3450,
  dailyBudget: 5000,
  sleepQuality: 85,
  steps: 7845,
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, { ...task, id: Date.now() }] })),
  completeTask: (id) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t)
  }))
}));
