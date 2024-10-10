import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_SERVER_URI }` });

// Sending download resume url to db
export const sendFileUrl = async (FileData) => await API.post('/image-url', FileData);

//  getting parse text from the uploaded resume through post method

export const getParsedText = async (filePath) => await API.post('/upload',filePath)
// will get response {
    //   message: "File processed successfully.",
    //   parsedResults: parsedResult.ocrParsedResult.ParsedResults,
    //   ParsedText: combinedParsedText,
    // }