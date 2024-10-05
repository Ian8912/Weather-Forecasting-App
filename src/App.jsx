import React, { useState, useEffect } from 'react';
import './App.css'
import CoordinateInputCard from './components/CoordinateInputCard';
import FeatureDisplaySection from './components/FeatureDisplaySection';
import FeatureForm from './components/FeatureForm';
import WeatherPage from './routes/WeatherCoordsPage';
import Navbar from './components/Navbar';



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
        <Navbar/>

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
