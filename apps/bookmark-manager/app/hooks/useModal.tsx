'use client'
import React, { useState, useCallback, useEffect } from "react";
import { X } from 'lucide-react';
import { UseModalType, ModalProps } from "@/types/types";


export const useModal = (customClass: string = ""): UseModalType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  // Modal Component
  const Modal: React.FC<ModalProps> = ({ children }) => {
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeModal]);

    if (!isOpen) return null;

    return (
      <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`inner-modal bg-white p-6 rounded shadow-lg ${customClass} relative`}>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            <X />
          </button>
          {children}
        </div>
      </div>
    );
  };

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    Modal,
  };
};
