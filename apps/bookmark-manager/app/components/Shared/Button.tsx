import React from "react";
import FormGroup from "@/components/Shared/FormGroup";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  className = "",
  disabled = false,
  onClick,
  tooltip,
}) => {
  const buttonElement = (
    <button
      type={type}
      className={`px-4 py-2 rounded focus:outline-none transition ${
        !className &&
        (disabled
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white")
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );

  // If tooltip is provided, wrap the button in a container that handles tooltip visibility.
  if (tooltip) {
    return (
      <div className="relative inline-block group">
        {buttonElement}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
            {tooltip}
          </div>
        </div>
      </div>
    );
  }

  return buttonElement;
};

export default Button;
