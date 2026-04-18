import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAttendanceStore } from '@/store/attendanceStore';
import { useActivityStore } from '@/store/activityStore';
import { useStudentStore } from '@/store/studentStore';
import DashboardCard from '@/components/DashboardCard';
import AttendanceTable from '@/components/AttendanceTable';
import ActivityCard from '@/components/ActivityCard';
import { Link } from 'react-router-dom';
import { Users, CalendarCheck, BookOpen, Percent, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { records, fetchStudentAttendance } = useAttendanceStore();
  const { activities, joinedActivities, fetchActivities, fetchJoinedActivities } = useActivityStore();
  const { students, fetchStudents } = useStudentStore();

  useEffect(() => {
    if (!user) return;
    fetchActivities();
    if (user.role === 'student') {
      fetchStudentAttendance(user.id);
      fetchJoinedActivities(user.id);
    } else {
      fetchStudents();
    }
  }, [user]);

  if (!user) return null;

  const attendancePercent = records.length
    ? Math.round((records.filter((r) => r.status === 'present').length / records.length) * 100)
    : 0;

  if (user.role === 'student') {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Attendance" value={`${attendancePercent}%`} icon={<Percent className="h-5 w-5" />} variant="success" subtitle="Overall percentage" />
          <DashboardCard title="Total Records" value={records.length} icon={<CalendarCheck className="h-5 w-5" />} />
          <DashboardCard title="Activities" value={activities.length} icon={<BookOpen className="h-5 w-5" />} subtitle="Available" />
          <DashboardCard title="Joined" value={joinedActivities.length} icon={<BookOpen className="h-5 w-5" />} variant="warning" subtitle="Activities joined" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-border">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Recent Attendance</h2>
              <Link to="/attendance" className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <AttendanceTable records={records.slice(0, 5)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Available Activities</h2>
              <Link to="/activities" className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <div className="space-y-3">
              {activities.slice(0, 3).map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
              {activities.length === 0 && <p className="text-sm text-muted-foreground">No activities available.</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Teacher dashboard
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Students" value={students.length} icon={<Users className="h-5 w-5" />} />
        <DashboardCard title="Activities" value={activities.length} icon={<BookOpen className="h-5 w-5" />} subtitle="Created" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/attendance/mark" className="bg-card rounded-lg border border-border p-5 hover:border-primary transition-colors">
          <h3 className="font-semibold text-foreground text-sm">Mark Attendance</h3>
          <p className="text-xs text-muted-foreground mt-1">Record today's attendance for your class</p>
        </Link>
        <Link to="/activities/create" className="bg-card rounded-lg border border-border p-5 hover:border-primary transition-colors">
          <h3 className="font-semibold text-foreground text-sm">Create Activity</h3>
          <p className="text-xs text-muted-foreground mt-1">Add a new curriculum activity</p>
        </Link>
        <Link to="/attendance/class" className="bg-card rounded-lg border border-border p-5 hover:border-primary transition-colors">
          <h3 className="font-semibold text-foreground text-sm">Class Attendance</h3>
          <p className="text-xs text-muted-foreground mt-1">View attendance records by class</p>
        </Link>
        <Link to="/students" className="bg-card rounded-lg border border-border p-5 hover:border-primary transition-colors">
          <h3 className="font-semibold text-foreground text-sm">Student List</h3>
          <p className="text-xs text-muted-foreground mt-1">View all registered students</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
