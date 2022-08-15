const express = require('express');
const router = express.Router();
const fu = require('../../../../middleware/fetch_user');
const Course = require('../../../../models/Course');
const Assignment = require('../../../../models/Assignment');
const _ = require('lodash');

//* Route 1: Get assignments. POST "/api/instructor/course/assignment/get". Login Required.

router.post("/get", fu.fetchUser, async (req, res) => {
  try {
    const instructorId = req.user;
    const courseId = req.body.id;
    const course = await Course.find({ offered_by: instructorId, id: courseId });
    if (_.isEmpty(course)) {
      res.status(500).send("course not offered by this Instructor");
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

//* Route 2: Add assignment. POST "/api/instructor/course/assignment/add". Login Required.

router.post("/add", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const instructorId = req.user;
    const name = req.body.name;
    const course_id = req.body.course_id;
    const instructions = req.body.instructions;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const total_marks = req.body.total_marks;

    const course = await Course.find({ offered_by: instructorId, id: course_id });
    if (!course) {
      res.status(500).send({ success, error: "course not offered by this instructor, can't add assignment" });
      return;
    }
    const assignment = await Assignment.find({ course_id: course_id, name: name })
    if (!(_.isEmpty(assignment))) {
      res.status(500).send({ success, error: "assignment already exist in this course, please use a different name" });
      return;
    }

    try {
      const new_assignment = await Assignment.create({
        name: name,
        course_id: course_id,
        instructions: instructions,
        start_date: start_date,
        end_date: end_date,
        total_marks: total_marks,
      })
      success = true;
      res.json({ success, new_assignment });
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

//* Route 3: Delete assignment. DELETE "/api/instructor/course/assignment/delete". Login Required.

router.delete("/delete", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const instructorId = req.user;
    const name = req.body.name;
    const course_id = req.body.course_id;

    const course = await Course.find({ offered_by: instructorId, id: course_id });
    if (!course) {
      res.status(500).send({ success, error: "course not offered by this instructor, can't delete assignment" });
      return;
    }
    const assignment = await Assignment.find({ course_id: course_id, name: name })
    if (_.isEmpty(assignment)) {
      res.status(500).send({ success, error: "assignment does not exist" });
      return;
    }

    try {
      const deleted_assignment = await Assignment.findOneAndDelete({ name: name, course_id: course_id });
      success = true;
      res.json({ success, deleted_assignment });
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

//* Route 4: Update assignment. PUT "/api/instructor/course/assignment/update". Login Required.

router.put("/update", fu.fetchUser, async (req, res) => {
  let success = false;
  try {
    const instructorId = req.user;
    const name = req.body.name;
    const course_id = req.body.course_id;
    const instructions = req.body.instructions;
    // const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const total_marks = req.body.total_marks;

    const course = await Course.find({ offered_by: instructorId, id: course_id });
    if (!course) {
      res.status(500).send({ success, error: "course not offered by this instructor, can't add assignment" });
      return;
    }
    const assignment = await Assignment.find({ course_id: course_id, name: name })
    if (_.isEmpty(assignment)) {
      res.status(500).send({ success, error: "assignment does not exist" });
      return;
    }

    try {
      const updated_assignment = await Assignment.findOneAndUpdate(
        { name: name, course_id: course_id },
        { instructions: instructions, end_date: end_date, total_marks: total_marks },
        { new: true },
      )
      success = true
      res.json({ success, updated_assignment });
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

module.exports = router;