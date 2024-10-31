import React from 'react'
import WeatherIconService from '../WeatherIconService';
import { useTranslation } from '../routes/TranslationContext';

export const ForcastCard = ({ 
  icon,
  date,
  maxC,
  maxF,
  minC,
  minF,
  precipitationDescription,
  winddescription,
  windspeed,
  isFahrenheit
 }) => {

  // Function to calculate the position of the circle on the gradient
  const calculateCirclePosition = (currentTemp, minTemp, maxTemp) => {
    const range = maxTemp - minTemp;
    const positionPercent = ((currentTemp - minTemp) / range) * 100; // Calculate position in percentage
    return positionPercent;
  };

  const currentTempF = (minF + maxF) / 2; // For example, we're taking the average of min and max temp
  const circlePosition = calculateCirclePosition(currentTempF, minF, maxF);

  return (
    <div className="weather-card max-w-xs w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-4 m-2 bg-white rounded-3xl hover:shadow-2xl transition-transform hover:scale-105 flex flex-col">
      
    {/* Date and Icon */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-left text-lg font-semibold text-gray-800 dark:text-gray-100">{date}</h3>
      <img src={icon.precipitateIcon} alt="Weather Icon" className="w-12 h-12 md:w-16 md:h-16" />
    </div>

    {/* Temperature Gradient */}
    <div className="relative flex items-center mb-4">
      <span className="text-left text-sm md:text-lg text-gray-600 dark:text-gray-300">{isFahrenheit ? `${minF}°F ` : `${minC}°C`}</span>
      
      <div className="w-full h-2 mx-2 bg-gradient-to-r from-blue-400 via-yellow-300 to-red-500 rounded-full relative">
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
          style={{ left: `${circlePosition}%` }}
        ></div>
      </div>

  const { translatedText } = useTranslation(); // Translation hook
      <span className="text-right text-sm md:text-lg text-gray-600 dark:text-gray-300">{isFahrenheit ? `${maxF}°F ` : `${maxC}°C`}</span>
    </div>

    {/* Additional Details */}
    <div className="flex flex-col text-left space-y-1 text-gray-700 dark:text-gray-300 text-sm md:text-base">
      <div className="flex justify-between">
        <span>Wind:</span>
        <span>{winddescription}</span>
      </div>
      <div className="flex justify-between">
        <span>Wind Speed:</span>
        <span>{windspeed} m/s</span>
      </div>
      <div className="flex justify-between">
        <span>Precipitation:</span>
        <span>{precipitationDescription}</span>
      </div>
    </div>
  </div>
  );
}
