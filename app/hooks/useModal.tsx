'use client'
import React, { useState, useCallback, ReactNode } from "react";

interface UseModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  Modal: React.FC<ModalProps>;
}

interface ModalProps {
  children: ReactNode;
}

export const useModal = (width: string = "w-96"): UseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  // Modal Component
  const Modal: React.FC<ModalProps> = ({ children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`bg-white p-6 rounded shadow-lg ${width} relative`}>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            ✕
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
