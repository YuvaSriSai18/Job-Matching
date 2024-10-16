import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
export default function Experience_Card({ obj }) {
  return (
    <Box width="400px" border="2px solid #ccc" borderRadius={3} p={2}>
      <Typography variant="h5" fontWeight={700} fontSize={"21px"} mb={1}>
        {obj.jobTitle}
      </Typography>
      <Box display={"flex"} justifyContent="space-between" m={1}>
        <Typography variant="h5" fontWeight={450} fontSize={"16px"} mb={1}>
          {obj.company}
        </Typography>
        <Typography>
          <FmdGoodIcon />{" "}
          <span style={{ marginLeft: "8px" }}>
            {obj.location === null ? "Remote" : obj.location}
          </span>
        </Typography>
      </Box>
      <Typography variant="p" fontSize={"15px"} mt={2}>
        {obj.description}
      </Typography>
      <Box display="flex" justifyContent="space-between" mt={1} mb={1}>
        <Typography variant="h6" fontSize={"16px"} fontWeight={700}>
          {obj.startDate} - {obj.endDate}
        </Typography>

        <Chip
          variant="outlined"
          label={obj.employmentType}
          sx={{ backgroundColor: "#e5c7ad" }}
        />
      </Box>
    </Box>
  );
}
