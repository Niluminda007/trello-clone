import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed h-[80px] bottom-0 w-full bg-white shadow-inner py-4 mt-8">
      <div className=" mx-auto flex justify-between items-center px-6">
        <p className="text-gray-600">&copy; 2024 Quanta</p>
        <nav className="space-x-4">
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
