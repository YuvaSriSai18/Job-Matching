import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PersonelInfo from "../../Components/Profile/PersonelInfo";
import WorkExperience from "../../Components/Profile/WorkExperience";
import Projects from "../../Components/Profile/Projects";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const resumeData = useSelector((state) => state.resume.resumeData);

  // State to handle which section is active
  const [activeSection, setActiveSection] = useState("Personal Info");
  const matches = useMediaQuery("(min-width:600px)");

  // Sidebar items
  const sections = [
    "Personal Info",
    "Work Experience",
    "Education",
    "Certifications",
    "Skills",
    "Projects",
    "Interests",
    "Publications",
    "Awards",
  ];

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "Personal Info":
        return (
          <PersonelInfo
            userObj={userData}
            resumeObj={resumeData.personalInformation}
          />
        );
      case "Work Experience":
        return <WorkExperience workExperience={resumeData.workExperience} />;
      case "Education":
        return <Typography variant="h6">This is Education content.</Typography>;
      case "Certifications":
        return (
          <Typography variant="h6">This is Certifications content.</Typography>
        );
      case "Skills":
        return <Typography variant="h6">This is Skills content.</Typography>;
      case "Projects":
        return <Projects projects={resumeData.projects} />;
      case "Interests":
        return <Typography variant="h6">This is Interests content.</Typography>;
      case "Publications":
        return (
          <Typography variant="h6">This is Publications content.</Typography>
        );
      case "Awards":
        return <Typography variant="h6">This is Awards content.</Typography>;
      default:
        return (
          <Typography variant="h6">
            Select a section from the sidebar.
          </Typography>
        );
    }
  };

  return (
    <>
      <Box
        maxWidth={"100%"}
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {/* Sidebar */}
        <Box
          width={{ xs: "100%", sm: "30%", md: "20%" }}
          p={2}
          borderRight={"1px solid #ddd"}
        >
          {!matches && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Details
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {sections.map((section) => (
                    <ListItem
                      key={section}
                      button
                      onClick={() => setActiveSection(section)}
                      sx={{
                        cursor: "pointer",
                        padding: "10px",
                        backgroundColor:
                          activeSection === section ? "#f0f0f0" : "transparent",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <Typography variant="body1">{section}</Typography>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
          {matches && (
            <List>
              {sections.map((section) => (
                <ListItem
                  key={section}
                  button
                  onClick={() => setActiveSection(section)}
                  sx={{
                    cursor: "pointer",
                    padding: "10px",
                    backgroundColor:
                      activeSection === section ? "#f0f0f0" : "transparent",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <Typography variant="body1">{section}</Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Main Content Area */}
        <Box width={{ xs: "100%", sm: "80%" }} p={2}>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
