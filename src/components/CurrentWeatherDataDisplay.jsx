import React, { useState, useEffect } from 'react';
import OpenWeatherIcon from '../components/OpenWeatherIcon';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import Modal from 'react-modal';
import { useTranslation } from '../routes/TranslationContext';
import API_BASE_URL from '../config';


const CurrentWeatherDataDisplay = ({ weatherData, isFahrenheit, setIsFahrenheit }) => {
  const { translatedText } = useTranslation(); // Translation hook

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [apiKeys, setApiKeys] = useState({ WEATHER_API_KEY: '', MAP_API_KEY: '' });
  const [viewport, setViewport] = useState({
    latitude: 30.2672,
    longitude: -97.7431,
    zoom: 9,
    width: '100%',
    height: '400px',
  });

  const [showClouds, setShowClouds] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [showTemperature, setShowTemperature] = useState(false);
  

  const [cachedWeather, setCachedWeather] = useState(null);

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    // Fetch API keys on component mount
    fetch(`${API_BASE_URL}/api/keys`)
      .then(response => response.json())
      .then(data => setApiKeys(data))
      .catch(error => console.error('Error fetching API keys:', error));
  }, []);

  useEffect(() => {
    // Check for cached weather data
    const cachedData = localStorage.getItem('cachedWeatherData');
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      // Check if the cached data is recent
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('Using cached weather data:', data);
        setCachedWeather(data);
      } else {
        console.log('Cached data is outdated. New fetch required.');
        localStorage.removeItem('cachedWeatherData'); // Optionally clear old data
      }
    }
  }, []);

  useEffect(() => {
    if (weatherData) {
      const cachedData = JSON.parse(localStorage.getItem('cachedWeatherData'));

      // Save new weather data only if it's not already cached or is outdated
      if (!cachedData || cachedData.city !== weatherData.city) {
        const timestamp = Date.now();
        localStorage.setItem(
          'cachedWeatherData',
          JSON.stringify({ data: weatherData, timestamp })
        );
        console.log('Weather data saved to local storage:', weatherData);
      }
    }
  }, [weatherData]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  // Use cached weather data if available
  const displayWeatherData = cachedWeather || weatherData;

  if (!displayWeatherData) {
    return <p>{translatedText.noWeather}</p>;
  }

  
  return (
      <div className="py-8">
      <div className="container max-w-screen-lg mx-auto rounded-xl text-center">
        <div className="p-6 flex flex-col items-center text-white">

          {/* Container for weather data and globe */}
          <div className="flex flex-col lg:flex-row items-center justify-center w-full bg-blue-500 p-4 rounded-lg space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Weather Data */}
            <div className="flex flex-col items-center lg:items-center justify-center text-center lg:text-center max-w-lg">
              <div className="mb-4">
                <h3 className="text-6xl font-bold">
                  {isFahrenheit
                    ? `${Math.round(weatherData.temperature_fahrenheit)}°F`
                    : `${Math.round(weatherData.temperature_celsius)}°C`}
                </h3>
                {/* Centered Toggle Button */}
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <div
                    className={`relative w-14 h-8 flex items-center ${
                      isFahrenheit ? 'bg-green-300' : 'bg-gray-300'
                    } dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                      isFahrenheit ? 'justify-end' : 'justify-start'
                    }`}
                    onClick={toggleTemperatureUnit}
                  >
                    <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"></div>
                  </div>
                  <p className="text-md">{isFahrenheit ? '°F' : '°C'}</p>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <p className="text-lg">
                  {weatherData.city}, {weatherData.state || 'N/A'},{' '}
                  {weatherData.country}
                </p>
              </div>

              {/* High and Low Temperatures */}
              <div className="mb-4">
                <p className="text-lg">
                  H:{' '}
                  {isFahrenheit
                    ? `${Math.round(weatherData.max_temp_fahrenheit)}°F`
                    : `${Math.round(weatherData.max_temp_celsius)}°C`}{' '}
                  &nbsp;&nbsp; L:{' '}
                  {isFahrenheit
                    ? `${Math.round(weatherData.min_temp_fahrenheit)}°F`
                    : `${Math.round(weatherData.min_temp_celsius)}°C`}
                </p>
              </div>

              {/* Centered Weather Icon */}
              <div className="mb-4">
                <OpenWeatherIcon id={weatherData.openweathericonid} />
              </div>

              {/* Weather Condition */}
              <p className="text-xl mt-4">{weatherData.description}</p>
              {/* Additional Information: Humidity, UV Index, Air Quality */}
              <div className="mt-4 space-y-2">
                {/* First Row: Humidity and Air Quality */}
                <div className="flex flex-wrap gap-x-4 justify-center">
                  <p className="text-lg">
                    {translatedText.Humidity}: {weatherData.humidity}%
                  </p>
                  <p className="text-lg">
                    {translatedText.Air}: {weatherData.air_quality} AQI
                  </p>
                </div>
                {/* Second Row: Current UV Index and Max UV Index */}
                <div className="flex flex-wrap gap-x-4 justify-center">
                  <p className="text-lg">
                    {translatedText.UV}:{' '}
                    {weatherData.uv_index
                      ? Number(weatherData.uv_index).toFixed(2)
                      : 'N/A'}
                  </p>
                  <p className="text-lg">
                    {translatedText.MaxUV}:{' '}
                    {weatherData.max_uv_index
                      ? Number(weatherData.max_uv_index).toFixed(2)
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Globe */}
            <div className="flex-shrink-0">
              <img
                src="/images/Realistic_Earth_Image.png"
                alt="Globe with Transparent Background"
                onClick={openModal}
                className="cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-200 group-hover:shadow-lg w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
                style={{
                  borderRadius: '50%',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                  clipPath: 'circle(45% at 50% 50%)',
                  animation: 'float 3s ease-in-out infinite',
                  perspective: '1000px',
                  filter: 'drop-shadow(0 0 10px rgba(0, 128, 255, 0.5))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
  
      {/* Modal for Interactive Map */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Map Modal"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            width: '90%',
            height: '80%',
            margin: 'auto',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
          },
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '5px',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          {translatedText.closeMap}
        </div>
  
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-md z-10">
          <h4>{translatedText.Legend}</h4>
          <label>
            <input
              type="checkbox"
              checked={showClouds}
              onChange={() => setShowClouds(!showClouds)}
            />
            {translatedText.Clouds}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showPrecipitation}
              onChange={() => setShowPrecipitation(!showPrecipitation)}
            />
            {translatedText.Precipitation}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showTemperature}
              onChange={() => setShowTemperature(!showTemperature)}
            />
            {translatedText.Temperature}
          </label>
        </div>
  
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={apiKeys.MAP_API_KEY}
          onMove={(evt) => setViewport(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          scrollZoom={true}
          dragPan={true}
          touchRotate={true}
        >
          {showClouds && (
            <Source
              id="clouds"
              type="raster"
              tiles={[
                `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`,
              ]}
              tileSize={256}
            >
              <Layer id="clouds-layer" type="raster" />
            </Source>
          )}
          {showPrecipitation && (
            <Source
              id="precipitation"
              type="raster"
              tiles={[
                `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`,
              ]}
              tileSize={256}
            >
              <Layer id="precipitation-layer" type="raster" />
            </Source>
          )}
          {showTemperature && (
            <Source
              id="temperature"
              type="raster"
              tiles={[
                `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`,
              ]}
              tileSize={256}
            >
              <Layer id="temperature-layer" type="raster" />
            </Source>
          )}
        </ReactMapGL>
      </Modal>
    </div>
  );
  
};

export default CurrentWeatherDataDisplay;
