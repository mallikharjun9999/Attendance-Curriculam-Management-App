const db = require("../db");

// 1. MARK ATTENDANCE (POST /mark)
// Handles both initial marking (INSERT) and corrections (UPDATE)
exports.markAttendance = (req, res) => {
  const { student_id, date, status } = req.body;
  const teacherId = req.user.id;

  if (!student_id || !date || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.get(
    `SELECT id FROM attendance WHERE student_id = ? AND date = ?`,
    [student_id, date],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row) {
        // Update existing record
        db.run(
          `UPDATE attendance SET status = ?, marked_by = ? WHERE id = ?`,
          [status, teacherId, row.id],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Attendance updated successfully" });
          }
        );
      } else {
        // Create new record
        db.run(
          `INSERT INTO attendance (student_id, date, status, marked_by) VALUES (?, ?, ?, ?)`,
          [student_id, date, status, teacherId],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Attendance marked successfully" });
          }
        );
      }
    }
  );
};

// 2. STUDENT ATTENDANCE HISTORY (GET /student/:id)
// Fetches detailed history for a specific user
exports.getStudentAttendance = (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT a.id, a.date, a.status
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE s.user_id = ?
    ORDER BY a.date DESC
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// 3. STUDENT ATTENDANCE SUMMARY (GET /student-summary/:id)
// Provides counts for the dashboard cards
exports.getStudentAttendanceSummary = (req, res) => {
  const studentId = req.params.id;

  db.get(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status='present' THEN 1 ELSE 0 END) as present,
      SUM(CASE WHEN status='absent' THEN 1 ELSE 0 END) as absent,
      SUM(CASE WHEN status='late' THEN 1 ELSE 0 END) as late
    FROM attendance
    WHERE student_id=?`,
  [studentId],
  (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    // Ensure we return zeros instead of null if no records exist
    res.json(row.total > 0 ? row : { total: 0, present: 0, absent: 0, late: 0 });
  });
};

// 4. CLASS ATTENDANCE (GET /class/:class)
// Shows the status for an entire class for the current day
// GET ALL STUDENTS WITH TODAY'S STATUS
// GET ALL STUDENTS WITH TODAY'S STATUS
exports.getClassAttendance = (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  // We perform a LEFT JOIN so students with no record today still appear
  db.all(`
    SELECT 
      s.id as student_id, 
      u.name, 
      s.roll_number,
      s.class,
      a.status, 
      a.date
    FROM students s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN attendance a ON s.id = a.student_id AND a.date = ?
    ORDER BY u.name ASC`,
    [today], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
  });
};

// 5. TEACHER VIEW STATS (GET /stats)
// Aggregated stats for all students in the teacher's view
exports.getStudentsAttendanceStats = (req, res) => {
  db.all(`
    SELECT
      s.id as student_id,
      u.name,
      s.roll_number,
      s.class,
      SUM(CASE WHEN a.status='present' THEN 1 ELSE 0 END) as present,
      SUM(CASE WHEN a.status='absent' THEN 1 ELSE 0 END) as absent,
      SUM(CASE WHEN a.status='late' THEN 1 ELSE 0 END) as late
    FROM students s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN attendance a ON s.id = a.student_id
    GROUP BY s.id`,
  (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};