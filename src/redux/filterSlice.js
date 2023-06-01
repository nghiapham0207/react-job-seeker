import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
	name: "filter",
	initialState: {
		search: "",
		locationWorkings: [],
		occupations: [],
		companies: [],
	},
	reducers: {
		updateSearch(state, action) {
			state.search = action.payload;
		},
		updateLocationWorking(state, action) {
			if (action.payload.checked) {
				state.locationWorkings.push(action.payload.obj.value);
			} else {
				const isInclude = state.locationWorkings.includes(action.payload.obj.value);
				if (isInclude) {
					state.locationWorkings = state.locationWorkings.filter((locationWorking) => {
						return locationWorking !== action.payload.obj.value;
					});
				}
			}
		},
		updateOccupations(state, action) {
			if (action.payload.checked) {
				state.occupations.push(action.payload.obj.id);
			} else {
				const isInclude = state.occupations.includes(action.payload.obj.id);
				if (isInclude) {
					state.occupations = state.occupations.filter((occupation) => {
						return occupation !== action.payload.obj.id;
					});
				}
			}
		},
		updateCompanies(state, action) {
			if (action.payload.checked) {
				state.companies.push(action.payload.obj.id);
			} else {
				const isInclude = state.companies.includes(action.payload.obj.id);
				if (isInclude) {
					state.companies = state.companies.filter((company) => {
						return company !== action.payload.obj.id;
					});
				}
			}
		},
	},
});

export const { updateSearch, updateLocationWorking, updateOccupations, updateCompanies } = filterSlice.actions;

export default filterSlice.reducer;
