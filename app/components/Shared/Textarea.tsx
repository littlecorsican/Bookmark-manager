import React, {forwardRef} from "react";
import FormGroup from "@/components/Shared/FormGroup"

interface TextareaProps {
  /**
   * The current value of the textarea
   */
  value: string;

  /**
   * Callback function to handle textarea changes
   */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Placeholder text for the textarea
   */
  placeholder?: string;

  /**
   * Additional CSS classes for custom styling
   */
  className?: string;

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;

  /**
   * Label text for the textarea field
   */
  label?: string;

  /**
   * ID for the textarea (used for associating with label)
   */
  id: string;

  /**
   * Rows for the textarea element (default to 4)
   */
  rows?: number;
}

const Textarea = forwardRef<HTMLInputElement, TextareaProps>(({
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  label,
  id,
  rows = 4,
}, ref) => {
  return (
    <FormGroup>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        } ${className}`}
      />
    </FormGroup>
  );
});

export default Textarea;
