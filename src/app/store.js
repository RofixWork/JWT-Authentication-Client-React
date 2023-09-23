import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import { authAPI } from "../api/authAPI";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});
