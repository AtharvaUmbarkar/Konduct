const mongoose = require('mongoose');
const { Schema } = mongoose;

const InstructorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roll_number: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'instructor',
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Instructor = mongoose.model("instructor", InstructorSchema);

module.exports = Instructor;