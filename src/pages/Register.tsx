import * as Yup from "yup";
import { registerRequest } from "../features/auth/AuthActions";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

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
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          dispatch(registerRequest(values));
        }}
      >
        {}
      </Formik>
    </div>
  );
};

export default Register;
