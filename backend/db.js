const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Database connected");
  }
});

module.exports = db;