import { Outlet, useNavigate } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "./store";
import Loader from "./components/Loader";
import { useDynamicTitle } from "./utils/useDynamicPageTitle";
import { clearNavigationTarget } from "./features/app/appSlice";
import CustomToast from "./components/CustomToast";
import SubmitNewIdeaModal from "./components/SubmitIdeaModal";

const App = () => {
  const theme = useSelector((state: RootState) => state.app.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isCreatIdeaModalOpen, setIsCreatIdeaModalOpen] = useState(false);

  useDynamicTitle();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const path = useSelector((state: RootState) => state.app.navigationTarget);

  useEffect(() => {
    if (path) {
      navigate({ to: path });
      dispatch(clearNavigationTarget());
    }
  }, [path, navigate, dispatch]);
  return (
    <div className="relative transition-all duration-1000 ease-in-out bg-gray-100 dark:bg-gray-900">
      <Loader />
      <Navbar openSubmitIdeaModal={() => setIsCreatIdeaModalOpen(true)} />
      <CustomToast />
      <SubmitNewIdeaModal
        isOpen={isCreatIdeaModalOpen}
        onClose={() => setIsCreatIdeaModalOpen(false)}
      />
      <div className="h-screen-minus-nav">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
