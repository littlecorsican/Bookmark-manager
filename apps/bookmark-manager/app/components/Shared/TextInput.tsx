import React, { forwardRef } from "react";
import FormGroup from "../Shared/FormGroup";

interface InputProps {
  /**
   * The current value of the input
   */
  value: string;

  /**
   * Callback function to handle input changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback function to handle keydown events
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Additional CSS classes for custom styling
   */
  className?: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * The HTML `type` attribute of the input (e.g., "text", "password", "email")
   */
  type?: "text" | "password" | "email" | "number";

  /**
   * Whether the input should be required
   */
  required?: boolean;

  /**
   * Label text for the input field
   */
  label?: string;

  /**
   * ID for the input (used for associating with label)
   */
  id: string;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  className = "",
  disabled = false,
  required = false,
  label,
  id,
  type = "text",
}, ref) => {
  return (
    <FormGroup label={label}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        } ${className}`}
      />
    </FormGroup>
  );
});

export default TextInput;
