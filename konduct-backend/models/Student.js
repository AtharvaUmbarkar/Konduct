const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
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
  program: {
    type: String,
    required: true,
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
    default: 'student',
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;