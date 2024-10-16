import React from "react";
import ProjectCard from "./Project_Card";
import { Box } from "@mui/material";

export default function Projects({ projects }) {
  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={4}>
      {projects.map((item, i) => (
        <ProjectCard project={item} key={i} />
      ))}
    </Box>
  );
}
