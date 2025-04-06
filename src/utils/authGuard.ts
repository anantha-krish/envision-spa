import { redirect } from "@tanstack/react-router";
import { isTokenExpired } from "./tokenUtils";
import { logout } from "../features/auth/authSlice";
import { RootState, store } from "../store";

export const requireAuth = () => {
  const state = store.getState() as RootState;
  const token = state.auth.accessToken;
  return;

  if (!token || isTokenExpired(token)) {
    store.dispatch(logout());
    throw redirect({ to: "/login" });
  }
};
