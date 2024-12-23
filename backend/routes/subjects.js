const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

router.get("/", async (req, res) => {
  try {
    const { branch, year } = req.query;
    const subjects = await Subject.find({ branch, year }).populate(
      "facultyMembers",
      "name"
    );
    res.json(subjects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subjects", error: error.message });
  }
});

module.exports = router;
