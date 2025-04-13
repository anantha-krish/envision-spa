import * as Yup from "yup";
import { registerRequest } from "../features/auth/AuthActions";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { FormInput } from "../components/FormInput";
import { FormButton } from "../components/FormButton";

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
};

const Register = () => {
  const dispatch = useDispatch();

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
                    name="firstName"
                    label="First Name"
                    type="text"
                    errors={errors}
                    touched={touched}
                  />

                  <FormInput
                    name="lastName"
                    label="Last Name"
                    type="text"
                    errors={errors}
                    touched={touched}
                  />
                  <select name="designation" onChange={handleChange}>
                    <option value="" label="Select designation" />
                  </select>

                  <select name="role" onChange={handleChange}>
                    <option value="" label="Select role" />
                    <option value="admin" label="Admin" />
                    <option value="user" label="User" />
                    <option value="guest" label="Guest" />
                  </select>
                </div>
              </div>
              <FormButton type="submit" label="Register" style={"primary"} />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
