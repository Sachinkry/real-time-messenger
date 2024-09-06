"use client";

import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Return null if the modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Overlay */}
      <div
        className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose} // Close the modal when clicking on the overlay
      ></div>

      {/* Modal Panel */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full max-w-lg">
        {/* Close Button */}
        <div className="absolute right-0 top-0 pr-4 pt-4 z-10">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 bg-red-200">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
