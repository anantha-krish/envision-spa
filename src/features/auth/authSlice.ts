import { createSlice } from "@reduxjs/toolkit";
import { decodeJwt } from "../../utils/tokenUtils";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  role: string;
  userId: number;
}

const getInitialAuthState = (): AuthState => {
  const accessToken = sessionStorage.getItem("accessToken") ?? null;
  const decodedToken =
    (accessToken?.length ?? 0) > 0 ? decodeJwt(accessToken!) : null;
  return {
    accessToken,
    role: decodedToken?.role ?? "user",
    isAuthenticated: !!accessToken,
    userId: decodedToken?.user_id ?? -1,
  };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = decodeJwt(action.payload.accessToken)?.role ?? "user";
      state.userId = decodeJwt(action.payload.accessToken)?.user_id ?? -1;
      state.isAuthenticated = true;
      sessionStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
