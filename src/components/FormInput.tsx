import { ErrorMessage, Field } from "formik";
interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  touched?: Record<string, boolean>;
  errors?: Record<string, string>;
  autoComplete?: string;
}

export const FormInput = ({
  name,
  label,
  type = "text",
  errors = {},
  touched = {},
  autoComplete,
}: FormInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Field
        type={type}
        name={name}
        autoComplete={autoComplete}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-sky-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
          errors[name] && touched[name]
            ? "border-red-500! focus:ring-red-500!"
            : ""
        }`}
        required
      />
      <div className="mt-1 min-h-6">
        <ErrorMessage
          name={name}
          component="div"
          className="text-sm font-semibold text-red-500"
        />
      </div>
    </div>
  );
};
