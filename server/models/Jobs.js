const mongoose = require("mongoose");
const User = require("./User"); // Import the User model

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    location: { type: String, required: true },
    company: { type: String },
    salaryRange: { type: String },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"], // Enum for job types
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId type for reference
      ref: "User", // Reference to the User model
      required: true,
    },
    postedDate:{
      type:Date
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
