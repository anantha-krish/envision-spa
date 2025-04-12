import { Form, Formik } from "formik";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginRequest } from "../features/auth/AuthActions";
import { useNavigate } from "@tanstack/react-router";
import { FormInput } from "../components/FormInput";
import { FormButton } from "../components/FormButton";
import { useEffect } from "react";
import { RootState } from "../store";
import { toggleTheme } from "../features/theme/themeSlice";
const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

const Login = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12 dark:bg-gray-900">
      <div className="relative py-3 sm:mx-auto">
        <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div className="relative bg-white p-10 pt-0 shadow-lg sm:rounded-3xl  dark:bg-gray-800">
          <div className="w-full flex justify-end align-center py-4 ">
            <div
              className={`w-20 p-0.5 border-2 border-sky-700 rounded-full flex items-center ${theme === "light" ? "justify-start:" : "justify-end"}`}
            >
              {theme === "light" ? (
                <button
                  className="hover:cursor-pointer p-0.5 border-2 border-sky-700 rounded-full bg-sky-600 text-white dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-800 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => dispatch(toggleTheme())}
                >
                  <SunIcon className="w-6" />
                </button>
              ) : (
                <button
                  className="hover:cursor-pointer p-0.5 border-2 bg-sky-600 border-sky-700 rounded-full dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-800 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => dispatch(toggleTheme())}
                >
                  <MoonIcon className="w-6 text-white" />
                </button>
              )}
            </div>
          </div>
          <div className="mx-auto max-w-lg space-y-4">
            <div className="mx-auto flex w-70 justify-center">
              <img
                src={envisionLogo}
                alt="Envision Logo"
                className="h-35 w-auto"
              />
            </div>
            <div>
              <h1 className="text-center text-2xl font-semibold text-sky-800 dark:text-white">
                ENVISION
              </h1>
            </div>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              dispatch(loginRequest(values));
            }}
          >
            {({ errors, touched }) => (
              <Form className="divide-y divide-gray-200">
                <div className="space-y-1 pt-6 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <FormInput
                    name="email"
                    label={"Email Address"}
                    errors={errors}
                    touched={touched}
                  />

                  <FormInput
                    name="password"
                    label={"Password"}
                    type="password"
                    errors={errors}
                    touched={touched}
                  />

                  <div className="flex flex-row justify-between gap-4 px-1 py-2">
                    <FormButton label="Login" style="primary" type="submit" />
                    <FormButton
                      label="Register"
                      style="secondary"
                      onClick={() =>
                        navigate({
                          to: "/register",
                        })
                      }
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
