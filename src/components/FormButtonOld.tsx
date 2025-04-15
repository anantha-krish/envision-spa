import clsx from "clsx";
interface FormButtonProps {
  label: string;
  onClick?: () => void;
  style: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}
export const FormButtonOld: React.FC<FormButtonProps> = ({
  label,
  type = "button",
  style,
  onClick,
}) => {
  const buttonStyles = clsx(
    "btn rounded-md px-4 py-1  transition duration-150 ease-in-out hover:cursor-pointer focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:outline-none ",
    {
      " text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800":
        style === "primary",
      "border text-sky-900 bg-transparent hover:bg-sky-100 dark:text-sky-300 dark:hover:bg-sky-950 ":
        style === "secondary",
    }
  );

  return (
    <button type={type} className={buttonStyles} onClick={onClick}>
      {label}
    </button>
  );
};
