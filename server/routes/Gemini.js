const express = require("express");
const router = express.Router();

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY || "AIzaSyCTkqNDJchmfc0bkN97haQT6NfyDPeBsqY"
);

const sendToGemini = async (resumeText) => {
  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      `
    You are a smart assistant tasked with converting unstructured or noisy resume text into a structured JSON format. Your job is to extract relevant information from the provided resume text, correcting spelling mistakes, ignoring special characters like "\n", "\r", and "\t", and formatting inconsistencies. The output should match the following JSON structure precisely:

{
  "personalInformation": {
    "fullName": "string",
    "email": "string",
    "phoneNumber": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "country": "string"
    },
    "socialProfiles": {
      "linkedin": "string",
      "github": "string",
      "personalWebsite": "string"
    },
    "dateOfBirth": "string (YYYY-MM-DD)",
    "nationality": "string"
  },
  "summary": "string",
  "workExperience": [
    {
      "jobTitle": "string",
      "company": "string",
      "location": "string",
      "startDate": "string (YYYY-MM)",
      "endDate": "string (YYYY-MM) or Present",
      "employmentType": "string (Full-time/Part-time/Contract)",
      "salary": "number (optional)",
      "description": "string",
      "achievements": [
        "string"
      ],
      "technologies": [
        "string"
      ]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "location": "string",
      "startDate": "string (YYYY-MM)",
      "endDate": "string (YYYY-MM)",
      "gpa": "string (optional)",
      "honors": [
        "string (optional)"
      ],
      "thesisTitle": "string (optional)",
      "relevantCourses": [
        "string"
      ]
    }
  ],
  "certifications": [
    {
      "name": "string",
      "institution": "string",
      "dateReceived": "string (YYYY-MM)",
      "expirationDate": "string (YYYY-MM, optional)"
    }
  ],
  "skills": ["string"],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologiesUsed": [
        "string"
      ],
      "link": "string (optional)",
      "duration": {
        "startDate": "string (YYYY-MM)",
        "endDate": "string (YYYY-MM)"
      },
      "role": "string"
    }
  ],
  "languages": [
    {
      "language": "string",
      "proficiency": "string (Native/Fluent/Intermediate/Basic)"
    }
  ],
  "volunteerExperience": [
    {
      "role": "string",
      "organization": "string",
      "startDate": "string (YYYY-MM)",
      "endDate": "string (YYYY-MM) or Present",
      "description": "string",
      "impact": "string (optional)"
    }
  ],
  "publications": [
    {
      "title": "string",
      "publicationDate": "string (YYYY-MM)",
      "publisher": "string",
      "link": "string (optional)"
    }
  ],
  "awards": [
    {
      "title": "string",
      "dateReceived": "string (YYYY-MM)",
      "description": "string (optional)"
    }
  ],
  "references": [
    {
      "name": "string",
      "title": "string",
      "company": "string",
      "email": "string",
      "phoneNumber": "string",
      "relationship": "string"
    }
  ],
  "interests": [
    "string"
  ],
  "professionalAffiliations": [
    "string"
  ]
}

Please ensure that the output matches this structure, with all relevant fields populated as best as possible from the text, and any unnecessary or incorrect text filtered out. If information is missing from the resume text, leave the corresponding fields blank or use placeholders such as "".
    ` + resumeText;

    const result = await model.generateContent(prompt);
    console.log(`Result from Gemini : \n ${result}`);
    const response = result.response;
    console.log(`Response from Gemini : \n ${response}`);
    const text = await response.text();
    console.log(`Text from Gemini : \n ${text}`);
    // Removing any additional content before parsing JSON
    const jsonString = text.match(/{[\s\S]*}/)?.[0];

    if (jsonString) {
      const jsonResponse = JSON.parse(jsonString);
      return jsonResponse;
    } else {
      console.log(`Error Occurred in generating the text`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendToGemini;
