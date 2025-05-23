import { ErrorMessage, Field, FieldProps } from "formik";
import { PropsWithChildren } from "react";

interface FormSelectProps {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  multiple?: boolean;
  defaultOptionLabel?: string;
  noDefaultOption?: boolean;
  noValidtion?: boolean;
}

export const FormSelect = ({
  name,
  label,
  children,
  autoComplete,
  multiple,
  defaultOptionLabel,
  noDefaultOption = false,
  noValidtion = false,
}: FormSelectProps & PropsWithChildren) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <select
            id={name}
            name={name}
            multiple={multiple}
            value={field.value}
            autoComplete={autoComplete}
            onChange={(event) => {
              form.setFieldValue(name, event.target.value);
            }}
            className={`select select-primary ${
              form.errors[name] && form.touched[name]
                ? "border-red-500 focus:ring-red-500"
                : ""
            }`}
          >
            {!noDefaultOption && (
              <option value="">{defaultOptionLabel ?? "Please select"}</option>
            )}
            {children}
          </select>
        )}
      </Field>
      {!noValidtion && (
        <div className="mt-1 min-h-6">
          <ErrorMessage
            name={name}
            component="div"
            className="text-sm font-semibold text-red-500"
          />
        </div>
      )}
    </div>
  );
};
