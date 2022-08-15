const express = require('express');
const Instructor = require("../../../models/Instructor");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fu = require('../../../middleware/fetch_user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


//* Route 1: Create a instructor. POST "/api/instructor/auth/create". Login NOT Required.

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
    let instructor = await Instructor.findOne({ roll_number: req.body.roll_number });
    if (instructor) return res.status(400).json({ success, errors: "This instructor is already registered" });

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    instructor = await Instructor.create({
      name: req.body.name,
      email: req.body.email,
      roll_number: req.body.roll_number,
      department: req.body.department,
      password: secPassword,
    })

    const data = {
      instructor: {
        id: instructor.roll_number,
      },
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;

    res.send({ success, authToken, name: instructor.name, id: instructor.roll_number });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 2: Login instructor. POST "/api/instructor/auth/login" Login NOT Required.

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
    let instructor = await Instructor.findOne({ roll_number: roll_number });
    if (!instructor) return res.status(400).json({ success, errors: "Please login with correct credentials" });
    const comparePassword = await bcrypt.compare(password, instructor.password);
    if (!comparePassword) return res.status(400).json({ success, errors: "Please login with correct credentials" });

    const data = {
      user: {
        id: instructor.roll_number,
      }
    }
    success = true;
    const authToken = jwt.sign(data, JWT_SECRET);
    res.send({ success, authToken, name: instructor.name, id: instructor.roll_number });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

//* Route 3: Get instructor details. POST "/api/instructor/auth/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const instructorId = req.user;
    const instructor = await Instructor.find({ roll_number: instructorId }).select("-password");
    res.json(instructor);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
