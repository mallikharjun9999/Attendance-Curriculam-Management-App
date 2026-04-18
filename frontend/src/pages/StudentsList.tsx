import { useEffect } from 'react';
import { useStudentStore } from '@/store/studentStore';
import StudentTable from '@/components/StudentTable';

const StudentsList = () => {
  const { students, loading, fetchStudents } = useStudentStore();

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-foreground">Students</h1>
      <div className="bg-card rounded-lg border border-border">
        {loading ? (
          <p className="text-sm text-muted-foreground p-6 text-center">Loading...</p>
        ) : (
          <StudentTable students={students} />
        )}
      </div>
    </div>
  );
};

export default StudentsList;
