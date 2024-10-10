const OCR = require("ocr-space-api");
require("dotenv").config();
const express = require("express");
const router = express.Router();

const options = {
  apikey: process.env.OCR_API_KEY,
  language: "eng", // English
  isOverlayRequired: true,
};

const processFile = (fileUrl) => {
  return OCR.parseImageFromUrl(fileUrl, options)
    .then((parsedResult) => {
      console.log("parsedText: \n", parsedResult.parsedText);
      console.log("ocrParsedResult: \n", parsedResult.ocrParsedResult);
      return parsedResult;
    })
    .catch((err) => {
      console.error("ERROR:", err);
      throw err;
    });
};

router.post("/", async (req, res) => {
  const { fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ message: "File URL is required." });
  }

  try {
    const parsedResult = await processFile(fileUrl);

    // Combine all parsed texts from the ParsedResults array
    const combinedParsedText = parsedResult.ocrParsedResult.ParsedResults.map(
      (result) => result.ParsedText
    ).join("\n");
    // Combine them into a single string, separated by new lines

    console.log(combinedParsedText);

    return res.status(200).json({
      message: "File processed successfully.",
      parsedResults: parsedResult.ocrParsedResult.ParsedResults,
      ParsedText: combinedParsedText,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error processing file.", error: error.message });
  }
});

module.exports = router;
