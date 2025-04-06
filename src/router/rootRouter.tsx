import { rootRoute } from "./rootRoute";

import { createRouter } from "@tanstack/react-router";
import { indexRoute, loginRoute, registerRoute } from "./routes";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
