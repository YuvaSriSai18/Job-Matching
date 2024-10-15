// FindJob.js
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import JobCard from "../../Components/Find_Job/JobCard";
import * as api from "../../apis/index";
import Sidebar from "../../Components/Find_Job/Sidebar";
import PaginationControlled from "./PaginationControlled"; // Import the Pagination Controlled component
import { useSelector } from "react-redux";

export default function FindJob() {
  // Using useSelector inside the component
  const resume = useSelector((state) => state.resume.resumeData);
  const resumeData = {
    skills: (resume && resume.skills) || ["Software"],
  };

  const [AllJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    datePosted: "",
    skills: "",
  });
  const [resumeSkillsEnabled, setResumeSkillsEnabled] = useState(false); // Track if the checkbox is selected
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8; // Number of jobs to display per page

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.getAllJobs();
        setAllJobs(res.data.data);
      } catch (err) {
        console.log(`Error occurred in fetching all jobs: ${err}`);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on user input or resume skills
  const filteredJobs = AllJobs.filter((job) => {
    const matchesTitle = job.title
      .toLowerCase()
      .includes(filters.jobTitle.toLowerCase());
    const matchesLocation = job.location
      .toLowerCase()
      .includes(filters.location.toLowerCase());
    const matchesJobType = filters.jobType
      ? job.jobType === filters.jobType
      : true;
    const matchesDatePosted =
      (filters.datePosted === "Last 7 days"
        ? new Date(job.postedDate) >=
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        : true) &&
      (filters.datePosted === "Last 30 days"
        ? new Date(job.postedDate) >=
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        : true);

    // If resumeSkillsEnabled is true, match the job requirements with resume skills
    const matchesSkills = resumeSkillsEnabled
      ? job.requirements.some((skill) => resumeData.skills.includes(skill))
      : job.requirements.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        );

    return (
      matchesTitle &&
      matchesLocation &&
      matchesJobType &&
      matchesDatePosted &&
      matchesSkills
    );
  });

  // Pagination Logic
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box
        maxWidth="100%"
        display="flex"
        m={2}
        border="1px solid black"
        p={2}
        gap={1}
        justifyContent="space-evenly"
      >
        <Box width="20%" border="1px solid black" borderRadius={2} p={3}>
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            resumeSkillsEnabled={resumeSkillsEnabled}
            setResumeSkillsEnabled={setResumeSkillsEnabled} // Pass down the state
          />
        </Box>
        <Box width="75%" border="1px solid black" p={2}>
          {currentJobs.length > 0 ? (
            currentJobs.map((job, i) => <JobCard key={job.id || i} job={job} />)
          ) : (
            <p>No jobs available</p>
          )}
          <PaginationControlled
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
}
