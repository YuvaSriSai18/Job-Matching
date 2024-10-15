import { Box, Button, Chip, Typography } from "@mui/material";
import React from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Link } from "react-router-dom";
export default function JobCard({job}) {
  return (
    <Box border="1px solid black" borderRadius="12px" p={2} mb={3}>
      <Typography variant="h6" fontWeight="700" fontSize="18px">
        {job.title}
      </Typography>
      <Box display="flex" width="100%" gap={5} mt={1.5}>
        <Box display="flex">
          <LocationOnRoundedIcon />{" "}
          <span style={{ marginLeft: "10px" }}> {job.location}</span>
        </Box>
        <Box display="flex">
          <AccessTimeRoundedIcon />{" "}
          <span style={{ marginLeft: "10px" }}> {job.jobType} </span>
        </Box>
      </Box>
      <Box mt={1} mb={1} gap={0.5} display='flex' flexWrap='wrap'>
        {job.requirements.length > 0 &&
          job.requirements.map((requirement, index) => (
            <Chip label={requirement} key={index} sx={{ margin: "2px" }} />
          ))}
      </Box>
      <Box mt={2} textOverflow="ellipsis">
        <Typography variant="p" fontSize="16px" textOverflow={'ellipsis'}>
          {job.description}
        </Typography>
      </Box>
      <Box>
        {/* <Link to='/profile'> */}
        <Button
          variant="contained"
          sx={{ mt: 2, mb: 1, height: "45px", width: "100px" }}
        >
          View Job
        </Button>
        {/* </Link> */}
      </Box>
    </Box>
  );
}
