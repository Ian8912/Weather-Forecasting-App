import React, { useState, useEffect } from 'react';
import './App.css'
import CoordinateInputCard from './components/CoordinateInputCard';
import FeatureDisplaySection from './components/FeatureDisplaySection';
import FeatureForm from './components/FeatureForm';
import WeatherPage from './routes/WeatherCoordsPage';
import Navbar from './components/Navbar';
import errorService from './errorService';
import { useTranslation } from 'react-i18next';


// Functional component for the loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="spinner"></div>
    <p className="dark:text-[#cbd5e1] text-lg ml-4">Loading weather data...</p>
  </div>
);

function App() {
  const { t } = useTranslation(); // Translation function
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state to track data fetching
  const [city, setCity] = useState(''); // Update state in app to handle city input
  const [suggestions, setSuggestions] = useState([]) // City suggestions
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchWeatherByCoords = (lat, lon) => {
    setLoading(true);
    fetch(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`)
      .then((response) => {
        const handledResponse = errorService.handleApiError(response, 'Failed to fetch weather data.');
        if (handledResponse.errorMessage) {
          setErrorMessage(handledResponse.errorMessage); // Set the standardized error message
        }
        return handledResponse.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        const errorMsg = errorService.handleError(error);
        setErrorMessage(errorMsg.errorMessage);
        setLoading(false);
      });
  };
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User's location:", latitude, longitude);  // Debugging to check location
          fetchWeatherByCoords(latitude, longitude);  // Fetch data using coordinates
        },
        (error) => {
          setErrorMessage('Unable to access location. Please enter a city manually.');
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by your browser.');
    }
  }, []);

  

  // Fetch weather data on form submit
  const handleWeatherSubmit = (e) => {
    e.preventDefault();  // Prevent page reload on form submit
  
    if (!city) {
      alert('Please enter a city');  // Ensure city is entered
      return;
    }
  
    setLoading(true);  // Start loading spinner
    console.log("Fetching weather data for:", city);  // Debugging
  
    // Fetch weather data for the selected or entered city
    fetch(`http://localhost:5000/weather?city=${city}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('City not found. Please try again.');
          }
          throw new Error('Failed to fetch weather data. Please try again later.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Weather data for submitted city:', data);  // Debugging
        setWeatherData(data);  // Update state with fetched weather data
        setLoading(false);  // Stop loading spinner
        setSuggestions([]);  // Clear suggestions after selecting
        setErrorMessage(null);  // Clear error message if successful
      })
      .catch((error) => {
        console.error(`Error fetching weather data for ${city}:`, error);
        setLoading(false);  // Stop loading spinner on error
        setErrorMessage(error.message);  // Set error message
      });
  };

  // Fetch city suggestions as the user types
  const handleCityChange = (e) => {
    const cityInput = e.target.value;
    setCity(cityInput);

    if (cityInput.length > 2) { // Fetch suggestions after 3 characters
      fetch(`http://localhost:5000/city-suggestions?city=${cityInput}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cities) {
            setSuggestions(data.cities); // Set city suggestions
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching city suggestions:', error);
        });
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  // Handle city selection from suggestions
  const handleCitySelect = (selectedCity) => {
    const { lat, lon, name, state, country } = selectedCity; // Get lat, lon, name, state, and country
    setCity(name); // Set the selected city name for display purposes
    setSuggestions([]); // Clear suggestions after selection
    
    // Store state and country locally so you can display them later
    const locationDetails = { name, state, country };

    // Fetch weather data using lat and lon
    setLoading(true);
    fetch(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({ ...data, ...locationDetails }); // Merge weather data with location details
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  };

      // Handle form input changes for feedback form
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting feedback form:', formData);
    // Handle form submission logic for feedback form here (e.g., send data to the server)
  };

  // Define the inline function to render weather data
  const RenderWeatherData = ({ weatherData }) => {
    if (!weatherData) {
      return <p>{t('No weather data available. Please enter a city to check the weather.')}</p>;
    }
  
    return (
      <section className="py-8">
        <div className="container mx-auto text-center">
          <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">{t('Weather for ')} {weatherData.city}, {weatherData.state || 'N/A'}, {weatherData.country}</h3>
            <p className="text-lg">{t('Temperature')}: {weatherData.temperature_fahrenheit}°F / {weatherData.temperature_celsius}°C</p>
            <p className="text-lg">{t('Condition')}: {weatherData.description}</p>
            <p className="text-lg">{t('Humidity')}: {weatherData.humidity}%</p>
            <p className="text-lg">{t('Wind Speed')}: {weatherData.wind_speed} m/s</p>
            <p className="text-lg">
              UV Index: {weatherData.uv_index || 'N/A'} {/* Add a fallback for UV Index */}
            </p>
            <p className="text-lg">Air Quality: {weatherData.air_quality} AQI</p>
          </div>
        </div>
      </section>
    );
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
  
            {/* Links for Larger Screens */}
            <ul className="hidden md:flex space-x-6">
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Home')}</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Features')}</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Contact')}</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Log in')}</a></li>
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
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Home')}</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Features')}</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Contact')}</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">{t('Log in')}</a></li>
              <li>
                <button onClick={() => setDarkMode(!darkMode)} 
                  className="ml-1 px-2 py-1 bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          )}
        </nav>
  
        {/* Weather Form Section */}
        <header className="bg-blue-500 dark:bg-[#1e1b4b] dark:text-[#cbd5e1] text-white py-24 text-center">
          <h2 className="text-4xl font-bold">{t('Get the Latest Weather Updates')}</h2>
          <p className="mt-4 text-lg">{t('Enter a city name to get current weather updates.')}</p>
          <>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </>
          <form onSubmit={handleWeatherSubmit} className="mt-8">
            <div className="relative inline-block w-full max-w-sm">
              <input
                type="text"
                value={city}  // Bind to `city` state
                onChange={handleCityChange}  // Update `city` as user types
                placeholder="Enter city name"
                className="text-black w-full px-3 py-2 border rounded text-sm"
              />

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 z-10 mt-1 bg-white shadow-lg border rounded text-left">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleCitySelect(suggestion)}  // Handle city selection from suggestions
                      className="cursor-pointer p-2 bg-blue-50 dark:bg-[#312e81] text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      {suggestion.name}, {suggestion.state || ''} ({suggestion.country})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/*<button type="submit" className="ml-4 px-6 py-3 bg-blue-700 dark:bg-[#312e81] dark:text-[#cbd5e1] hover:bg-blue-800 rounded-lg">
              Check Weather Now
            </button>*/}
          </form>
        </header>
  
        {/* Conditional rendering for loading spinner and weather data */}
    <>
      {loading ? (
        <LoadingSpinner />
      ) : weatherData ? (
        <RenderWeatherData weatherData={weatherData} />
      ) : (
        <p className="text-center">{t('No weather data available.')}</p>
      )}
    </>

      <CoordinateInputCard />
  
        {/* Features Section */}
        <FeatureDisplaySection />

        {/* Feedback Form Section */}
        <section className="py-16 bg-gray-100 dark:bg-[#1e1b4b] dark:text-[#cbd5e1]">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 dark:text-[#cbd5e1]">{t('Feedback Form')}</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="name">
                {t('Name')}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFeedbackChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="email">
                {t('Email')}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFeedbackChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="feedback">
                {t('Feedback')}
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleFeedbackChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-[#312e81] dark:text-[#cbd5e1]"
              >
                {t('Submit')}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-blue-600 dark:bg-[#312e81] dark:text-[#cbd5e1] text-white text-center">
          <p>&copy; {t('2024 WeatherLink. All rights reserved.')}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;