import { createRootRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import App from "../App";

export const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <App />
    </Suspense>
  ),
});
