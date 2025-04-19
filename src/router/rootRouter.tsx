import { rootRoute } from "../routes/__root";

import { createRouter } from "@tanstack/react-router";
import {
  dashBoardRoute,
  ideaDetailsRoute,
  ideaEditRoute,
  ideasRoute,
  indexedRoute,
  loginRoute,
  logoutRoute,
  permissionErrorRoute,
  registerRoute,
} from "../routes";

export const routeTree = rootRoute.addChildren([
  indexedRoute,
  ideasRoute,
  dashBoardRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
  permissionErrorRoute,
  ideaDetailsRoute,
  ideaEditRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },

  defaultPreload: "intent",
});
