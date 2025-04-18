import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function useDynamicTitle() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  useEffect(() => {
    const titles: Record<string, string> = {
      "/ideas": "Ideas",
      "/dashboard": "Dashboard",
      "/login": "Login",
      "/logout": "Logout",
      "/register": "Register",
    };
    document.title = titles[pathname]
      ? `${titles[pathname]} | Envision`
      : "Envision";
  }, [pathname]);
}
