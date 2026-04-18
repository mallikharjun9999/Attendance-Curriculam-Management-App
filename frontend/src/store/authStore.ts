import { create } from 'zustand';
import api from '@/api/axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,

  initAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      set({ token, user: JSON.parse(userStr) });
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, loading: false });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  register: async (name, email, password, role) => {
    set({ loading: true });
    try {
      await api.post('/auth/register', { name, email, password, role });
      set({ loading: false });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  fetchProfile: async () => {
    try {
      const res = await api.get('/auth/profile');
      set({ user: res.data });
    } catch {
      // ignore
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
}));
