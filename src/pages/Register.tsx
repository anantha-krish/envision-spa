import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerRequest } from "../features/auth/AuthActions";

const Register = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
              .min(6, "Min 6 characters")
              .required("Required"),
          })}
          onSubmit={(values) => {
            dispatch(registerRequest(values));
          }}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Field name="name" className="input" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field name="email" type="email" className="input" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <Field name="password" type="password" className="input" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
