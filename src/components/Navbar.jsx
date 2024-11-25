import React from 'react'
import { useState } from 'react';
import { useTranslation } from '../routes/TranslationContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { translatedText } = useTranslation(); // Translation hook

  return (
    <div className={darkMode ? 'dark' : ''} >
        <nav className="text-black dark:bg-[#312e81] dark:text-[#cbd5e1]">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">WeatherLink</h1>

      {/* Hamburger Menu for Mobile */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xlmns="https://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Links for Larger Screens */}
      <ul className="hidden md:flex space-x-6">
      <li><Link to = "/" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{translatedText.Home}</Link></li>
      <li><Link to="/tailored-advice" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Tailored Advice</Link></li>
      <li><Link to = "/news" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">News</Link></li>
      <li><Link to = "/contact" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{translatedText.Contact}</Link></li>
      <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{translatedText.logIn}</a></li>
        <li> {/* Button to toggle dark mode */}
        <button onClick={() => setDarkMode(!darkMode)} 
        className="ml-1 px-2 py-1 text-sm bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button></li>
      </ul>
    </div>

    {/* Links for Smaller Screens, Toggled by Hamburger Button */}
    {menuOpen && (
    <ul className="md:hidden flex flex-col space-y-4 mt-4 text-center">
    <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{translatedText.Home}</a></li>
    <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{translatedText.Features}</a></li>
    <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{translatedText.Contact}</a></li>
    <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{translatedText.logIn}</a></li>
        <li> {/* Button to toggle dark mode */}
        <button onClick={() => setDarkMode(!darkMode)} 
        className="ml-1 px-2 py-1 bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button></li>
      </ul>
    )}
    
    
  </nav>
 </div>
  )
}

export default Navbar