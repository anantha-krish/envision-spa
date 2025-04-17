import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link, useNavigate } from "@tanstack/react-router";
import { ThemeSwitchBar } from "./ThemeSwitchBar";
import { ThemeSwitch } from "./ThemeSwitch";
import { NotificationDropdown } from "./NotificationDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  if (!token) return <ThemeSwitchBar />;
  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;
  return (
    <nav className="navbar z-1 shadow-sm dark:shadow-gray-700 w-full flex justify-end align-center py-2.5 px-6">
      <div className="navbar-start">
        <div className="flex-none">
          <img src={envisionLogo} alt="Envision Logo" className="h-6 w-auto " />
        </div>

        <span className="text-lg  uppercase">ENVISION</span>
      </div>
      <div className="navbar-end flex gap-4">
        <Link to="/" className="btn-sm btn-ghost">
          Home
        </Link>

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
