import { createRoute, redirect, RouteContext } from "@tanstack/react-router";
import { lazy } from "react";
import Home from "../pages/Home";
import { requireAuth } from "../utils/authGuard";
import { rootRoute } from "./__root";
import { RootState, store } from "../store";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: requireAuth,
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
  beforeLoad: () => {
    const state = store.getState() as RootState;
    const isAuthenticated = state.auth.isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
  beforeLoad: () => {
    const state = store.getState() as RootState;
    const isAuthenticated = state.auth.isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

export { indexRoute, loginRoute, registerRoute };
