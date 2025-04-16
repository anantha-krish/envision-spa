import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FormButton } from "../components/FormButton";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;
  return (
    <section className="flex flex-col h-full px-20 py-15 justify-center items-center">
      <div className="container text-center gap-8 flex flex-col items-center  text-2xl ">
        <img src={envisionLogo} className="h-40 w-auto inline aspect-square" />
        <h3>
          You've been <strong>logged out</strong> for now.
        </h3>
        <p>Every great idea starts with a fresh mind! </p>
        <p>
          Take a break, and <strong className="uppercase">Envision</strong> will
          be here to welcome you back.
        </p>
        <div></div>
        <div className="w-1/3">
          <FormButton
            label="Go to Login"
            color="info"
            modifier="block"
            size="lg"
            onClick={() => navigate({ to: "/login" })}
          />
        </div>
      </div>
    </section>
  );
};
