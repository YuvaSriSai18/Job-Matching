import React from "react";
import UploadImage from "./Components/UploadImage";
import Navbar from "./Components/AppBar/ResponsiveNavbar";
import AllRoutes from "./Allroutes";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box mt={9}>
        <AllRoutes />
      </Box>
    </BrowserRouter>
  );
}
