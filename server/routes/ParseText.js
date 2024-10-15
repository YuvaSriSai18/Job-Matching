const OCR = require("ocr-space-api");
require("dotenv").config();
const express = require("express");
const router = express.Router();

const sendToGemini = require("./Gemini");

const Resume = require("../models/Resume");

const options = {
  apikey: process.env.OCR_API_KEY,
  language: "eng",
  isOverlayRequired: true,
};

const processFile = (fileUrl) => {
  return OCR.parseImageFromUrl(fileUrl, options)
    .then((parsedResult) => {
      // console.log("parsedText: \n", parsedResult.parsedText);
      // console.log("ocrParsedResult: \n", parsedResult.ocrParsedResult);
      return parsedResult;
    })
    .catch((err) => {
      console.error("ERROR:", err);
      throw err;
    });
};

router.post("/", async (req, res) => {
  const { fileUrl, email } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ message: "File URL is required." });
  }

  try {
    const parsedResult = await processFile(fileUrl);

    // Combine all parsed texts from the ParsedResults array
    const combinedParsedText = parsedResult.ocrParsedResult.ParsedResults.map(
      (result) => result.ParsedText
    ).join("\n");

    const jsonData = await sendToGemini(combinedParsedText);

    // Update or create the Resume entry
    const resumeUpdateResponse = await Resume.findOneAndUpdate(
      { "personalInformation.email": email },
      {
        $set: {
          personalInformation: jsonData.personalInformation,
          summary: jsonData.summary,
          workExperience: jsonData.workExperience,
          education: jsonData.education,
          certifications: jsonData.certifications,
          skills: jsonData.skills,
          projects: jsonData.projects,
        },
      },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ message: "File processed and resume updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error processing file.", error: error.message });
  }
});

module.exports = router;
