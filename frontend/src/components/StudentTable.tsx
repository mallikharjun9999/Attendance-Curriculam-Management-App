interface Student {
  id: number;
  name: string;
  roll_number: string;
  class: string;
}

interface StudentTableProps {
  students: Student[];
}

const StudentTable = ({ students }: StudentTableProps) => {
  if (students.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No students found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Roll No.</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Class</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b border-border last:border-0">
              <td className="py-3 px-4 font-mono text-foreground">{s.roll_number}</td>
              <td className="py-3 px-4 text-foreground">{s.name}</td>
              <td className="py-3 px-4 font-mono text-foreground">{s.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
