import { useState } from 'react';
import './App.css'

function App() {
const [menuOpen, setMenuOpen] = useState(false);
const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="p-12 bg-white dark:bg-[#0f172a]">
        {/* Navbar */}
        <nav className="p-6 bg-blue-600 text-white dark:bg-[#312e81] dark:text-[#cbd5e1]">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">WeatherLink</h1>

            {/* Hamburger Menu for Mobile */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xlmns="https://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            {/* Links for Larger Screens */}
            <ul className="hidden md:flex space-x-3">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Features</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300">Log in</a></li>
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
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Features</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300">Log in</a></li>
              <li> {/* Button to toggle dark mode */}
              <button onClick={() => setDarkMode(!darkMode)} 
              className="ml-1 px-2 py-1 bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button></li>
            </ul>
          )}
          
          
        </nav>

        {/* Check Weather Section */}
        <header className="bg-blue-500 text-white py-24 text-center dark:bg-[#1e1b4b] dark:text-[#cbd5e1]">
          <h2 className="text-4xl font-bold">Get the Latest Weather Updates</h2>
          <p className="mt-4 text-lg">Stay updated with accurate weather information, forecasts, and more.</p>
          <button className="mt-8 px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg dark:bg-[#312e81]">Check Weather Now</button>
        </header>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-[#0f172a] dark:text-[#cbd5e1]">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center">
                <h4 className="text-xl font-semibold">Accurate Forecasts</h4>
                <p className="mt-4">Get up-to-the-minute weather reports based on your location.</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center">
                <h4 className="text-xl font-semibold">Interactive Maps</h4>
                <p className="mt-4">Visualize weather patterns with dynamic weather maps.</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center">
                <h4 className="text-xl font-semibold">Alerts & Warnings</h4>
                <p className="mt-4">Receive timely alerts on severe weather conditions in your area.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-blue-600 dark:bg-[#312e81] dark:text-[#cbd5e1] text-white text-center">
          <p>&copy; 2024 WeatherLink. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App
