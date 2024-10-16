import { Box, Typography } from "@mui/material";
import React from "react";
import Experience_Card from "./Experience_Card";

export default function WorkExperience({ workExperience }) {
  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={2}>
      {workExperience.length > 0 ? (
        <>
          {workExperience.map((job, index) => (
            <Experience_Card key={index} obj={job} />
          ))}
        </>
      ) : (
        <>
          <Typography>No Experience</Typography>
        </>
      )}
    </Box>
  );
}
