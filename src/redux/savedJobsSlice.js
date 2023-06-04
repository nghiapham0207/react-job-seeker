import { createSlice } from "@reduxjs/toolkit";

const savedJobsSlice = createSlice({
	name: "savedJobs",
	initialState: {
		savedJobs: [],
	},
	reducers: {
		setBookmark: (state, action) => {
			state.savedJobs = action.payload.savedJobs;
		},
		addBookmark: (state, action) => {
			state.savedJobs.push({ jobId: action.payload.job });
		},
		removeBookmark: (state, action) => {
			const previous = state.savedJobs;
			state.savedJobs = previous.filter((job) => {
				return job.jobId._id !== action.payload._id;
			});
		},
		clearBookmark: (state, action) => {
			state.savedJobs = [];
		},
	},
});

export const { setBookmark, addBookmark, removeBookmark, clearBookmark } = savedJobsSlice.actions;

export default savedJobsSlice.reducer;
