import React, { useState } from "react";
import FormGroup from "@/components/Shared/FormGroup"
import { AnyAaaaRecord } from "node:dns";


interface DropdownProps {
  /**
   * List of items to display in the dropdown.
   * Each item can have a `label` and an `onClick` callback.
   */
  items: { label: string; onClick: () => void }[];

  /**
   * The label to display for the dropdown button.
   */
  buttonLabel: string;
  keyLabel: string;
  onItemClick: (value: any)=> void
}

const Dropdown: React.FC<DropdownProps> = ({ items, buttonLabel, keyLabel, onItemClick }) => {

  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (value: any) => {
    onItemClick(value)
    setIsOpen(false);
  };

  return (
    <FormGroup>
      {buttonLabel && (
        <label htmlFor={buttonLabel} className="text-sm font-semibold text-gray-700">
          {buttonLabel}
        </label>
      )}
        <div className="relative inline-block text-left">

        <button
            onClick={toggleDropdown}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {buttonLabel}
            <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
            />
            </svg>
        </button>

        {isOpen && (
            <div
            className="origin-top-right absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            >
            <div className="py-1">
                {items.map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                    {item[keyLabel]}
                </button>
                ))}
            </div>
            </div>
        )}
        </div>
    </FormGroup>
  );
};

export default Dropdown;
