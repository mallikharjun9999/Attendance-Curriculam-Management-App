const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{

  const {name,email,password,role} = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  db.run(
    `INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)`,
    [name,email,hashedPassword,role],
    function(err){

      if(err){
        return res.status(400).json({error:err.message});
      }

      const userId = this.lastID;

      // If student -> insert into students table
      if(role === "student"){

        db.run(
          `INSERT INTO students(user_id,roll_number,class,section)
           VALUES(?,?,?,?)`,
          [userId,"","", ""]
        );

      }

      res.json({
        message:"User registered",
        userId:userId
      });

    }
  );

};


exports.login = (req,res)=>{

  const {email,password} = req.body;

  db.get(`SELECT * FROM users WHERE email=?`,[email],async (err,user)=>{

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const valid = await bcrypt.compare(password,user.password);

    if(!valid){
      return res.status(401).json({message:"Invalid password"});
    }

    const token = jwt.sign(
      {id:user.id,role:user.role},
      "secretkey"
    );

    res.json({
      token,
      user
    });

  });

};


exports.profile = (req,res)=>{

  db.get(
    `SELECT id,name,email,role FROM users WHERE id=?`,
    [req.user.id],
    (err,user)=>{
      res.json(user);
    }
  );

};