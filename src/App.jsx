import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { getTimeOfDay } from './timeOfDayUtils.js';
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
  const [timeOfDay, setTimeOfDay] = useState(''); // NEW: Tracks the time of day
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

  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [cityHasBeenEntered, setCityHasBeenEntered] = useState(false);
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

        // NEW: Set the time of day based on fetched weather data
        if (data.sunrise && data.sunset) {
          const currentTime = new Date().toISOString();
          const calculatedTimeOfDay = getTimeOfDay(currentTime, data.sunrise, data.sunset);
          setTimeOfDay(calculatedTimeOfDay);
        }
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

        // NEW: Set the time of day when fetching weather by city
        if (data.sunrise && data.sunset) {
          const currentTime = new Date().toISOString();
          const calculatedTimeOfDay = getTimeOfDay(currentTime, data.sunrise, data.sunset);
          setTimeOfDay(calculatedTimeOfDay);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className={`py-8 flex-col ${timeOfDay} overflow-x-hidden`}>
      <div className="p-2 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
        {/* Navbar */}
        <Navbar />

        {/* Weather Form Section */}
        <SearchBar
          city={city}
          suggestions={suggestions}
          errorMessage={errorMessage}
          setCity={setCity}
          handleCityChange={(e) => setCity(e.target.value)}
          handleCitySelect={(selectedCity) => handleCityClick(selectedCity.name)}
          handleWeatherSubmit={handleWeatherSubmit}
          hasCityBeenEntered={setCityHasBeenEntered}
        />

        {/* History Saved Cities */}
        <HistorySavedCities
          cities={cities}
          onCityClick={handleCityClick}
          onRemoveCity={handleRemoveCity}
        />

        {/* Render Weather Data */}
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
    </div>
  );
}

export default App;
