import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authSlice from "./authSlice";
import filterSlice from "./filterSlice";
import jobListSlice from "./jobListSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"]
}

const rootReducer = combineReducers({
  auth: authSlice,
  filter: filterSlice,
  jobList: jobListSlice,
})

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
