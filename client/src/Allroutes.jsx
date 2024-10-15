import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import FindJob from "./Pages/Find_Job/FindJob";
export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/find-job" element={<FindJob />} />
      </Routes>
    </>
  );
}
