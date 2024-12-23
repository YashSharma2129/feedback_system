const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  ratings: [
    {
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackQuestion' },
      rating: { type: Number, min: 1, max: 5 }
    }
  ],
  submitted_at: { type: Date, default: Date.now },
  create_datetime: { type: Date, default: Date.now },
  ip: { type: String },
  browser: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  is_disabled: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
