import { RouterProvider } from "@tanstack/react-router";
import { router } from "./rootRouter";

export function Router() {
  return <RouterProvider router={router} />;
}
