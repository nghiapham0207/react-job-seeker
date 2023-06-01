import { createSlice } from "@reduxjs/toolkit";

const jobListSlice = createSlice({
	name: "jobList",
	initialState: [],
	reducers: {
		setAllJob: (state, action) => {
			const jobList = action.payload;
			jobList?.forEach((element) => {
				state.push(element);
			});
			// state.push(...jobList); // Redux toolkit sẽ tự động xử lý immer
		},
	},
});

export const { setAllJob } = jobListSlice.actions;

export default jobListSlice.reducer;
