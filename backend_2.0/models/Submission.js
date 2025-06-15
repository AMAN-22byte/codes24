// models/Submission.js
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  code: { type: String, required: true },
  language: { type: String, required: true },
  verdict: { type: String, required: true },
  results: [
    {
      testCase: Number,
      input: String,
      expected: String,
      actual: String,
      passed: Boolean
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);
