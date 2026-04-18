const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");

router.get("/",auth,controller.getStudents);
router.get("/:id",auth,controller.getStudentById);

module.exports = router;