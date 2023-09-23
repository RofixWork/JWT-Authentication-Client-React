import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.key("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export default userSlice.reducer;

export const { setUser, logout } = userSlice.actions;
