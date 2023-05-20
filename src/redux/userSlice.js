import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addBookmark: (state, action) => {
      console.log(action);
      state.currentUser.savedJobs.push({ jobId: action.payload.job });
    },
    removeBookmark: (state, action) => {
      console.log(action);
      const previous = state.currentUser.savedJobs;
      state.currentUser.savedJobs = previous.filter((job) => {
        return job.jobId._id !== action.payload._id;
      })
    }
  }
})

export const {
  updateUser,
  addBookmark,
  removeBookmark
} = userSlice.actions;

export default userSlice.reducer;
