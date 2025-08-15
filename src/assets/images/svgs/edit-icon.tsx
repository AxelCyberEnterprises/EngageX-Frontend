import React from "react";

export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Allows passing extra props like className, onClick, etc.
  >
    <path
      d="M9.33398 23.5003H22.6673M10.7223 16.9894C10.367 17.3456 10.1674 17.8281 10.1673 18.3311V21.0003H12.8532C13.3565 21.0003 13.839 20.8003 14.1948 20.4436L22.1115 12.5228C22.4667 12.1666 22.6661 11.6841 22.6661 11.1811C22.6661 10.6781 22.4667 10.1956 22.1115 9.83945L21.3298 9.05611C21.1535 8.87974 20.9442 8.73984 20.7138 8.64442C20.4834 8.549 20.2365 8.49992 19.9871 8.5C19.7378 8.50008 19.4909 8.54931 19.2605 8.64487C19.0302 8.74044 18.821 8.88046 18.6448 9.05695L10.7223 16.9894Z"
      stroke="#474D63"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

