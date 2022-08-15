const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fu = require('../../../middleware/fetch_user');
const Course = require('../../../models/Course');
const Instructor = require('../../../models/Instructor');
const Student = require('../../../models/Student');

//* Route 1: Get instructor courses. POST "/api/instructor/course/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const instructorId = req.user;
    const instructor_courses = await Course.find({ offered_by: instructorId });
    res.json(instructor_courses);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 2: Get available courses. POST "/api/instructor/course/get_available". Login Required.

router.post("/get_available", fu.fetchUser, async (req, res) => {
  try {
    const instructorId = req.user;
    const available_courses = await Course.find({ $and: [{ offered_by: { $ne: instructorId } }, { is_offered: false }] });
    res.json(available_courses);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 3: Add course. PUT "/api/instructor/course/add". Login Required.

router.put("/add", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const instructorId = req.user;
    const course_id = req.body.id;
    const course = await Course.find({ id: course_id });
    if (course[0].is_offered === true) { res.status(400).send("Course already offered by another instructor"); return; };
    const response = await Course.findOneAndUpdate({ id: course_id }, { is_offered: true, offered_by: instructorId }, { new: true })
    success = true;
    res.json({ success, response });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error" });
  }
});

//* Route 4: Remove course. PUT "/api/instructor/course/remove". Login Required.

router.put("/remove", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const instructorId = req.user;
    const course_id = req.body.id;
    const course = await Course.find({ id: course_id });
    if (course[0].offered_by !== instructorId) { res.status(400).send("Course not offered by you"); return; };
    const response = await Course.findOneAndUpdate({ id: course_id }, { is_offered: false, offered_by: '' }, { new: true })
    success = true;
    res.json({ success, response });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error" });
  }
});

//* Route 5: Get course data. POST "/api/instructor/course/get_course_data". Login Required.

router.post("/get_course_data", fu.fetchUser, async (req, res) => {
  try {
    // const instructorId = req.user;
    const course_id = req.body.id;
    const course = await Course.find({ id: course_id });
    const instructor = await Instructor.find({ roll_number: course[0].offered_by }).select("-password");;
    const students = await Student.find({ roll_number: course[0].students }).select("-password");
    res.json({ course, instructor, students });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;