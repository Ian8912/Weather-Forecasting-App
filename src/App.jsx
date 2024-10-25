import React, { useState, useEffect } from 'react';
import './App.css'
import CoordinateInputCard from './components/CoordinateInputCard';
import FeatureDisplaySection from './components/FeatureDisplaySection';
import WeatherPage from './routes/WeatherCoordsPage';
import Navbar from './components/Navbar';
import errorService from './errorService';
import { useTranslation } from 'react-i18next';
import { ForecastDisplay } from './components/ForecastDisplay';
import { SearchBar } from './components/SearchBar';
import WeatherIconService from './WeatherIconService';
import OpenWeatherIcon from './components/OpenWeatherIcon';
import FeedbackForm from './components/FeedbackForm';
import CurrentWeatherDataDisplay from './components/CurrentWeatherDataDisplay';
import { RenderWeatherData } from './components/RenderWeatherData';


// Functional component for the loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="spinner"></div>
    <p className="dark:text-[#cbd5e1] text-lg ml-4">Loading weather data...</p>
  </div>
);

function App() {
  const { t } = useTranslation(); // Translation function
  const [cityHasBeenEntered, setCityHasBeenEntered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  
  
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
    setCityHasBeenEntered(true)
    fetch(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({ ...data, ...locationDetails }); // Merge weather data with location details
        setLoading(false); // Stop loading after data is fetched
        
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false); // Stop loading even if there's an error
        setCityHasBeenEntered(false)
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

  
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`py-8 flex-col ${darkMode ? 'dark' : ''} overflow-x-hidden`}>
      <div className="p-12 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
        {/* Navbar */}
        <Navbar />
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
    
      
        <RenderWeatherData  
            weatherData={weatherData}
            city={city}
            cityHasBeenEntered={cityHasBeenEntered}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            loading={loading}
        />

          
    
   
        {/* Features Section */}
        <FeatureDisplaySection />
        {/* Footer */}
        <footer className="py-8 bg-blue-600 dark:bg-[#312e81] dark:text-[#cbd5e1] text-white text-center">
          <p>&copy; {t('2024 WeatherLink. All rights reserved.')}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;