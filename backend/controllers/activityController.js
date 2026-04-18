const db = require("../db");

exports.createActivity = (req,res)=>{

  const {title,description,activity_date} = req.body;

  const teacherId = req.user.id;

  db.run(`
  INSERT INTO activities(title,description,activity_date,created_by)
  VALUES(?,?,?,?)
  `,
  [title,description,activity_date,teacherId],
  function(err){

    res.json({
      message:"Activity created",
      activityId:this.lastID
    });

  });

};


exports.getActivities = (req,res)=>{

  db.all(`SELECT * FROM activities`,(err,rows)=>{
    res.json(rows);
  });

};


exports.joinActivity = (req,res)=>{

  const {activity_id,student_id} = req.body;

  db.run(`
  INSERT INTO activity_participants(activity_id,student_id,status)
  VALUES(?,?,?)
  `,
  [activity_id,student_id,"joined"],
  function(err){

    res.json({
      message:"Joined activity"
    });

  });

};


exports.getStudentActivities = (req,res)=>{

  const id = req.params.id;

  db.all(`
  SELECT activities.title,activities.activity_date
  FROM activity_participants
  JOIN activities
  ON activity_participants.activity_id = activities.id
  WHERE activity_participants.student_id=?
  `,
  [id],
  (err,rows)=>{
    res.json(rows);
  });

};