import * as Yup from "yup";
import { registerRequest } from "../features/auth/AuthActions";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "../components/FormInput";
import { FormButton } from "../components/FormButton";
import { FormSelect } from "../components/FormSelect";
import {
  clearRegisterDropDownOptions,
  fetchRegisterDropDownOptions,
} from "../features/app/appActions";
import { useEffect } from "react";
import { RootState } from "../store";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";

const registerSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  designation: Yup.string().required("Please select a designation."),
  username: Yup.string().required("Username is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .required("Please confirm your password."),
  role: Yup.string().required("Please select a role."),
  managerId: Yup.string().optional(),
});

const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  designation: "",
  username: "",
  confirmPassword: "",
  role: "",
  managerId: "",
};

const Register = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRegisterDropDownOptions());
    return () => {
      dispatch(clearRegisterDropDownOptions());
    };
  }, [dispatch]);

  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const isAdminMode = auth.role === "ADMIN";

  const roles = useSelector((state: RootState) => state.app.dropdowns.roles);

  let filterRoles = roles;
  if (!isAdminMode) {
    filterRoles = filterRoles.filter((role) => role.roleCode != "ADMIN");
  }

  const designations = useSelector(
    (state: RootState) => state.app.dropdowns.designations
  );
  const managers = useSelector(
    (state: RootState) => state.app.dropdowns.managers
  );
  const navigate = useNavigate();
  return (
    <div
      className={clsx("flex h-full flex-col justify-center items-center", {
        "-mt-3": !isAuthenticated,
        "mt-6": isAuthenticated,
      })}
    >
      <div className="relative sm:mx-auto">
        {!isAuthenticated && (
          <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        )}
        <div className="relative w-xl bg-white px-10 py-5 shadow-lg sm:rounded-3xl  dark:bg-gray-800">
          <div className="flex flex-row gap-4 pb-3 items-center">
            <div className="flex flex-col flex-2/3 shrink-0 ">
              <div className="text-xl font-medium">
                {isAdminMode
                  ? "Create an Admin Account | Envision"
                  : isAuthenticated
                    ? "Create an User Account | Envision"
                    : "Join Envision — Create Your Account"}
              </div>
            </div>
          </div>

          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values) => {
                dispatch(registerRequest(values));
              }}
            >
              {({ handleSubmit, resetForm, errors, touched }) => (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1/2">
                      <FormInput
                        name="firstName"
                        label="First Name"
                        type="text"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                    <div className="flex flex-col flex-1/2">
                      <FormInput
                        name="lastName"
                        label="Last Name"
                        type="text"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1/2">
                      <FormInput
                        name="username"
                        label="Username"
                        type="text"
                        errors={errors}
                        touched={touched}
                        autoComplete="false"
                      />
                    </div>
                    <div className="flex flex-col flex-1/2">
                      <FormInput
                        name="email"
                        label="Email"
                        type="email"
                        errors={errors}
                        touched={touched}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1/2">
                      <FormInput
                        type="password"
                        name="password"
                        label="Password"
                        errors={errors}
                        touched={touched}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="flex flex-col flex-1/2">
                      <FormInput
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        errors={errors}
                        touched={touched}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1/2">
                      <FormSelect name="role" label="Select Role">
                        {filterRoles.map((role) => (
                          <option key={`role-${role.id}`} value={role.roleCode}>
                            {role.roleName}
                          </option>
                        ))}
                      </FormSelect>
                    </div>
                    <div className="flex flex-col flex-1/2">
                      <FormSelect name="designation" label="Select Designation">
                        {designations.map((designation) => (
                          <option
                            key={`designation-${designation.id}`}
                            value={designation.designationCode}
                          >
                            {designation.designationName}
                          </option>
                        ))}
                      </FormSelect>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col flex-1/2">
                      <FormSelect name="managerId" label="Reporting Manager">
                        {managers.map((manager) => (
                          <option
                            key={`manager-${manager.userId}`}
                            value={manager.userId}
                          >
                            {[
                              manager.firstName,
                              manager.lastName,
                              `<${manager.email}>`,
                            ].join(" ")}
                          </option>
                        ))}
                      </FormSelect>
                    </div>
                    <div className="flex flex-col flex-1/2" />
                  </div>

                  <div className="flex flex-row justify-between gap-8 px-1 py-2">
                    <div className="flex flex-col flex-1/3">
                      <FormButton
                        type="button"
                        label="Back to Login"
                        onClick={() => navigate({ to: "/login" })}
                        color="accent"
                      />
                    </div>
                    <div className="flex flex-col flex-1/3">
                      <FormButton
                        type="reset"
                        label="Clear Form"
                        onClick={resetForm}
                        color="secondary"
                      />
                    </div>
                    <div className="flex flex-col flex-1/3">
                      <FormButton type="submit" label="Register" />
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
