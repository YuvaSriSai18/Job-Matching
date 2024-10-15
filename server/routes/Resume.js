const express = require("express");
const router = express.Router();

const Resume = require("../models/Resume");

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const UserResume = await Resume.findOne({
      "personalInformation.email": email,
    });

    if (!UserResume) {
      return res
        .status(404)
        .json({ message: "Resume not found for this email" });
    }

    return res.status(200).json({ msg: "Resume found", resume: UserResume });
  } catch (error) {
    console.log(`Server error: ${error}`);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
