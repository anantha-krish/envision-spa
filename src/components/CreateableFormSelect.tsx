import { ErrorMessage, Field, FieldProps } from "formik";
import CreatableSelect from "react-select/creatable";

export interface SelectOptionType {
  label: string;
  hint?: string;
  value: string | number;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: SelectOptionType[];
  isMulti?: boolean;
  onCreateOption?: (inputValue: string) => Promise<SelectOptionType>;
}

export const CreatableFormSelect = ({
  name,
  label,
  options,
  isMulti = false,
  onCreateOption,
}: FormSelectProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
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
            <CreatableSelect
              id={name}
              tabIndex={-1}
              name={name}
              options={options}
              isMulti={isMulti}
              value={selectedValue}
              formatOptionLabel={(data) => data.hint ?? data.label}
              onChange={(selected) => {
                const value = isMulti
                  ? (selected as SelectOptionType[]).map(
                      (option) => option.value
                    )
                  : ((selected as SelectOptionType | null)?.value ?? "");
                form.setFieldValue(name, value);
              }}
              onCreateOption={async (inputValue) => {
                if (onCreateOption) {
                  const newOption = await onCreateOption(inputValue);
                  form.setFieldValue(
                    name,
                    isMulti
                      ? [...(field.value || []), newOption.value]
                      : newOption.value
                  );
                }
              }}
              components={{
                IndicatorSeparator: () => null,
              }}
              classNames={{
                control: ({ isFocused }) =>
                  `select h-auto select-primary w-full p-2 ${
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
                multiValueRemove: () => "ml-1 text-white cursor-pointer",
              }}
              unstyled
            />
          );
        }}
      </Field>
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
