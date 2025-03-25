import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem("authToken"));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
