import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function PersonelInfo({ userObj, resumeObj }) {
  const navigate = useNavigate();

  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      maxWidth="100%"
      justifyContent={"space-around"}
    >
      <Box>
        <Box
          component="img"
          src={
            userObj.photoUrl ||
            "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
          }
          width="250px"
          borderRadius="50%"
        />
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
          border="1px solid #ccc"
          borderRadius={12}
          margin="0px 18px"
        >
          <IconButton
            disabled={!resumeObj.socialProfiles.personalWebsite}
            onClick={() =>
              handleLinkClick(resumeObj.socialProfiles.personalWebsite)
            }
          >
            <LanguageIcon sx={{ color: "#000", fontSize: "35px" }} />
          </IconButton>
          <IconButton
            disabled={!resumeObj.socialProfiles.github}
            onClick={() =>
              handleLinkClick(
                `https://github.com/${resumeObj.socialProfiles.github}`
              )
            }
          >
            <GitHubIcon sx={{ color: "#000", fontSize: "35px" }} />
          </IconButton>
          <IconButton
            disabled={!resumeObj.socialProfiles.linkedin}
            onClick={() =>
              handleLinkClick(
                `https://linkedin.com/in/${resumeObj.socialProfiles.linkedin}`
              )
            }
          >
            <LinkedInIcon color="primary" sx={{ fontSize: "35px" }} />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <Box>
          <Typography variant="h5" fontWeight={700} mt={1} ml={1}>
            Personal Info
          </Typography>
        </Box>

        <Box
          p={1}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          columnGap={{ xs: 0, sm: 2 }}
          rowGap={{ xs: 2, sm: 0 }}
          mt={{ xs: 0, sm: 1 }}
        >
          <TextField
            label="E-Mail"
            value={resumeObj.email}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Full Name"
            value={resumeObj.fullName}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box
          p={1}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          columnGap={{ xs: 0, sm: 2 }}
          rowGap={{ xs: 2, sm: 0 }}
          mt={{ xs: 0, sm: 2 }}
        >
          <TextField
            label="Mobile"
            value={resumeObj.phoneNumber || "N/A"}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box
          p={1}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          columnGap={{ xs: 0, sm: 2 }}
          rowGap={{ xs: 2, sm: 0 }}
          mt={{ xs: 0, sm: 1 }}
        >
          <TextField
            label="Date Of Birth"
            type="date"
            value={resumeObj.dateOfBirth || "N/A"}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Nationality"
            value={resumeObj.nationality || "N/A"}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box>
          <Typography variant="h5" fontWeight={700} mt={1} ml={1}>
            Address
          </Typography>
        </Box>

        <Box
          p={1}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          columnGap={{ xs: 0, sm: 2 }}
          rowGap={{ xs: 2, sm: 0 }}
          mt={{ xs: 0, sm: 1 }}
        >
          <TextField
            label="Street"
            value={resumeObj.address.street}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="City"
            value={resumeObj.address.city}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box
          p={1}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          columnGap={{ xs: 0, sm: 2 }}
          rowGap={{ xs: 2, sm: 0 }}
          mt={{ xs: 0, sm: 1 }}
        >
          <TextField
            label="State"
            value={resumeObj.address.state}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Country"
            value={resumeObj.address.country}
            sx={{
              width: {
                xs: "100%",
                sm: "370px",
              },
            }}
            InputProps={{ readOnly: true }}
          />
        </Box>
      </Box>
    </Box>
  );
}
