import React from "react";

export const Footer = () => {
  return (
    <footer className="h-max bottom-0 w-full bg-white shadow-inner px-4 py-12">
      <div
        className="mx-auto flex flex-col lg:flex-row justify-center lg:justify-between 
    items-center px-4 sm:px-6 md:px-8"
      >
        <p className="text-gray-600 text-center lg:text-left mb-2 lg:mb-0">
          &copy; 2024 Quanta
        </p>

        <nav className="flex flex-wrap justify-center lg:justify-end space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Terms of Service
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
};
