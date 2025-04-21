import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "@tanstack/react-router";
import { ThemeSwitchBar } from "./ThemeSwitchBar";
import { ThemeSwitch } from "./ThemeSwitch";
import { NotificationDropdown } from "./NotificationDropdown";
import { useEffect } from "react";
import { fetchLoggedInUserProfile } from "../features/app/appActions";

const Navbar = ({
  openSubmitIdeaModal,
}: {
  openSubmitIdeaModal: VoidFunction;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const role = useSelector((state: RootState) => state.auth.role);
  const user = useSelector((state: RootState) => state.auth);
  const fullName =
    user.isAuthenticated && user.firstName
      ? [user.firstName, user.lastName].join(" ")
      : "";
  const canViewDashboard = ["ADMIN", "MANAGER"].includes(role);

  useEffect(() => {
    if (user.isAuthenticated) {
      dispatch(fetchLoggedInUserProfile());
    }
  }, [dispatch, user.isAuthenticated]);

  if (!token) return <ThemeSwitchBar />;
  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;
  return (
    <nav className="navbar z-1 shadow-sm dark:shadow-gray-700 w-full flex justify-end align-center py-2.5 px-6">
      <div className="navbar-start gap-4">
        <span className="flex gap-2 items-center">
          <div className="flex-none">
            <img
              src={envisionLogo}
              alt="Envision Logo"
              className="h-6 w-auto "
            />
          </div>
          <span className="text-lg font-semibold text-sky-600  uppercase tracking-widest">
            ENVISION
          </span>
        </span>
        <span className="px-10"></span>
        <button
          onClick={() => navigate({ to: "/" })}
          className="btn  btn-ghost"
        >
          {canViewDashboard ? "Dashboard" : "Home"}
        </button>
        {canViewDashboard && (
          <button
            onClick={() => navigate({ to: "/ideas" })}
            className="btn  btn-ghost"
          >
            Ideas
          </button>
        )}
      </div>
      <button onClick={openSubmitIdeaModal} className="btn btn-primary">
        Submit Your Idea
      </button>
      <div className="navbar-end flex gap-4">
        <button className="btn btn-link ">
          <ThemeSwitch />
        </button>

        <NotificationDropdown />
        {user && (
          <>
            <button className="btn pointer-events-none">
              Hi, {user.firstName}
            </button>
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`}
                  className="inline "
                  alt={fullName}
                />
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => navigate({ to: "/logout" })}
          className="btn  btn-ghost"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
