import { create } from 'zustand';
import api from '@/api/axios';

// 1. Define the structure of a single Attendance record
interface AttendanceRecord {
  student_id: number;
  name: string;
  roll_number: string;
  class: string;
  status: string | null;
  date: string | null;
}

// 2. Define the Store's State and Actions
interface AttendanceState {
  classRecords: AttendanceRecord[];
  records: any[];
  loading: boolean;
  fetchClassAttendance: () => Promise<void>;
  markAttendance: (studentId: number, date: string, status: string) => Promise<void>;
  fetchStudentAttendance: (userId: number) => Promise<void>;
}

// 3. Create the store with the AttendanceState type
export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  classRecords: [],
  records: [],
  loading: false,

  fetchClassAttendance: async () => { 
    set({ loading: true });
    try {
      // Note: Make sure your backend route handles 'all' or matches this path
      const res = await api.get('/attendance/class/all'); 
      set({ classRecords: res.data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({ loading: false });
    }
  },

  markAttendance: async (studentId: number, date: string, status: string) => {
    try {
      // Fixed: TypeScript now knows 'api.post' takes these arguments
      await api.post('/attendance/mark', { 
        student_id: studentId, 
        date, 
        status 
      });
      
      // Update local state so UI changes immediately
      const { classRecords } = get();
      const updated = classRecords.map((s) => 
        s.student_id === studentId ? { ...s, status, date } : s
      );
      
      set({ classRecords: updated });
    } catch (error) {
      console.error("Failed to mark attendance", error);
      throw error; // Rethrow so the component can show a toast error
    }
  },

  fetchStudentAttendance: async (userId: number) => {
    set({ loading: true });
    try {
      const res = await api.get(`/attendance/student/${userId}`);
      set({ records: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));