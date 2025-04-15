import clsx from "clsx";
interface FormButtonProps {
  label: string;
  onClick?: () => void;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "neutral";
  style?: "dashed" | "outline" | "link" | "ghost" | "soft";
  behaviour?: "active" | "disabled";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  modifier?: "wide" | "block" | "circle" | "square";
  type?: "button" | "submit" | "reset";
}
export const FormButton: React.FC<FormButtonProps> = ({
  label,
  type = "button",
  color = "primary",
  style = "",
  behaviour,
  modifier,
  size,
  onClick,
}) => {
  const btnStyles = clsx(
    "btn",
    { [`btn-${style}`]: style.length > 0 },
    { [`btn-${behaviour}`]: behaviour?.length ?? 0 > 0 },
    { [`btn-${modifier}`]: modifier?.length ?? 0 > 0 },

    { [`btn-${color}`]: color.length > 0 },
    { [`btn-${size}`]: size?.length ?? 0 > 0 }
  );
  return (
    <button type={type} className={btnStyles} onClick={onClick}>
      {label}
    </button>
  );
};
