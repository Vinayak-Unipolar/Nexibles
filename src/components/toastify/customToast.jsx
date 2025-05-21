// CustomToast.jsx
'use client';

import React from "react";
import { toast, cssTransition } from "react-toastify";

// Define custom toast transition if needed
const toastTransition = cssTransition({
 enter: 'animate__animated animate__fadeIn',
 exit: 'animate__animated animate__fadeOut',

  duration: [300, 300]
});

// Configure toast defaults globally (call this in your app initialization)
export const configureToasts = () => {
  // Set default configuration for all toasts
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: toastTransition,
  });
};

// Success toast content component
const SuccessToastContent = ({ message }) => (
  <div className="flex items-center">
    <div className="shrink-0">
      <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </span>
    </div>
    <div className="ms-3">
      <h3 className="text-gray-800 font-semibold dark:text-white">Success</h3>
      <p className="text-sm text-gray-700 dark:text-neutral-400">{message}</p>
    </div>
  </div>
);

// Error toast content component
const ErrorToastContent = ({ message }) => (
  <div className="flex items-center">
    <div className="shrink-0">
      <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </div>
    <div className="ms-3">
      <h3 className="text-gray-800 font-semibold dark:text-white">Error</h3>
      <p className="text-sm text-gray-700 dark:text-neutral-400">{message}</p>
    </div>
  </div>
);

// Warning toast content component
const WarningToastContent = ({ message }) => (
  <div className="flex items-center">
    <div className="shrink-0">
      <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-yellow-100 bg-yellow-200 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-800 dark:text-yellow-400">
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 9v2m0 4h.01"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </span>
    </div>
    <div className="ms-3">
      <h3 className="text-gray-800 font-semibold dark:text-white">Warning</h3>
      <p className="text-sm text-gray-700 dark:text-neutral-400">{message}</p>
    </div>
  </div>
);

// Toast display functions
export const showSuccessToast = (message) => {
  return toast.success(<SuccessToastContent message={message} />, {
    className: "!bg-teal-50 !border-t-2 !border-teal-500 !rounded-lg !p-4 dark:!bg-teal-800/30",
    bodyClassName: "!p-0 !m-0", // Override default padding
    progressClassName: "!bg-teal-500",
    style: { background: "transparent" }, // Ensure background doesn't override
  });
};

export const showErrorToast = (message) => {
  return toast.error(<ErrorToastContent message={message} />, {
    className: "!bg-red-50 !border-s-4 !border-red-500 !p-4 dark:!bg-red-800/30",
    bodyClassName: "!p-0 !m-0", // Override default padding
    progressClassName: "!bg-red-500",
    style: { background: "transparent" }, // Ensure background doesn't override
  });
};

export const showWarningToast = (message) => {
  return toast.warning(<WarningToastContent message={message} />, {
    className: "!bg-yellow-50 !border-l-4 !border-yellow-400 !p-4 dark:!bg-yellow-800/30",
    bodyClassName: "!p-0 !m-0", // Override default padding
    progressClassName: "!bg-yellow-400",
    style: { background: "transparent" }, // Ensure background doesn't override
  });
};

// Main showToast function
export const showToast = ({ type, message, title }) => {
  const displayMessage = message || title || '';
  
  switch (type?.toLowerCase()) {
    case 'success':
      return showSuccessToast(displayMessage);
    case 'error':
      return showErrorToast(displayMessage);
    case 'warning':
      return showWarningToast(displayMessage);
    default:
      return showSuccessToast(displayMessage);
  }
};

// Export components for direct usage if needed
export { SuccessToastContent, ErrorToastContent, WarningToastContent };