import { createRoute } from "@tanstack/react-router";
import { lazy } from "react";
import Home from "../pages/Home";
import { requireAuth } from "../utils/authGuard";
import { rootRoute } from "./rootRoute";

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
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

export { indexRoute, loginRoute, registerRoute };
