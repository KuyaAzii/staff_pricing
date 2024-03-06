//components/Button.tsx
"use client";
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
    >
      {children}
    </button>
  );
};

export default Button;