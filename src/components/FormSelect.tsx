import { ErrorMessage } from "formik";
import { PropsWithChildren } from "react";
interface FormSelectProps {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  touched?: Record<string, boolean>;
  errors?: Record<string, string>;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  autoComplete?: string;
  options?: Array<{ key: string; value: string; label: string }>;
}

export const FormSelect = ({
  name,
  label,
  children,
  errors = {},
  onChange,
  touched = {},
  defaultValue = "",
  autoComplete,
}: FormSelectProps & PropsWithChildren) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        onChange={onChange}
        className={`select select-primary ${
          errors[name] && touched[name]
            ? "border-red-500! focus:ring-red-500!"
            : ""
        }`}
      >
        {children}
      </select>
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
