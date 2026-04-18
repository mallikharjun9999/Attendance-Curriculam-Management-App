import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAttendanceStore } from '@/store/attendanceStore';
import AttendanceTable from '@/components/AttendanceTable';

const AttendanceHistory = () => {
  const { user } = useAuthStore();
  const { records, loading, fetchStudentAttendance } = useAttendanceStore();

  useEffect(() => {
    if (user) fetchStudentAttendance(user.id);
  }, [user]);

  const present = records.filter((r) => r.status === 'present').length;
  const absent = records.filter((r) => r.status === 'absent').length;
  const late = records.filter((r) => r.status === 'late').length;

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-foreground">Attendance History</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold font-mono text-success">{present}</p>
          <p className="text-xs text-muted-foreground mt-1">Present</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold font-mono text-destructive">{absent}</p>
          <p className="text-xs text-muted-foreground mt-1">Absent</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold font-mono text-warning">{late}</p>
          <p className="text-xs text-muted-foreground mt-1">Late</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border">
        {loading ? (
          <p className="text-sm text-muted-foreground p-6 text-center">Loading...</p>
        ) : (
          <AttendanceTable records={records} />
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;
