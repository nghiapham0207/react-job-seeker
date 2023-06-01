import { createSelector } from "@reduxjs/toolkit";

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectRefreshToken = (state) => state.auth.refreshToken;

export const selectUser = (state) => state.user.currentUser;

export const selectJobList = (state) => state.jobList;

export const selectLocationWorkings = (state) => state.filter.locationWorkings;

export const selectOccupations = (state) => state.filter.occupations;

export const selectCompanies = (state) => state.filter.companies;

export const selectSavedJobs = (state) => state.savedJobs.savedJobs;

export const selectFilter = createSelector(
	selectOccupations,
	selectLocationWorkings,
	selectCompanies,
	(occupations, locationWorkings, companies) => {
		return {
			occupations,
			locationWorkings,
			companies,
		};
	},
);

export const selectSearch = (state) => state.filter.search;

export const selectJobListByFilter = createSelector(selectJobList, selectSearch, (jobList, search) => {
	return jobList.filter((job) => {
		return job.name.includes(search);
	});
});
