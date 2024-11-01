import React from 'react'
import OpenWeatherIcon from '../components/OpenWeatherIcon';
import { useState } from 'react';
import { useTranslation } from '../routes/TranslationContext';

const CurrentWeatherDataDisplay = ({weatherData, isFahrenheit, setIsFahrenheit}) => {

  const { translatedText } = useTranslation(); // Translation hook

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

          {/* Weather Icon */}
          <OpenWeatherIcon id={weatherData.openweathericonid} />

          {/* Weather Condition */}
          <p className="text-xl mt-4">{weatherData.description}</p>

          {/* Additional Information: Humidity, UV Index, Air Quality */}
          <div className="mt-4 space-y-2">
            {/* First Row: Humidity and Air Quality */}
            <div className="flex flex-wrap gap-x-4">
              <p className="text-lg">Humidity: {weatherData.humidity}%</p>
              <p className="text-lg">Air Quality: {weatherData.air_quality} AQI</p>
            </div>
            
            {/* Second Row: Current UV Index and Max UV Index */}
            <div className="flex flex-wrap gap-x-4">
              <p className="text-lg">UV Index: {weatherData.uv_index.toFixed(2) || 'N/A'}</p>
              <p className="text-lg">Max UV Index: {weatherData.max_uv_index.toFixed(2) || 'N/A'}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
  

export default CurrentWeatherDataDisplay