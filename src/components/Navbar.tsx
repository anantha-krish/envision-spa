import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { RootState } from "../store";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  if (!token) return null;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">IdeaApp</div>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <button
          onClick={() => dispatch(logout())}
          className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
