import { Suspense } from "react";
import App from "../App";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { AuthState } from "../features/auth/authSlice";

import Loader from "../components/Loader";
import { PageNotFound } from "../pages/PageNotFound";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthState;
}
export const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  ),
  notFoundComponent: () => <PageNotFound />,
});
