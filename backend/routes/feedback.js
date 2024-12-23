const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
  try {
    const { student_id, subject_id, teacher_id, ratings } = req.body;

    // Validate required fields
    if (
      !student_id ||
      !subject_id ||
      !teacher_id ||
      !ratings ||
      !ratings.length
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate ratings
    const isValidRatings = ratings.every(
      (rating) => rating.rating >= 1 && rating.rating <= 5 && rating.question_id
    );

    if (!isValidRatings) {
      return res.status(400).json({ message: "Invalid ratings" });
    }

    // Create new feedback
    const feedback = new Feedback({
      student_id,
      subject_id,
      teacher_id,
      ratings,
      ip: req.ip,
      browser: req.headers["user-agent"],
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res
      .status(500)
      .json({ message: "Error submitting feedback", error: error.message });
  }
});

module.exports = router;
