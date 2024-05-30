// components/Notification.js

import React, { useState } from "react";

const Notification = ({ message, onClose }) => {
  const [showNotification, setShowNotification] = useState(true);

  const handleClose = () => {
    setShowNotification(false);
    onClose(); // Notify parent component (if needed)
  };

  return (
    <>
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded-md shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 00-1.414 0L10 8.586 6.707 5.293a1 1 0 10-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
