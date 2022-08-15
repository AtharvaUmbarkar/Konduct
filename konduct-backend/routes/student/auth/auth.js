const express = require('express');
const Student = require("../../../models/Student");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fu = require('../../../middleware/fetch_user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


//* Route 1: Create a student. POST "/api/student/auth/create". Login NOT Required.

router.post("/create", [
  body('name', "enter a valid name").isLength({ min: 5 }),
  body('roll_number', "enter a valid roll number").isLength({ min: 5 }),
  body('email', "enter a valid email").isEmail(),
  body('password', "enter a valid password").isLength({ min: 8 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    let student = await Student.findOne({ roll_number: req.body.roll_number });
    if (student) return res.status(400).json({ success, errors: "This student is already registered" });

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    student = await Student.create({
      name: req.body.name,
      email: req.body.email,
      roll_number: req.body.roll_number,
      program: req.body.program,
      department: req.body.department,
      password: secPassword,
    })

    const data = {
      student: {
        id: student.roll_number,
      },
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;

    res.send({ success, authToken, name: student.name, id: student.roll_number });
    console.log(authToken);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 2: Login student. POST "/api/student/auth/login" Login NOT Required.

router.post("/login", async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }

  const roll_number = req.body.roll_number;
  const password = req.body.password;

  try {
    let student = await Student.findOne({ roll_number: roll_number });
    if (!student) return res.status(400).json({ success, errors: "Please login with correct credentials" });
    const comparePassword = await bcrypt.compare(password, student.password);
    if (!comparePassword) return res.status(400).json({ success, errors: "Please login with correct credentials" });

    const data = {
      user: {
        id: student.roll_number,
      }
    }
    success = true;
    const authToken = jwt.sign(data, JWT_SECRET);
    res.send({ success, authToken, name: student.name, id: student.roll_number });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

//* Route 3: Get student details. POST "/api/student/auth/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const studentId = req.user;
    const student = await Student.find({ roll_number: studentId }).select("-password");
    res.json(student);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

