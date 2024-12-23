const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["main", "elective"], required: true },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: "Year" }, // You can have Year model for handling years like '1st Year'
  create_datetime: { type: Date, default: Date.now },
  ip: { type: String },
  browser: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the Admin creating the subject
  is_disable: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Subject", subjectSchema);
