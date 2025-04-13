import type { router } from "../router/rootRouter";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface RouteContext {
    isAuthenticated: boolean;
  }
}
