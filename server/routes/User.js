const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Resume = require("../models/Resume");

router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "User found", user: user });
  } catch (error) {
    res.status(500).json({ msg: "Error occurred in finding user" });
  }
});

router.post("/", async (req, res) => {
  const { email, displayName, photoUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      user.displayName = displayName || user.displayName;
      user.photoUrl = photoUrl || user.photoUrl;

      await user.save();
      return res
        .status(200)
        .json({ msg: "User updated successfully", data: user });
    } else {
      user = new User({
        email,
        displayName,
        photoUrl,
      });

      await user.save();

      res.status(201).json({
        msg: "User and Resume created successfully",
        data: { user },
      });
    }

    const resume = new Resume({
      personalInformation: {
        fullName: displayName,
        email: email,
      },
      workExperience: [],
      education: [],
      certifications: [],
      skills: [],
      projects: [],
    });

    await resume.save(); // Save the resume to the database
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error occurred while saving user and resume" });
  }
});

module.exports = router;
