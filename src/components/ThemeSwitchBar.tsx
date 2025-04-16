import { ThemeSwitch } from "./ThemeSwitch";

export const ThemeSwitchBar: React.FC = () => (
  <nav className="navbar bg-transparent w-full flex justify-end align-center py-2.5 px-6">
    <div className="navbar-end">
      <ThemeSwitch />
    </div>
  </nav>
);
