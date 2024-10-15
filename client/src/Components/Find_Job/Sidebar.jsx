import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function Sidebar({
  filters,
  setFilters,
  resumeSkillsEnabled,
  setResumeSkillsEnabled,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h6">Filters</Typography>

      {/* Job Title Filter */}
      <TextField
        label="Job Title"
        name="jobTitle"
        value={filters.jobTitle}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Location Filter */}
      <TextField
        label="Location"
        name="location"
        value={filters.location}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Job Type Filter */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Job Type</InputLabel>
        <Select
          value={filters.jobType}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              jobType: e.target.value,
            }))
          }
          label="Job Type"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Full-time">Full-time</MenuItem>
          <MenuItem value="Part-time">Part-time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>
      </FormControl>

      {/* Date Posted Filter */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Date Posted</InputLabel>
        <Select
          value={filters.datePosted}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              datePosted: e.target.value,
            }))
          }
          label="Date Posted"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Last 7 days">Last 7 days</MenuItem>
          <MenuItem value="Last 30 days">Last 30 days</MenuItem>
        </Select>
      </FormControl>

      {/* Skills Filter */}
      <TextField
        label="Skills"
        name="skills"
        value={filters.skills}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Checkbox for Resume Skills */}
      <FormControlLabel
        control={
          <Checkbox
            checked={resumeSkillsEnabled}
            onChange={(e) => setResumeSkillsEnabled(e.target.checked)}
          />
        }
        label="Search by Resume Skills"
      />
    </Box>
  );
}
