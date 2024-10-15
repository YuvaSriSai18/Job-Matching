import { configureStore } from "@reduxjs/toolkit";
import ResumeSlice from "./Resume/ResumeSlice";
import authSlice from "./auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    resume: ResumeSlice,
  },
});
