import { useEffect, useState } from 'react';
import { useAttendanceStore } from '@/store/attendanceStore';
import { toast } from 'sonner';
import { Check, X, Clock } from 'lucide-react';

const MarkAttendance = () => {
  const { classRecords, fetchClassAttendance, markAttendance, loading } = useAttendanceStore();
  const [selectedClass, setSelectedClass] = useState('10A'); // Default class
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchClassAttendance();
  }, [selectedClass]);

  const handleMark = async (studentId: number, status: string) => {
    try {
      await markAttendance(studentId, today, status);
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Mark Attendance</h1>
        <select 
          className="bg-background border rounded px-2 py-1 text-sm"
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="10A">Class 10A</option>
          <option value="10B">Class 10B</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classRecords.map((s) => (
          <div key={s.student_id} className={`p-4 border rounded-lg transition-colors ${s.status ? 'bg-muted/50' : 'bg-card'}`}>
            <div className="mb-4">
              <p className="font-bold">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.roll_number}</p>
            </div>
            <div className="flex gap-2">
              <AttendanceButton 
                active={s.status === 'present'} 
                icon={<Check size={14}/>} 
                label="Present" 
                color="bg-success" 
                onClick={() => handleMark(s.student_id, 'present')} 
              />
              <AttendanceButton 
                active={s.status === 'absent'} 
                icon={<X size={14}/>} 
                label="Absent" 
                color="bg-destructive" 
                onClick={() => handleMark(s.student_id, 'absent')} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AttendanceButton = ({ active, icon, label, color, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-xs font-medium transition-all
      ${active ? `${color} text-white ring-2 ring-offset-2 ring-opacity-50` : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
  >
    {icon} {label}
  </button>
);

export default MarkAttendance;