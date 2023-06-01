import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
	name: "job",
	initialState: {
		jobs: {
			allJobs: null,
		},
	},
	reducers: {
		getAllJob(state, action) {
			state.jobs.allJobs = action.payload;
		},
	},
});

export const { getAllJob } = jobSlice.actions;

export default jobSlice.reducer;
