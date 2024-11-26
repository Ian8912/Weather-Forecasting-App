import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { getTimeOfDay } from './utils/timeOfDayUtils';
import CoordinateInputCard from './components/CoordinateInputCard';
import WeatherPage from './routes/WeatherCoordsPage';
import Navbar from './components/Navbar';
import errorService from './errorService';
import { ForecastDisplay } from './components/ForecastDisplay';
import { SearchBar } from './components/SearchBar';
import WeatherIconService from './WeatherIconService';
import OpenWeatherIcon from './components/OpenWeatherIcon';
import FeedbackForm from './components/FeedbackForm';
import { RenderWeatherData } from './components/RenderWeatherData';
import CurrentWeatherDataDisplay from './components/CurrentWeatherDataDisplay';
import { useTranslation } from './routes/TranslationContext';
import FeedbackModal from './components/FeedbackModal';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import HistorySavedCities from './components/HistorySavedCities';
import API_BASE_URL from "./config";



// Functional component for the loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="spinner"></div>
    <p className="dark:text-[#cbd5e1] text-lg ml-4">Loading weather data...</p>
  </div>
);

function App() {
  
  const [cities, setCities] = useState([
    {
      name: 'New York',
      temperature: 22,
      icon: 'https://openweathermap.org/img/wn/01d@2x.png',
      weather: 'Sunny',
      isSaved: true,
    },
    {
      name: 'San Francisco',
      temperature: 18,
      icon: 'https://openweathermap.org/img/wn/04d@2x.png',
      weather: 'Cloudy',
      isSaved: false,
    },
  ]);

  const handleCityClick = (cityName) => {
    console.log(`Clicked on city: ${cityName}`);
  };

  const handleRemoveCity = (cityName) => {
    setCities((prevCities) => prevCities.filter((city) => city.name !== cityName));
  };

  const [timeOfDay, setTimeOfDay] = useState('day');
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [cityHasBeenEntered, setCityHasBeenEntered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const { translatedText } = useTranslation(); // Translation hook
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
    fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`)
      .then((response) => {
        const handledResponse = errorService.handleApiError(response, 'Failed to fetch weather data.');
        if (handledResponse.errorMessage) {
          setErrorMessage(handledResponse.errorMessage);
        }
        return handledResponse.json();
      })
      .then((data) => {
        console.log(data);
        
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

  useEffect(() => {
    // Example sunrise/sunset times for demo
    const sunrise = new Date().setHours(6, 0, 0); // 6:00 AM
    const sunset = new Date().setHours(18, 0, 0); // 6:00 PM
    const now = Date.now();

    // Determine the current time of day
    const currentPeriod = getTimeOfDay(now, sunrise, sunset);
    setTimeOfDay(currentPeriod);
  }, []);

  useEffect(() => {
    if (document.querySelector('.sky-background')) {
      const updateShootingStarPosition = () => {
        const skyBackground = document.querySelector('.sky-background::before');
        const randomX = Math.floor(Math.random() * 100); // Random horizontal position (0-100%)
        const randomY = Math.floor(Math.random() * 50); // Random vertical position (0-50% of the screen)

        // Apply the random positions to custom properties
        document.documentElement.style.setProperty('--x', `${randomX}%`);
        document.documentElement.style.setProperty('--y', `${randomY}%`);
      };

      // Update position periodically
      setInterval(updateShootingStarPosition, 5000); // Matches animation duration
    }
  }, []);

  const handleWeatherSubmit = (e) => {
    e.preventDefault();  
    if (!city) {
      alert('Please enter a city');
      return;
    }

    setLoading(true);  
    fetch(`${API_BASE_URL}/weather?city=${city}`)
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
        
        setRecentHistory((prev) => {
          const updatedHistory = prev.filter((c) => c.name !== city);
          updatedHistory.unshift({ name: city });
          return updatedHistory.slice(0, 5); // Keep the history limited to 5 cities
        });
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

  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      if (!hasModalBeenShown) {
        timerRef.current = setTimeout(() => {
          handleOpenModal();
        }, 300000); 
      }
    };
  
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
  
    timerRef.current = setTimeout(() => {
      handleOpenModal();
    }, 300000);
  
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [hasModalBeenShown]);

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'feedback'), formData);
      console.log('Feedback submitted successfully');
      setFormData({ name: '', email: '', feedback: '' }); // Reset form after submission
    } catch (error) {
      const errorMsg = errorService.handleError(error);
      setErrorMessage(errorMsg.errorMessage);
    }
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''} ${timeOfDay}`}>
      {/* Top Section with Dynamic Background */}
      <div className="top-section">
        {/* Dynamic Background */}
        <div className="sky-background">
          {/* Shooting Stars Container */}
          <div className="shooting-stars"></div>
        </div>
  
        {/* Navbar */}
        <Navbar />
  
        {/* Search Bar */}
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
      </div>
  
      {/* Main Content */}
      <div className="content">
        <HistorySavedCities
          cities={cities}
          onCityClick={handleCityClick}
          onRemoveCity={handleRemoveCity}
        />
        {weatherData ? (
          <RenderWeatherData  
            weatherData={weatherData}
            city={city}
            cityHasBeenEntered={cityHasBeenEntered}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            loading={loading}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
  
      {/* Footer */}
      <footer className="py-8 bg-blue-500 dark:bg-[#312e81] dark:text-[#cbd5e1] text-white text-center flex flex-col items-center">
        <div className="flex flex-col items-center space-y-2">
          <button 
            onClick={handleOpenModal} 
            className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg"
          >
            {translatedText.Give}
          </button>
          <p>&copy; 2024 WeatherLink. {translatedText.Rights}</p>
        </div>
      </footer>
  
      {/* Feedback Modal */}
      <FeedbackModal 
        isVisible={isModalVisible} 
        onClose={handleCloseModal} 
        onSubmit={handleFeedbackSubmit} 
        formData={formData} 
        handleFeedbackChange={handleFeedbackChange} 
      />
    </div>
  );
  
  
}

export default App;
