import React from 'react'
import { useTranslation } from 'react-i18next';
import OpenWeatherIcon from '../components/OpenWeatherIcon';
import { useState } from 'react';

const CurrentWeatherDataDisplay = ({weatherData}) => {

  const { t } = useTranslation();
  const [isFahrenheit, setIsFahrenheit] = useState(true); // State for toggling temperature

  if (!weatherData) {
    return <p>{t('No weather data available. Please enter a city to check the weather.')}</p>;
  }

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  return (
    <div className="py-8">
      <div className="container rounded-xlmx-auto text-center">
        <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg shadow-lg flex flex-col items-center">
          
          {/* Temperature */}
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-6xl font-bold mr-4">
              {isFahrenheit ? `${Math.round(weatherData.temperature_fahrenheit)}°F` : `${Math.round(weatherData.temperature_celsius)}°C`}
            </h3>
            {/* Toggle Button */}
            <div
                className={`relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out ${isFahrenheit ? 'justify-end' : 'justify-start'}`}
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
            H: {isFahrenheit ? `${weatherData.max_temp_fahrenheit}°F` : `${weatherData.max_temp_celsius}°C`} 
            &nbsp;&nbsp; L: {isFahrenheit ? `${weatherData.min_temp_fahrenheit}°F` : `${weatherData.min_temp_celsius}°C`}
          </p>

          {/* Weather Icon */}
          <OpenWeatherIcon id={weatherData.openweathericonid} />

          {/* Weather Condition */}
          <p className="text-xl mt-4">{weatherData.description}</p>

          {/* Additional Information: Humidity, UV Index, Air Quality */}
          <div className="mt-4">
            <p className="text-lg">{t('Humidity')}: {weatherData.humidity}%</p>
            <p className="text-lg">{t('UV Index')}: {weatherData.uv_index || 'N/A'}</p>
            <p className="text-lg">{t('Air Quality')}: {weatherData.air_quality} AQI</p>
          </div>

        </div>
      </div>
    </div>
  );
};
  

export default CurrentWeatherDataDisplay