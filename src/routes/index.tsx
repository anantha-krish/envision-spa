import { createRoute, redirect } from "@tanstack/react-router";
import { lazy } from "react";
import Home from "../pages/Home";
import { requireAuth } from "../utils/authGuard";
import { rootRoute } from "./__root";
import { Logout } from "../pages/Logout";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: requireAuth,
  component: Home,
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
  beforeLoad: ({ context }) => {
    const isAuthenticated = context.auth.isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
  beforeLoad: ({ context }) => {
    const isAuthenticated = context.auth.isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

export const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logout",
  component: Logout,
});
