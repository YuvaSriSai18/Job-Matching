import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_SERVER_URI}` });

// Sending download resume url to db
export const sendFileUrl = async (FileData) =>
  await API.post("/image-url", FileData);

//  getting parse text from the uploaded resume through post method

export const getParsedText = async (filePath) =>
  await API.post("/upload", filePath);
// will get response {
//   message: "File processed successfully.",
//   parsedResults: parsedResult.ocrParsedResult.ParsedResults,
//   ParsedText: combinedParsedText,
// }
// User Data
export const getUserByEmail = (email) => API.get(`/api/users/${email}`);
export const postUserData = (userData) => API.post("/api/users", userData);

// Resume Data
export const getUserResume = async (email) => await API.get(`/api/resumedata/${email}`);

// Jobs Data

export const getAllJobs = async () => await API.get(`/jobs`)