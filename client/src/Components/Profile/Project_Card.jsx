import { Box, Typography } from "@mui/material";
import React from "react";

export default function Project_Card({ project }) {
  return (
    <Box border="1px solid #ccc" width="400px" p={2} borderRadius={2}>
      <Typography variant="h6" fontWeight={700}>
        {project.name}
      </Typography>
      <Typography variant="body1">{project.description}</Typography>
      <Typography>
        <b>Tech Stack :</b>
        <ul>
          {project.technologiesUsed.map((tech, index) => (
            <span key={index}> {tech} |</span>
          ))}
        </ul>
      </Typography>
      {project.link && (
        <Typography>
          Demo link:{" "}
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.link}
          </a>
        </Typography>
      )}
    </Box>
  );
}
