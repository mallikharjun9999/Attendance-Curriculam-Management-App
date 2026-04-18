const express = require("express");
const router = express.Router();
const controller = require("../controllers/activityController");
const auth = require("../middleware/authMiddleware");

router.post("/",auth,controller.createActivity);
router.get("/",auth,controller.getActivities);
router.post("/join",auth,controller.joinActivity);
router.get("/student/:id",auth,controller.getStudentActivities);

module.exports = router;