import { createSlice } from "@reduxjs/toolkit";

const ResumeSlice = createSlice({
  name: "resume",
  initialState: { resumeData: {} },
  reducers: {
    setResumeData(state, action) {
      state.resumeData = action.payload;
    },
    clearResumeData(state) {
      state.resumeData = {};
    },
  },
});

export const { setResumeData, clearResumeData } = ResumeSlice.actions;
export default ResumeSlice.reducer;
