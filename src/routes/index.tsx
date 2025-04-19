import { createRoute, redirect } from "@tanstack/react-router";
import { lazy } from "react";
import Home from "../pages/Home";
import { Logout } from "../pages/Logout";
import { PermissionError } from "../pages/PermissionError";
import { rootRoute } from "./__root";
import { ViewIdeaDetailsPage } from "../pages/ideaDetails/ViewIdeaDetailsPage";
import { EditIdeaDetailsPage } from "../pages/ideaDetails/EditIdeaDetailsPage";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const requireAuth = (context: { auth: { isAuthenticated: boolean } }) => {
  if (!context.auth.isAuthenticated) {
    throw redirect({ to: "/login" });
  }
};

const requireRole = (
  context: { auth: { role: string; isAuthenticated: boolean } },
  allowedRoles: string[]
) => {
  if (!allowedRoles.includes(context.auth.role)) {
    throw redirect({ to: "/permission-error" });
  }
  requireAuth(context);
};
const redirectIfAuthenticated = ({
  context,
}: {
  context: { auth: { isAuthenticated: boolean } };
}) => {
  if (context.auth.isAuthenticated) {
    throw redirect({ to: "/" });
  }
};

export const indexedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: ({ context }) => {
    if (["ADMIN", "MANAGER"].includes(context.auth.role)) {
      throw redirect({ to: "/dashboard" });
    }
    throw redirect({ to: "/ideas" });
  },
});

export const dashBoardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: ({ context }) => {
    requireRole(context, ["ADMIN", "MANAGER"]);
  },
  component: () => <div>Dashboard</div>,
});

export const permissionErrorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/permission-error",
  component: () => <PermissionError />,
});

export const ideasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas",
  beforeLoad: ({ context }) => {
    requireAuth(context);
  },
  component: Home,
});

export const ideaDetailsRoute = createRoute({
  getParentRoute: () => ideasRoute,
  path: "$ideaId",
  component: ViewIdeaDetailsPage,
});

export const ideaEditRoute = createRoute({
  getParentRoute: () => ideasRoute,
  path: "$ideaId/edit",
  component: EditIdeaDetailsPage,
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
  beforeLoad: redirectIfAuthenticated,
});

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

export const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logout",
  component: Logout,
});
