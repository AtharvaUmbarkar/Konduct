const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fu = require('../../../../middleware/fetch_user');
const Course = require('../../../../models/Course');
const Assignment = require('../../../../models/Assignment');
const _ = require('lodash');

//* Route 1: Get assignments. POST "/api/student/course/assignment/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const studentId = req.user;
    const courseId = req.body.id;
    const course = await Course.find({ students: studentId, id: courseId });
    if (_.isEmpty(course)) {
      res.status(500).send("Course not taken by this student");
      return;
    }
    const assignments = await Assignment.find({ course_id: course[0].id })
    res.json(assignments);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;