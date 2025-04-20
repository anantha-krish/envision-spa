import type { router } from "../router/rootRouter";

export type AppRouter = typeof router;
export type EnvisionRoutePaths = keyof AppRouter["routesByPath"];
declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter;
  }
  interface RouteContext {
    isAuthenticated: boolean;
  }
}
