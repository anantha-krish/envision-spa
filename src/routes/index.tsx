import { createRoute, redirect } from "@tanstack/react-router";
import { lazy } from "react";
import { Logout } from "../pages/Logout";
import { PermissionError } from "../pages/PermissionError";
import { rootRoute } from "./__root";
import { IdeaDetailsPage } from "../pages/ideaDetails";
import { IdeaPostNotFound } from "../pages/ideaDetails/IdeaPostNotFound";
import { Dashboard } from "../pages/Dashboard";
import { IdeaListPage } from "../pages/ideaList";

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
  path: "dashboard",
  beforeLoad: ({ context }) => {
    requireRole(context, ["ADMIN", "MANAGER"]);
  },
  component: () => <Dashboard />,
});

export const permissionErrorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "permission-error",
  component: () => <PermissionError />,
});

export const ideasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "ideas",
  beforeLoad: ({ context }) => {
    requireAuth(context);
  },
  component: IdeaListPage,
});

export const ideasPostNotFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "ideas/not-found",
  beforeLoad: ({ context }) => {
    requireAuth(context);
  },
  component: IdeaPostNotFound,
});

export const ideaDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "ideas/$ideaId/$mode",
  beforeLoad: ({ context, params }) => {
    requireAuth(context);
    const { mode } = params;
    if (mode && !["edit", "view"].includes(mode)) {
      throw redirect({ to: "/ideas/not-found" });
    }
  },

  component: () => <IdeaDetailsPage />,
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: Login,
  beforeLoad: redirectIfAuthenticated,
});

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "register",
  component: Register,
});

export const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "logout",
  component: Logout,
});
