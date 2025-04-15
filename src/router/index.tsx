import { RouterProvider } from "@tanstack/react-router";
import { router } from "./rootRouter";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function Router() {
  const auth = useSelector((state: RootState) => state.auth);
  return <RouterProvider router={router} context={{ auth }} />;
}
