const express = require("express");
const router = express.Router();
const Job = require("../models/Jobs");

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find(); // Adjust if you need specific fields
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    requirements,
    location,
    company,
    salaryRange,
    jobType,
    postedBy,
  } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      requirements,
      location,
      company,
      salaryRange,
      jobType,
      postedBy,
    });

    const savedJob = await newJob.save();
    return res
      .status(201)
      .json({ message: "Job posted successfully.", job: savedJob });
  } catch (error) {
    console.error(`Error posting job: ${error}`);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
