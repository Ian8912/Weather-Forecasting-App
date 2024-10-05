import React, { useState, useEffect } from 'react';
import './App.css'
import CoordinateInputCard from './components/CoordinateInputCard';
import FeatureDisplaySection from './components/FeatureDisplaySection';
import FeatureForm from './components/FeatureForm';
import WeatherPage from './routes/WeatherCoordsPage';



function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));

    

  }, []);

  function sendLatLongCoords() {}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // console log default until API call is implemented
    // API call goes here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
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
            <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Home</a></li>
            <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Features</a></li>
            <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Contact</a></li>
            <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Log in</a></li>
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
          <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Home</a></li>
          <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Features</a></li>
          <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Contact</a></li>
          <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Log in</a></li>
              <li> {/* Button to toggle dark mode */}
              <button onClick={() => setDarkMode(!darkMode)} 
              className="ml-1 px-2 py-1 bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button></li>
            </ul>
          )}
          
          
        </nav>

      {/* Check Weather Section */}
      <header className="bg-blue-500 dark:bg-[#1e1b4b] dark:text-[#cbd5e1] flex-col text-white py-24 text-center">
        <h2 className="text-4xl font-bold">Get the Latest Weather Updates</h2>
        
        <p className="mt-4 text-lg">Stay updated with accurate weather information, forecasts, and more.</p>
        <div className='mt-4'>
          <a href={'/weather/coords'} className="mt-6 px-6 py-3 bg-blue-700 dark:bg-[#312e81] dark:text-[#cbd5e1] dark:hover:bg-[#4c1d95] hover:bg-blue-800 rounded-lg"
          >
            Check Weather Now
          </a>
        </div>
      </header>

      {/* Display fetched weather data */}
      {weatherData ? (
        <section className="py-8">
        <div className="container mx-auto text-center">
          <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Weather for {weatherData.city}</h3>
            <p className="text-lg">Temperature: {weatherData.temperature} °C</p>
            <p className="text-lg">Condition: {weatherData.description}</p>
            <p className="text-lg">Humidity: {weatherData.humidity}%</p>
            <p className="text-lg">Wind Speed: {weatherData.wind_speed} m/s</p>
          </div>
        </div>
      </section>
      ) : (
        <p className="text-center dark:text-[#cbd5e1]">Loading weather data...</p>
      )}
     <CoordinateInputCard />
     <FeatureDisplaySection />
     

   

        {/* Footer */}
        <footer className="py-8 bg-blue-600 dark:bg-[#312e81] dark:text-[#cbd5e1] text-white text-center">
          <p>&copy; 2024 WeatherLink. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App
