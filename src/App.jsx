import React, { useState, useEffect } from 'react';
import './App.css';
import CoordinateInputCard from './components/CoordinateInputCard';
import FeatureDisplaySection from './components/FeatureDisplaySection';
import FeatureForm from './components/FeatureForm';
import WeatherPage from './routes/WeatherCoordsPage';
import Navbar from './components/Navbar';
import errorService from './errorService';
import { ForecastDisplay } from './components/ForecastDisplay';
import { SearchBar } from './components/SearchBar';
import FeedbackModal from './components/FeedbackModal';
import { useTranslation } from './routes/TranslationContext';


// Functional component for the loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="spinner"></div>
    <p className="dark:text-[#cbd5e1] text-lg ml-4">Loading weather data...</p>
  </div>
);

function App() {
  const [cityHasBeenEntered, setCityHasBeenEntered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  
  const { translatedText } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [city, setCity] = useState(''); 
  const [suggestions, setSuggestions] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [hasModalBeenShown, setHasModalBeenShown] = useState(false); // Track if modal has been shown

  const fetchWeatherByCoords = (lat, lon) => {
    setLoading(true);
    fetch(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`)
      .then((response) => {
        const handledResponse = errorService.handleApiError(response, 'Failed to fetch weather data.');
        if (handledResponse.errorMessage) {
          setErrorMessage(handledResponse.errorMessage);
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
          fetchWeatherByCoords(latitude, longitude);  
        },
        (error) => {
          setErrorMessage('Unable to access location. Please enter a city manually.');
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleWeatherSubmit = (e) => {
    e.preventDefault();  
    if (!city) {
      alert('Please enter a city');
      return;
    }

    setLoading(true);  
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
        setWeatherData(data);  
        setLoading(false);  
        setSuggestions([]);  
        setErrorMessage(null);  
      })
      .catch((error) => {
        setLoading(false);  
        setErrorMessage(error.message);  
      });
  };

  const handleCityChange = (e) => {
    const cityInput = e.target.value;
    setCity(cityInput);

    if (cityInput.length > 2) {
      fetch(`http://localhost:5000/city-suggestions?city=${cityInput}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cities) {
            setSuggestions(data.cities); 
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching city suggestions:', error);
        });
    } else {
      setSuggestions([]); 
    }
  };

  const handleCitySelect = (selectedCity) => {
    const { lat, lon, name, state, country } = selectedCity;
    setCity(name); 
    setSuggestions([]); 

    const locationDetails = { name, state, country };

    setLoading(true);
    setCityHasBeenEntered(true)
    fetch(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({ ...data, ...locationDetails }); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false); // Stop loading even if there's an error
        setCityHasBeenEntered(false)
      });
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setHasModalBeenShown(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerId);
      if (!hasModalBeenShown) {
        const newTimerId = setTimeout(() => {
          handleOpenModal();
        }, 300000); 
        setTimerId(newTimerId);
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    const initialTimerId = setTimeout(() => {
      handleOpenModal();
    }, 300000);
    setTimerId(initialTimerId);

    return () => {
      clearTimeout(initialTimerId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [hasModalBeenShown, timerId]);

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting feedback form:', formData);
  };

  const RenderWeatherData = ({ weatherData }) => {
    if (!weatherData) {
      return <p>{t('No weather data available. Please enter a city to check the weather.')}</p>;
    }

    return (
      <section className="py-8">
        <div className="container mx-auto text-center">
          <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Weather for {weatherData.city}, {weatherData.state || 'N/A'}, {weatherData.country}</h3>
            <p className="text-lg">Temperature: {weatherData.temperature_fahrenheit}°F / {weatherData.temperature_celsius}°C</p>
            <p className="text-lg">Condition: {weatherData.description}</p>
            <p className="text-lg">Humidity: {weatherData.humidity}%</p>
            <p className="text-lg">Wind Speed: {weatherData.wind_speed} m/s</p>
            <p className="text-lg">
              UV Index: {weatherData.uv_index || 'N/A'}
            </p>
            <p className="text-lg">Air Quality: {weatherData.air_quality} AQI</p>
          </div>
        </div>
      </section>
    );
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex-col ${darkMode ? 'dark' : ''}`}>
      <div className="p-12 bg-white dark:bg-[#0f172a]">
        {/* Navbar */}
        <nav className="p-6 bg-blue-600 text-white dark:bg-[#312e81] dark:text-[#cbd5e1]">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">WeatherLink</h1>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <ul className="hidden md:flex space-x-6">
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Features</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:bg-blue-700 dark:hover:bg-[#1e1b4b] px-3 py-2 rounded transition-colors duration-200">Log in</a></li>
              <li>
                <button onClick={() => setDarkMode(!darkMode)} className="ml-1 px-2 py-1 text-sm bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
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
                <button onClick={() => setDarkMode(!darkMode)} className="ml-1 px-2 py-1 bg-blue-500 text-white dark:bg-[#1e1b4b] dark:text-[#cbd5e1] rounded-lg">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          )}
        </nav>

        {/* Weather Form Section */}
        <SearchBar 
          city={city} 
          suggestions={suggestions} 
          errorMessage={errorMessage} 
          setCity={setCity} 
          handleCityChange={handleCityChange} 
          handleCitySelect={handleCitySelect} 
          handleWeatherSubmit={handleWeatherSubmit}
          hasCityBeenEntered={setCityHasBeenEntered}
          />
        {/* Conditional rendering for loading spinner and weather data */}
    <>
      {loading ? (
        <LoadingSpinner />
      ) : weatherData ? (
        <> 
          <RenderWeatherData weatherData={weatherData} />
          {cityHasBeenEntered && <ForecastDisplay city={city} cityhasBeenEntered={cityHasBeenEntered} errorMessage={errorMessage} setError={setErrorMessage} />}
          
        </>
        
      ) : (
        <p className="text-center">No weather data available.</p>
      )}
    </>
   

        <CoordinateInputCard />

        {/* Features Section */}
        <FeatureDisplaySection />

        {/* Footer */}
        <footer className="py-8 bg-blue-600 dark:bg-[#312e81] dark:text-[#cbd5e1] text-white text-center">
          <p>&copy; 2024 WeatherLink. All rights reserved.</p>
          <button onClick={handleOpenModal} className="bg-blue-500 px-4 py-2 mt-4 text-white hover:bg-blue-700 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg">
            Give Feedback
          </button>
          <p>&copy; 2024 WeatherLink. All rights reserved.</p>
        </footer>
      </div>

      <FeedbackModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
