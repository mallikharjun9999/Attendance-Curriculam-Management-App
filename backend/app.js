const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const activityRoutes = require("./routes/activityRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth",authRoutes);
app.use("/students",studentRoutes);
app.use("/attendance",attendanceRoutes);
app.use("/activities",activityRoutes);

module.exports = app;