import {
  Typography,
  Box,
  List,
  ListItem,
  CircularProgress,
  Snackbar,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SignIn from "../../Components/auth/SignIn";
import UploadImage from "../../Components/UploadImage";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const resumeData = useSelector((state) => state.resume.resumeData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadError = (message) => {
    setError(message);
  };

  const handleCloseSnackbar = () => {
    setError("");
  };
  return (
    <div>
      {userData.email ? (
        <>
          <Box
            component="img"
            src={userData.photoUrl}
            width="200px"
            borderRadius="12px"
            alt={userData.displayName}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="h6">Name: {userData.displayName}</Typography>
          <Typography variant="h6">Email: {userData.email}</Typography>
          {userData.skills && userData.skills.length > 0 && (
            <>
              <Typography variant="h6">Skills:</Typography>
              <Box display={"flex"} flexWrap={"wrap"} gap={1} m={1}>
                {userData.skills.map((skill, index) => (
                  <Chip label={skill} key={index} />
                ))}
              </Box>
            </>
          )}
        </>
      ) : (
        <SignIn />
      )}

      {/* Upload Image Component */}
      <UploadImage onError={handleUploadError} setLoading={setLoading} />

      {/* Loading Spinner */}
      {loading && <CircularProgress sx={{ marginTop: 2 }} />}

      {/* Snackbar for error messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </div>
  );
}
