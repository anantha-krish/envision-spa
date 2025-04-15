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

const registerSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
  role: Yup.string().required("Required"),
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

  const roles = useSelector((state: RootState) => state.app.dropdowns.roles);
  const designations = useSelector(
    (state: RootState) => state.app.dropdowns.designations
  );
  const managers = useSelector(
    (state: RootState) => state.app.dropdowns.managers
  );
  const navigate = useNavigate();

  return (
    <div className="bg-gray-400 border-2 border-gray-300 rounded-lg p-4 w-full max-w-xl mx-auto mt-10 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            dispatch(registerRequest(values));
          }}
        >
          {({ handleSubmit, handleChange, errors, touched }) => (
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
                  <FormInput
                    name="username"
                    label="Username"
                    type="text"
                    errors={errors}
                    touched={touched}
                    autoComplete="false"
                  />

                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    errors={errors}
                    touched={touched}
                    autoComplete="off"
                  />

                  <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    errors={errors}
                    touched={touched}
                    autoComplete="new-password"
                  />

                  <FormInput
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    errors={errors}
                    touched={touched}
                    autoComplete="new-password"
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
                  <FormSelect
                    name="role"
                    label="Select Role"
                    defaultValue={""}
                    onChange={handleChange}
                  >
                    {roles.map((role) => (
                      <option key={`role-${role.id}`} value={role.roleCode}>
                        {role.roleName}
                      </option>
                    ))}
                  </FormSelect>
                  <FormSelect
                    name="designation"
                    label="Select Designation"
                    defaultValue={""}
                    onChange={handleChange}
                  >
                    {designations.map((designation) => (
                      <option
                        key={`designation-${designation.id}`}
                        value={designation.designationCode}
                      >
                        {designation.designationName}
                      </option>
                    ))}
                  </FormSelect>

                  <FormSelect
                    name="managerId"
                    label="Reporting Manager"
                    defaultValue={""}
                    onChange={handleChange}
                  >
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
              </div>
              <div className="flex flex-row justify-between gap-4 px-1 py-2">
                <FormButton
                  type="button"
                  label="Back to Login"
                  onClick={() => navigate({ to: "/login" })}
                  color="secondary"
                />
                <FormButton type="submit" label="Register" />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
