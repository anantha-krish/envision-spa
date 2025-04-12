interface FormButtonProps {
  label: string;
  onClick?: () => void;
  style: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}
export const FormButton: React.FC<FormButtonProps> = ({
  label,
  type = "button",
  style,
  onClick,
}) => {
  let buttonStyles =
    "w-full rounded-md px-4 py-1 transition duration-150 ease-in-out hover:cursor-pointer focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:outline-none ";
  const primaryClass = "text-white bg-sky-600 dark:hover:bg-sky-800 ";
  const secondaryClass =
    "border text-sky-900  bg-transparent dark:text-sky-300 dark:hover:bg-sky-950";

  switch (style) {
    case "primary":
      buttonStyles += primaryClass;
      break;
    case "secondary":
      buttonStyles += secondaryClass;
      break;
    default:
      buttonStyles += primaryClass;
  }
  return (
    <button type={type} className={buttonStyles} onClick={onClick}>
      {label}
    </button>
  );
};
