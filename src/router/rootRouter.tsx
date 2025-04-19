import { rootRoute } from "../routes/__root";

import { createRouter } from "@tanstack/react-router";
import {
  dashBoardRoute,
  ideaDetailsRoute,
  ideasPostNotFoundRoute,
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
  ideaDetailsRoute,
  dashBoardRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
  permissionErrorRoute,
  ideasPostNotFoundRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    dispatch: undefined!,
  },

  defaultPreload: "intent",
});
