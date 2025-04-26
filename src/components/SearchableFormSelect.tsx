import { ErrorMessage, Field, FieldProps } from "formik";
import Select from "react-select";

export interface OptionType {
  label: string;
  hint?: string;
  value: string | number;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: OptionType[];
  isMulti?: boolean;
  noValidtion?: boolean;
}

export const SearchableFormSelect = ({
  name,
  label,
  options,
  isMulti = false,
  noValidtion = false,
}: FormSelectProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const selectedValue = isMulti
            ? options.filter((option) =>
                Array.isArray(field.value)
                  ? field.value.includes(option.value)
                  : false
              )
            : options.find((option) => option.value === field.value) || null;

          return (
            <Select
              id={name}
              name={name}
              options={options}
              isMulti={isMulti}
              value={selectedValue}
              formatOptionLabel={(data) => data.hint ?? data.label}
              onChange={(selected) => {
                const value = isMulti
                  ? (selected as OptionType[]).map((option) => option.value)
                  : ((selected as OptionType | null)?.value ?? "");
                form.setFieldValue(name, value);
              }}
              components={{
                // removes the line between value and chevron
                IndicatorSeparator: () => null,
              }}
              classNames={{
                control: ({ isFocused }) =>
                  `select h-auto  select-primary w-full p-2 ring-2 ring-transparent  ${
                    isFocused ? "ring-2 ring-primary" : ""
                  }`,
                indicatorsContainer: () => "px-1",
                option: ({ isFocused, isSelected }) =>
                  `p-2 cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white"
                      : isFocused
                        ? "bg-primary/20"
                        : ""
                  }`,
                menu: () =>
                  "shadow-lg border border-base-200 rounded-lg mt-1 bg-base-100",
                singleValue: () => "text-base-content",
                multiValue: () =>
                  "bg-primary text-white px-2 py-1 rounded mr-1 mb-1 text-sm",
                multiValueLabel: () => "text-white",
                multiValueRemove: () => "ml-1 text-white  cursor-pointer",
              }}
              unstyled
            />
          );
        }}
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
