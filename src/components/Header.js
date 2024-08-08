import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">
          <Link to="/">OlaPathFinder</Link>
        </div>
        <nav className="hidden md:flex space-x-8">
        
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/planner" className="text-gray-700 hover:text-blue-500">Planner</Link>
          <Link to="/Maps" className="text-gray-700 hover:text-blue-500">OLA Map</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="px-4 py-2 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-blue-500">Home</Link>
            <Link to="/planner" className="block text-gray-700 hover:text-blue-500">Planner</Link>
            <Link to="/Maps" className="text-gray-700 hover:text-blue-500">OLA Map</Link>
            <Link to="/about" className="block text-gray-700 hover:text-blue-500">About</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-500">Contact</Link>
            <Link to="/login" className="block text-blue-500 hover:underline">Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;















