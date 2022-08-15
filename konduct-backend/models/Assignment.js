const mongoose = require('mongoose');
const { Schema } = mongoose;

const AssignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    default: "",
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

AssignmentSchema.index({ name: 1, course_id: 1 }, { unique: true });

const Assignment = mongoose.model("assignment", AssignmentSchema);

module.exports = Assignment;