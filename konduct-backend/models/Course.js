const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  offered_by: {
    type: String,
  },
  is_offered: {
    type: Boolean,
    default: false,
  },
  students_enrolled: {
    type: Number,
  },
  department: {
    type: String,
  },
  students: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("course", CourseSchema);

module.exports = Course;