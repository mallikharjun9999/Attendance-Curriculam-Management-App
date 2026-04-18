const db = require("../db");

exports.getStudents = (req,res)=>{

  db.all(`
  SELECT students.id,users.name,students.roll_number,students.class
  FROM students
  JOIN users ON students.user_id = users.id
  `,(err,rows)=>{

    res.json(rows);

  });

};


exports.getStudentById = (req,res)=>{

  const id = req.params.id;

  db.get(`
  SELECT students.id,users.name,students.roll_number,students.class
  FROM students
  JOIN users ON students.user_id = users.id
  WHERE students.id=?
  `,[id],(err,row)=>{

    res.json(row);

  });

};