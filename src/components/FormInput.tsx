import clsx from "clsx";
import { ErrorMessage, Field, FormikErrors, FormikValues } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  touched?: Record<string, boolean>;
  errors?: FormikErrors<FormikValues>;
  autoComplete?: string;
  rows?: number;
  enableResize?: boolean;
  maxLength?: number;
}

export const FormInput = ({
  name,
  label,
  type = "text",
  errors = {},
  touched = {},
  autoComplete,
  rows = 3,
  enableResize = false,
  maxLength = 0,
}: FormInputProps) => {
  const InputComponent = () => {
    if (type === "textarea") {
      return (
        <Field
          as={TextareaAutosize}
          rows={rows}
          name={name}
          autoComplete={autoComplete}
          className={clsx(
            "textarea textarea-primary w-full min-h-0",
            {
              "textarea-error": errors[name] && touched[name],
            },
            {
              "resize-none ": !enableResize,
            }
          )}
          placeholder={label}
          {...(maxLength > 0 && { maxLength })}
          required
        />
      );
    } else if (type === "quilltextarea") {
      return (
        <Field
          as={ReactQuill}
          rows={rows}
          name={name}
          autoComplete={autoComplete}
          className={clsx(
            "rounded-xl",
            {
              "border-2 border-red-400": errors[name] && touched[name],
            },
            {
              "resize-none ": !enableResize,
            }
          )}
          placeholder={label}
          {...(maxLength > 0 && { maxLength })}
          required
        />
      );
    }

    return (
      <Field
        type={type}
        name={name}
        autoComplete={autoComplete}
        className={clsx("input input-primary", {
          "input-error": errors[name] && touched[name],
        })}
        placeholder={label}
        required
      />
    );
  };
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 px-3 text-sm font-medium text-gray-900 dark:text-white flex justify-between align-bottom"
      >
        <span>{label}</span>
        {type === "textarea" && maxLength > 0 && (
          <span className="text-cyan-600">(Max {maxLength} characters)</span>
        )}
      </label>
      {InputComponent()}
      <div className="mt-1 min-h-6">
        <ErrorMessage
          name={name}
          component="div"
          className="text-sm text-red-600 px-3"
        />
      </div>
    </div>
  );
};
