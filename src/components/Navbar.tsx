import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "@tanstack/react-router";
import { ThemeSwitchBar } from "./ThemeSwitchBar";
import { ThemeSwitch } from "./ThemeSwitch";
import { NotificationDropdown } from "./NotificationDropdown";

const Navbar = ({
  openSubmitIdeaModal,
}: {
  openSubmitIdeaModal: VoidFunction;
}) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const role = useSelector((state: RootState) => state.auth.role);
  const isAdminRole = role === "ADMIN";

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
          {isAdminRole ? "Dashboard" : "Home"}
        </button>
        {isAdminRole && (
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
