import { Dispatch, Suspense } from "react";
import App from "../App";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { AuthState } from "../features/auth/authSlice";

import Loader from "../components/Loader";
import { PageNotFound } from "../pages/PageNotFound";
import { UnknownAction } from "redux-saga";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthState;
  dispatch: Dispatch<UnknownAction>;
}
export const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  ),
  notFoundComponent: () => <PageNotFound />,
});
