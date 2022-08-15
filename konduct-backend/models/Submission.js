const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  assignment_name: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
  student: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  answer: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
  },
  marks: {
    type: Number,
  },
  total_marks: {
    type: Number,
  },
  files: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("submission", SubmissionSchema);

module.exports = Submission;