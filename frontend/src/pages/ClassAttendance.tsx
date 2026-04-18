import { useState } from 'react';
import { useAttendanceStore } from '@/store/attendanceStore';
import AttendanceTable from '@/components/AttendanceTable';
import { Search } from 'lucide-react';

const ClassAttendance = () => {
  const [className, setClassName] = useState('');
  const { classRecords, loading, fetchClassAttendance } = useAttendanceStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (className.trim()) fetchClassAttendance(className.trim());
  };

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-foreground">Class Attendance</h1>
      <form onSubmit={handleSearch} className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Enter class (e.g. 10)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring w-48"
        />
        <button
          type="submit"
          className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </form>
      <div className="bg-card rounded-lg border border-border">
        {loading ? (
          <p className="text-sm text-muted-foreground p-6 text-center">Loading...</p>
        ) : (
          <AttendanceTable records={classRecords} showStudent />
        )}
      </div>
    </div>
  );
};

export default ClassAttendance;
