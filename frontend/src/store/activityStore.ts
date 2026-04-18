import { create } from 'zustand';
import api from '@/api/axios';

interface Activity {
  id: number;
  title: string;
  description: string;
  activity_date: string;
}

interface ActivityState {
  activities: Activity[];
  joinedActivities: Activity[];
  loading: boolean;
  fetchActivities: () => Promise<void>;
  fetchJoinedActivities: (studentId: number) => Promise<void>;
  createActivity: (title: string, description: string, activityDate: string) => Promise<void>;
  joinActivity: (activityId: number, studentId: number) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  joinedActivities: [],
  loading: false,

  fetchActivities: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/activities');
      set({ activities: res.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  fetchJoinedActivities: async (studentId) => {
    set({ loading: true });
    try {
      const res = await api.get(`/activities/student/${studentId}`);
      set({ joinedActivities: res.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  createActivity: async (title, description, activityDate) => {
    await api.post('/activities', { title, description, activity_date: activityDate });
  },

  joinActivity: async (activityId, studentId) => {
    await api.post('/activities/join', { activity_id: activityId, student_id: studentId });
  },
}));
