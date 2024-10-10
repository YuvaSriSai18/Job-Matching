const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { email, resumeUrl } = req.body;
    
  if (!email || !resumeUrl) {
    return res
      .status(400)
      .json({ message: "Email and resume URL are required." });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { resumeUrl },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
