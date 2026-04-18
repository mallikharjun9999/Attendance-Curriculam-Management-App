import { Badge } from '@/components/ui/badge';

interface AttendanceRecord {
  id: number;
  student_id: number;
  date: string;
  status: string;
  name?: string;
  roll_number?: string;
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
  showStudent?: boolean;
}

const statusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'present':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">Present</span>;
    case 'absent':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-destructive/10 text-destructive">Absent</span>;
    case 'late':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning/10 text-warning">Late</span>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const AttendanceTable = ({ records, showStudent = false }: AttendanceTableProps) => {
  if (records.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No attendance records found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
            {showStudent && <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>}
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b border-border last:border-0">
              <td className="py-3 px-4 font-mono text-foreground">{record.date}</td>
              {showStudent && <td className="py-3 px-4 text-foreground">{record.name || `ID: ${record.student_id}`}</td>}
              <td className="py-3 px-4">{statusBadge(record.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
