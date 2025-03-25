import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAuth } from "../auth/useAuth";
import { AuthProvider } from "../auth/AuthProvider";
import "../styles.css";
const Navbar = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
    <hr />
  </>
);
export const MainLayout = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: () => <MainLayout />,
});
