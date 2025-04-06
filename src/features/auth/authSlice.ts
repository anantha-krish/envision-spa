import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
