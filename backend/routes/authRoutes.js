const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const middleware = require("../middleware/authMiddleware");

router.post("/register",auth.register);
router.post("/login",auth.login);
router.get("/profile",middleware,auth.profile);

module.exports = router;