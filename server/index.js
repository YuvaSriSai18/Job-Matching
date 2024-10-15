const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

app.use(
  cors({
    origin:[ "http://localhost:5173" , "https://job-matching-18.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

// Mongoose Connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => {
    console.log(`Error Occurred : ${err}`);
  });

const ImageRouter = require("./routes/ImageUrl");
app.use("/image-url", ImageRouter);
const ParsedTextRouter = require("./routes/ParseText");
app.use("/upload", ParsedTextRouter);
const JobsRouter = require("./routes/Jobs");
app.use("/jobs", JobsRouter);
const userRouter = require("./routes/User");
app.use("/api/users", userRouter);
const userResume = require('./routes/Resume')
app.use('/api/resumedata',userResume)
// console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
