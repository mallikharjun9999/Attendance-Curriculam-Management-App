const db = require("./db");

db.serialize(() => {

  db.run(`
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    roll_number TEXT,
    class TEXT,
    section TEXT
  )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS attendance(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    date TEXT,
    status TEXT,
    marked_by INTEGER
  )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS activities(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    activity_date TEXT,
    created_by INTEGER
  )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS activity_participants(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activity_id INTEGER,
    student_id INTEGER,
    status TEXT
  )
  `);

});

console.log("Database tables created");