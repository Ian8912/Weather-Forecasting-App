import React, { useState, useEffect } from 'react';
import './App.css';

// Functional component for the loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="spinner"></div>
    <p className="dark:text-[#cbd5e1] text-lg ml-4">Loading weather data...</p>
  </div>
);

// Functional component for displaying weather data
const WeatherData = ({ weatherData }) => (
  <section className="py-8">
    <div className="container mx-auto text-center">
      <h3 className="text-2xl font-bold">Weather for {weatherData.city}</h3>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Description: {weatherData.description}</p>
      <p>Forecast: {weatherData.forecast}</p>
    </div>
  </section>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to track data fetching
  const [city, setCity] = useState(''); // Update state in app to handle city input

  // useEffect hook to fetch weather data on component mount
  useEffect(() => {
    setLoading(true); // Start loading
    fetch('http://localhost:5000/weather')
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    fetch(`http://localhost:5000/weather?city=${city}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false); // Stop loading even if there's an error
      });
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
              <li>
                <button onClick={() => setDarkMode(!darkMode)} 
                  className="ml-1 px-2 py-1 text-sm bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </div>
  
          {menuOpen && (
            <ul className="md:hidden flex flex-col space-y-4 mt-4 text-center">
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Features</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Log in</a></li>
              <li>
                <button onClick={() => setDarkMode(!darkMode)} 
                  className="ml-1 px-2 py-1 bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          )}
        </nav>
  
        {/* Check Weather Section */}
        <header className="bg-blue-500 dark:bg-[#1e1b4b] dark:text-[#cbd5e1] text-white py-24 text-center">
          <h2 className="text-4xl font-bold">Get the Latest Weather Updates</h2>
          <p className="mt-4 text-lg">Enter your city to get current weather updates.</p>
          <form onSubmit={handleSubmit} className="mt-8">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="text-black"
            />
            <button type="submit" className="ml-4 px-6 py-3 bg-blue-700 dark:bg-[#312e81] dark:text-[#cbd5e1] hover:bg-blue-800 rounded-lg">
              Check Weather Now
            </button>
          </form>
        </header>
  
        {/* Conditional rendering for loading spinner and weather data */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          weatherData ? (
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
          <p className="text-center dark:text-[#cbd5e1]">No weather data available.</p>
        )
      )}
  
        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-[#0f172a] dark:text-[#cbd5e1]">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110">
                <h4 className="text-xl font-semibold">Accurate Forecasts</h4>
                <p className="mt-4">Get up-to-the-minute weather reports based on your location.</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110">
                <h4 className="text-xl font-semibold">Interactive Maps</h4>
                <p className="mt-4">Visualize weather patterns with dynamic weather maps.</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110">
                <h4 className="text-xl font-semibold">Alerts & Warnings</h4>
                <p className="mt-4">Receive timely alerts on severe weather conditions in your area.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Form Section */}
        <section className="py-16 bg-gray-100 dark:bg-[#1e1b4b] dark:text-[#cbd5e1]">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 dark:text-[#cbd5e1]">Feedback Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="feedback">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-[#312e81] dark:text-[#cbd5e1]"
              >
                Submit
              </button>
            </form>
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

export default App;
