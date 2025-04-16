import { rootRoute } from "../routes/__root";

import { createRouter } from "@tanstack/react-router";
import { indexRoute, loginRoute, logoutRoute, registerRoute } from "../routes";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultPreload: "intent",
});
