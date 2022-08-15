const express = require('express');
const router = express.Router();
const fu = require('../../../../../middleware/fetch_user');
const Student = require('../../../../../models/Student');
const Course = require('../../../../../models/Course');
const Assignment = require('../../../../../models/Assignment');
const Submission = require('../../../../../models/Submission');
const _ = require('lodash');

//* Route 1: Get submissions. POST "/api/instructor/course/assignment/submission/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const instructor_id = req.user;
    const course_id = req.body.course_id;
    const assignment_name = req.body.assignment_name;

    const course = await Course.findOne({ offered_by: instructor_id, id: course_id });
    if (_.isEmpty(course)) {
      res.status(500).send("course not offered by this instructor");
      return;
    }
    const assignment = await Assignment.findOne({ course_id: course_id, name: assignment_name })
    if (_.isEmpty(assignment)) {
      res.status(500).send("assignment does not exist");
      return;
    }
    const submissionsPromises = course.students.map((student, index) => {
      return Submission.findOne({ assignment_name: assignment_name, course_id: course_id, "student.id": student }).sort({ date: -1 });
    })

    const submissions = await Promise.all(submissionsPromises);
    let filtered_submissions = submissions.filter((submission) => {
      return submission != null;
    })

    filtered_submissions = _.orderBy(filtered_submissions, "student.id", 'desc')

    res.json({ submissions: filtered_submissions, total_marks: assignment.total_marks });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 2: Grade submissions. PUT "/api/instructor/course/assignment/submission/grade". Login Required.

router.put("/grade", fu.fetchUser, async (req, res) => {
  try {
    const instructor_id = req.user;
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;
    const assignment_name = req.body.assignment_name;
    const submission_id = req.body.submission_id;
    const marks = req.body.marks;

    const course = await Course.findOne({ offered_by: instructor_id, id: course_id });
    if (_.isEmpty(course)) {
      res.status(500).send("course not offered by this instructor");
      return;
    }
    const assignment = await Assignment.findOne({ course_id: course_id, name: assignment_name })
    if (_.isEmpty(assignment)) {
      res.status(500).send("assignment does not exist");
      return;
    }
    const submission = await Submission.findByIdAndUpdate(submission_id, { marks: marks }, { new: true });

    res.json(submission);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;