import React, { useState } from 'react';
import { useTranslation } from '../routes/TranslationContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { translatedText } = useTranslation(); // Translation hook

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav className="navbar text-black dark:bg-[#312e81] dark:text-[#cbd5e1] shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600 dark:text-[#cbd5e1]">
            WeatherLink
          </h1>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-600 dark:text-[#cbd5e1] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Links for Larger Screens */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link
                to="/"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.Home}
              </Link>
            </li>
            <li>
              <Link
                to="/tailored-advice"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                Tailored Advice
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.Features}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.Contact}
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.logIn}
              </Link>
            </li>
            <li>
              {/* Button to toggle dark mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="dark-mode-toggle ml-1"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </div>

        {/* Links for Smaller Screens, Toggled by Hamburger Button */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col space-y-4 bg-white dark:bg-[#1e1b4b] text-center p-4">
            <li>
              <Link
                to="/"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.Home}
              </Link>
            </li>
            <li>
              <Link
                to="/tailored-advice"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                Tailored Advice
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.Features}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.Contact}
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="nav-link hover:bg-blue-700 dark:hover:bg-[#1e1b4b]"
              >
                {translatedText.logIn}
              </Link>
            </li>
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="dark-mode-toggle"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
