import { Suspense } from "react";
import App from "../App";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { AuthState } from "../features/auth/authSlice";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthState;
}
export const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <App />
    </Suspense>
  ),
});
