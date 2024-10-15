import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, Avatar } from "@mui/material";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../Utils/firebase";
import * as api from "../apis/index";
import { useDispatch, useSelector } from "react-redux";
import { setResumeData } from "../reducers/Resume/ResumeSlice";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [email, setEmail] = useState("example@example.com");
  const [uploading, setUploading] = useState(false);
  const [ParsedText, setParsedText] = useState();

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
    }
  }, [userData]);

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
        alert(
          "File size exceeds the 0.5MB limit. Please select a smaller file."
        );
        return;
      }

      setFile(
        Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        })
      );
    }
  }, []);

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

        await api.sendFileUrl({
          email: email,
          resumeUrl: downloadUrl,
        });

        const res = await api.getParsedText({
          fileUrl: downloadUrl,
          email: email,
        });

        setParsedText(res.data.ParsedText);
        URL.revokeObjectURL(file.preview); // Clean up the object URL
        setFile(null); // Reset file after upload
      } catch (error) {
        console.error("Upload failed: ", error);
        alert("Upload failed. Please try again.");
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
    <Box
      sx={{
        border: "2px solid #ccc",
        padding: 4,
        borderRadius: 4,
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        width: "400px",
        margin: "auto",
      }}
    >
      <Box
        {...getRootProps()}
        sx={{ cursor: "pointer", padding: 4, color: "#000" }}
      >
        <input {...getInputProps()} />
        <BackupRoundedIcon fontSize="large" />
        <Typography variant="body1">
          Drag and drop a file here, or click to browse
        </Typography>
      </Box>

      {file && (
        <Box sx={{ mt: 2, color: "#000" }}>
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
  );
}
