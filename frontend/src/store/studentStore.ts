import { create } from 'zustand';
import api from '@/api/axios';

interface Student {
  id: number;
  name: string;
  roll_number: string;
  class: string;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  fetchStudents: () => Promise<void>;
}

export const useStudentStore = create<StudentState>((set) => ({
  students: [],
  loading: false,

  fetchStudents: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/students');
      set({ students: res.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
