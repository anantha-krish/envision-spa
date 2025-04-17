import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link, useNavigate } from "@tanstack/react-router";
import { ThemeSwitchBar } from "./ThemeSwitchBar";
import { ThemeSwitch } from "./ThemeSwitch";

const Navbar = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  if (!token) return <ThemeSwitchBar />;
  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;
  return (
    <nav className="navbar bg-base-100 shadow-sm w-full flex justify-end align-center py-2.5 px-6">
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

        <button
          onClick={() => navigate({ to: "/logout" })}
          className="btn-sm btn-secondary"
        >
          Logout
        </button>
        <button className="btn">
          <ThemeSwitch />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
