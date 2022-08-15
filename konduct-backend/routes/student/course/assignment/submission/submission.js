const express = require('express');
const router = express.Router();
const fu = require('../../../../../middleware/fetch_user');
const Student = require('../../../../../models/Student');
const Course = require('../../../../../models/Course');
const Assignment = require('../../../../../models/Assignment');
const Submission = require('../../../../../models/Submission');
const _ = require('lodash');

//* Route 1: Get submissions. POST "/api/student/course/assignment/submission/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const student_id = req.user;
    const course_id = req.body.course_id;
    const assignment_name = req.body.assignment_name;

    const course = await Course.find({ students: student_id, id: course_id });
    if (_.isEmpty(course)) {
      res.status(500).send("course not taken by this student");
      return;
    }
    const assignment = await Assignment.find({ course_id: course_id, name: assignment_name })
    if (_.isEmpty(assignment)) {
      res.status(500).send("assignment does not exist");
      return;
    }
    const submissions = await Submission.find({ assignment_name: assignment_name, course_id: course_id, "student.id": student_id });
    res.json({ submissions: submissions });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 2: Add submission. POST "/api/instructor/course/submission/add". Login Required.

router.post("/add", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const student_id = req.user;
    const course_id = req.body.course_id;
    const assignment_name = req.body.assignment_name;
    const answer = req.body.answer;

    const student = (await Student.find({ roll_number: student_id }))[0];
    const course = await Course.find({ students: student_id, id: course_id });
    if (!course) {
      res.status(500).send({ success, error: "course not taken by this student" });
      return;
    }
    const assignment = await Assignment.find({ course_id: course_id, name: assignment_name })
    if (_.isEmpty(assignment)) {
      res.status(500).send({ success, error: "assignment does not exist" });
      return;
    }

    try {
      const new_submission = await Submission.create({
        assignment_name: assignment_name,
        course_id: course_id,
        student: {
          id: student_id,
          name: student.name,
          email: student.email,
        },
        answer: answer,
        total_marks: assignment.total_marks,
      })
      success = true;
      res.json({ success, new_submission });
    }
    catch (error) {
      res.status(500).send({ success, error });
    }

  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ success, error: "Internal Server Error" });
  }
});

//* Route 3: Delete submission. DELETE "/api/instructor/course/submission/delete". Login Required.

router.delete("/delete", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const student_id = req.user;
    const assignment_name = req.body.assignment_name;
    const course_id = req.body.course_id;
    const submission_id = req.body._id;

    const submission = await Submission.findById(submission_id);

    if (submission.student.id != student_id ||
      submission.assignment_name != assignment_name ||
      submission.course_id != course_id) {
      res.status(500).send({ success, error: "unauthorized access, can not delete submission" });
      return;
    }

    try {
      const deleted_submission = await Submission.findByIdAndDelete(submission_id);
      success = true;
      res.json({ success, deleted_submission });
    }
    catch (error) {
      res.status(500).send({ success, error });
    }

  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 4: Get Grades. POST "/api/student/course/assignment/submission/get_grades". Login Required.

router.post("/get_grades", fu.fetchUser, async (req, res) => {
  try {
    const student_id = req.user;
    const course_id = req.body.course_id;

    const course = await Course.find({ students: student_id, id: course_id });
    if (_.isEmpty(course)) {
      res.status(500).send("course not taken by this student");
      return;
    }
    const assignments = await Assignment.find({ course_id: course_id }).select({ name: 1, total_marks: 1 })

    const submissionPromises = assignments.map((assignment, index) => {
      return Submission.findOne({ assignment_name: assignment.name, course_id: course_id, "student.id": student_id }).sort({ date: -1 }).select({ marks: 1, total_marks: 1, date: 1 });
    })

    const submissions = await Promise.all(submissionPromises);

    const grades = assignments.map((assignment, index) => {
      return ({
        name: assignment.name,
        total_marks: assignment.total_marks,
        marks: submissions[index] ? (submissions[index].marks ? submissions[index].marks : 'not graded') : 'not submitted',
      })
    })
    res.json(grades);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;