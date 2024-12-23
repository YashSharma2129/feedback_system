const mongoose = require("mongoose");

const faculty = new mongoose.Schema({
  name: { type: String, required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  section: { type: String },
  branch: { type: String },
  year: { type: String },
  create_datetime: { type: Date, default: Date.now },
  ip: { type: String },
  browser: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to Admin
  is_disable: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Faculty", faculty);
