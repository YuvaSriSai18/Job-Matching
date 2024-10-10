import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, Avatar } from "@mui/material";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../Utils/firebase";

import * as api from "../apis/index";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [email, setEmail] = useState("example@example.com");
  const [uploading, setUploading] = useState(false);
  const [ParsedText, setParsedText] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    const maxSize = 0.5 * 1024 * 1024;

    if (selectedFile) {
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/pdf",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Only images (PNG, JPG, JPEG) and PDFs are allowed.");
        return;
      }

      if (selectedFile.size > maxSize) {
        alert("File size exceeds the 1MB limit. Please select a smaller file.");
        return;
      }

      setFile(
        Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        })
      );
    }
  }, []);

  //   console.log(file);
  const handleUpload = async () => {
    if (file) {
      try {
        setUploading(true);
        const storage = getStorage(app);

        // Determine folder based on file type
        let folder = "others/"; // default folder for unknown types
        if (file.type.startsWith("image/")) {
          folder = "images/";
        } else if (file.type === "application/pdf") {
          folder = "pdfs/";
        }

        const storageRef = ref(storage, folder + file.name);

        await uploadBytes(storageRef, file);

        const downloadUrl = await getDownloadURL(storageRef);
        setImageURL(downloadUrl);

        api.sendFileUrl({
          email: email,
          resumeUrl: downloadUrl,
        });
        api
          .getParsedText({
            fileUrl: downloadUrl,
          })
          .then((res) => {
            console.log(res.data);
            setParsedText(res.data.ParsedText);
          })
          .catch((err) => console.log(`Error in posting parsed text : ${err}`));

        setFile(null);
      } catch (error) {
        console.error("Upload failed: ", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <>
      <Box
        sx={{
          border: "2px dashed #ccc",
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          width: "400px",
          margin: "auto",
        }}
      >
        <Box {...getRootProps()} sx={{ cursor: "pointer", padding: 4 }}>
          <input {...getInputProps()} />
          <BackupRoundedIcon fontSize="large" />
          <Typography variant="body1">
            Drag and drop a file here, or click to browse
          </Typography>
        </Box>

        {file && (
          <Box sx={{ mt: 2 }}>
            <Avatar
              src={file.preview}
              alt={file.name}
              sx={{ width: 80, height: 80, margin: "auto" }}
            />
            <Typography variant="body2">{file.name}</Typography>
            <Typography variant="body2">
              {(file.size / 1024).toFixed(2)} KB
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
      </Box>
      <Box>{ParsedText}</Box>
    </>
  );
}
