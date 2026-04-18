const express = require("express");
const router = express.Router();

const controller = require("../controllers/attendanceController");
const auth = require("../middleware/authMiddleware");

router.post("/mark",auth,controller.markAttendance);

router.get("/student/:id",auth,controller.getStudentAttendance);

router.get("/student-summary/:id",auth,controller.getStudentAttendanceSummary);

router.get("/class/:class",auth,controller.getClassAttendance);

router.get("/stats",auth,controller.getStudentsAttendanceStats);

module.exports = router;