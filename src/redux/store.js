import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import userSlice from "./userSlice";
import authSlice from "./authSlice";
import filterSlice from "./filterSlice";
import jobListSlice from "./jobListSlice";
import savedJobsSlice from "./savedJobsSlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["auth", "user", "savedJobs"],
};

const rootReducer = combineReducers({
	user: userSlice,
	auth: authSlice,
	filter: filterSlice,
	jobList: jobListSlice,
	savedJobs: savedJobsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
