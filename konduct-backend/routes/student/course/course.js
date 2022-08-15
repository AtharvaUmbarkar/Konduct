const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fu = require('../../../middleware/fetch_user');
const Course = require('../../../models/Course');
const Instructor = require('../../../models/Instructor');
const Student = require('../../../models/Student');

//* Route 1: Get student courses. POST "/api/student/course/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const studentId = req.user;
    const student_courses = await Course.find({ students: studentId });
    res.json(student_courses);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 2: Get available courses. POST "/api/student/course/get_available". Login Required.

router.post("/get_available", fu.fetchUser, async (req, res) => {
  try {
    const studentId = req.user;
    const available_courses = await Course.find({ $and: [{ students: { $ne: studentId } }, { is_offered: true }] });
    res.json(available_courses);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 3: Add course. PUT "/api/student/course/add". Login Required.

router.put("/add", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const studentId = req.user;
    const course_id = req.body.id;
    const course = await Course.find({ id: course_id });
    if (course[0].students.find((student) => student === studentId)) { res.status(400).send("Course already taken by you"); return; };
    const response = await Course.findOneAndUpdate({ id: course_id }, { students: course[0].students.concat(studentId), students_enrolled: course[0].students_enrolled + 1 }, { new: true })
    success = true;
    res.json({ success, response });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error" });
  }
});

//* Route 4: Remove course. PUT "/api/student/course/remove". Login Required.

router.put("/remove", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const studentId = req.user;
    const course_id = req.body.id;
    const course = await Course.find({ id: course_id });
    if (!(course[0].students.find((student) => student === studentId))) { res.status(400).send("Course not taken by you"); return; };
    const response = await Course.findOneAndUpdate({ id: course_id }, { students: course[0].students.filter((student) => student != studentId), students_enrolled: course[0].students_enrolled - 1 }, { new: true })
    success = true;
    res.json({ success, response });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error" });
  }
});

//* Route 5: Get course data. POST "/api/student/course/get_course_data". Login Required.

router.post("/get_course_data", fu.fetchUser, async (req, res) => {
  try {
    // const studentId = req.user;
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