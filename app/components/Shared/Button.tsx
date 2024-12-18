import React from "react";
import FormGroup from "@/components/Shared/FormGroup"

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  className = "",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded focus:outline-none transition ${!className && ( // if className is empty , then go to default
        disabled
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white"
      )} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;


{/* <Button onClick={() => alert("Button clicked!")}>Click Me</Button> */}