import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  loginName: null,
  role: null,
  site: null,
  readOnly: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.token = payload.token;
      state.loginName = payload.loginName;
      state.role = payload.role;
      state.site = payload.site;
      state.readOnly = payload.readOnly;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.loginName = null;
      state.role = null;
      state.site = null;
      state.readOnly = null;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
export const userToken = (state) => state.auth.token;
export const currentUser = (state) => state.auth.user;
