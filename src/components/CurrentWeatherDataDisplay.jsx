import React, { useState, useEffect } from 'react';
import OpenWeatherIcon from '../components/OpenWeatherIcon';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import Modal from 'react-modal';
import { useTranslation } from '../routes/TranslationContext';
import API_BASE_URL from './config';
import 'mapbox-gl/dist/mapbox-gl.css';


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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/keys`)
      .then(response => response.json())
      .then(data => setApiKeys(data))
      .catch(error => console.error('Error fetching API keys:', error));
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };


  if (!weatherData) {
    return <p>{translatedText.noWeather}</p>;
  }

  
  return (
    <div className="py-8">
      <div className="container rounded-xlmx-auto text-center">
        <div className="p-6 flex flex-col items-center text-white">

          {/* Container for weather data and button */}
          <div className="flex relative justify-between items-start w-full bg-blue-500 p-4 rounded-lg">
            <div className="flex-grow">
              {/* Temperature */}
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-6xl font-bold mr-4">
                  {isFahrenheit ? `${Math.round(weatherData.temperature_fahrenheit)}°F` : `${Math.round(weatherData.temperature_celsius)}°C`}
                </h3>
                {/* Toggle Button */}
                <div
                  className={`relative w-14 h-8 flex items-center ${isFahrenheit ? 'bg-green-300' : 'bg-gray-300'} dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out ${isFahrenheit ? 'justify-end' : 'justify-start'}`}
                  onClick={toggleTemperatureUnit}
                >
                  <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"></div>
                </div>
                <p className="text-md mt-2 ml-2">
                  {isFahrenheit ? ' °F' : ' °C'}
                </p>
              </div>

              {/* Location */}
              <p className="text-lg mb-4">
                {weatherData.city}, {weatherData.state || 'N/A'}, {weatherData.country}
              </p>

              {/* High and Low Temperatures */}
              <p className="text-lg mb-4">
                H: {isFahrenheit ? `${Math.round(weatherData.max_temp_fahrenheit)}°F` : `${Math.round(weatherData.max_temp_celsius)}°C`} 
                &nbsp;&nbsp; L: {isFahrenheit ? `${Math.round(weatherData.min_temp_fahrenheit)}°F` : `${Math.round(weatherData.min_temp_celsius)}°C`}
              </p>

              {/* Centered Weather Icon */}
              <div className="flex justify-center mb-4">
                <OpenWeatherIcon id={weatherData.openweathericonid} />
              </div>

              {/* Weather Condition */}
              <p className="text-xl mt-4">{weatherData.description}</p>

              {/* Additional Information: Humidity, UV Index, Air Quality */}
              <div className="mt-4 space-y-2 text-center flex flex-col items-center">
                {/* First Row: Humidity and Air Quality */}
                <div className="flex flex-wrap gap-x-4 justify-center">
                  <p className="text-lg">{translatedText.Humidity}: {weatherData.humidity}%</p>
                  <p className="text-lg">{translatedText.Air}: {weatherData.air_quality} AQI</p>
                </div>
                
                {/* Second Row: Current UV Index and Max UV Index */}
                <div className="flex flex-wrap gap-x-4 justify-center">
                  <p className="text-lg">
                    {translatedText.UV}: {weatherData.uv_index ? Number(weatherData.uv_index).toFixed(2) : 'N/A'}
                  </p>
                  <p className="text-lg">
                    {translatedText.MaxUV}: {weatherData.max_uv_index ? Number(weatherData.max_uv_index).toFixed(2) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map Image */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
               {/* Background circle for contrast */}
              <div className="absolute inset-0 w-80px h-80px rounded-full bg-white/10 z-[-1]"></div>

              <img
                src="/images/Realistic_Earth_Image.png"
                alt="Globe with Transparent Background"
                onClick={openModal}
                className="cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-200 group-hover:shadow-lg"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                  clipPath: 'circle(45% at 50% 50%)',
                  animation: 'float 3s ease-in-out infinite',
                  perspective: '1000px',
                  filter: 'drop-shadow(0 0 10px rgba(0, 128, 255, 0.5))', // adds a glowing effect
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
            width: '90%',  // Adjust the width
            height: '80%', // Adjust the height
            margin: 'auto', // Automatically center vertically and horizontally
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            overflow: 'hidden',  // Hide any overflow
          }
        }}
      >
        {/* Message to instruct users */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent background
          color: 'white',
          padding: '8px 16px',
          borderRadius: '5px',
          fontSize: '14px',
          textAlign: 'center',
        }}>
          {translatedText.closeMap}
        </div>

        {/* Map Legend and Controls */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-md z-10">
          <h4>{translatedText.Legend}</h4>
          <label>
            <input type="checkbox" checked={showClouds} onChange={() => setShowClouds(!showClouds)} />
            {translatedText.Clouds}
          </label>
          <br />
          <label>
            <input type="checkbox" checked={showPrecipitation} onChange={() => setShowPrecipitation(!showPrecipitation)} />
            {translatedText.Precipitation}
          </label>
          <br />
          <label>
            <input type="checkbox" checked={showTemperature} onChange={() => setShowTemperature(!showTemperature)} />
            {translatedText.Temperature}
          </label>
        </div>

        {/* Render the Map */}
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={apiKeys.MAP_API_KEY}
          onMove={evt => setViewport(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          scrollZoom={true}
          dragPan={true}
          touchRotate={true}
        >
          {showClouds && (
            <Source
              id="clouds"
              type="raster"
              tiles={[`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`]}
              tileSize={256}
            >
              <Layer id="clouds-layer" type="raster" />
            </Source>
          )}
          {showPrecipitation && (
            <Source
              id="precipitation"
              type="raster"
              tiles={[`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`]}
              tileSize={256}
            >
              <Layer id="precipitation-layer" type="raster" />
            </Source>
          )}
          {showTemperature && (
            <Source
              id="temperature"
              type="raster"
              tiles={[`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`]}
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
