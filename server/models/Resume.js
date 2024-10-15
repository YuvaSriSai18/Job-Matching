const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String },
  },
  socialProfiles: {
    linkedin: String,
    github: String,
    personalWebsite: String,
  },
  dateOfBirth: String,
  nationality: String,
});

const workExperienceSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  employmentType: String,
  salary: String,
  description: String,
  achievements: [String],
  technologies: [String],
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  location: String,
  startDate: String,
  endDate: String,
  gpa: String,
  honors: [String],
  thesisTitle: String,
  relevantCourses: [String],
});

const certificationSchema = new mongoose.Schema({
  name: String,
  institution: String,
  dateReceived: String,
  expirationDate: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technologiesUsed: [String],
  link: String,
  duration: {
    startDate: String,
    endDate: String,
  },
  role: String,
});

const userSchema = new mongoose.Schema({
  personalInformation: personalInfoSchema,
  summary: String,
  workExperience: [workExperienceSchema],
  education: [educationSchema],
  certifications: [certificationSchema],
  skills: [String],
  projects: [projectSchema],
  languages: [String],
  volunteerExperience: [String],
  publications: [String],
  awards: [String],
  references: [String],
  interests: [String],
  professionalAffiliations: [String],
});

const Resume = mongoose.model("resumes", userSchema);

module.exports = Resume;
