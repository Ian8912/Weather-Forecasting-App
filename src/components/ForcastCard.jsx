import React from 'react'
import WeatherIconService from '../WeatherIconService';

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
    <div className="weather-card w-1/6 p-6 bg-white rounded-3xl  hover:shadow-2xl transition-transform hover:scale-105 flex flex-col">
      
      {/* Date and Icon (aligned at the top) */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-left text-xl font-semibold text-gray-800 dark:text-gray-100">{date}</h3>
        <img src={icon.precipitateIcon} alt="Weather Icon" className="w-16 h-16" />
      </div>

      {/* Temperature Gradient (with low and high temperatures) */}
      <div className="relative flex items-center mb-4">
        <span className="text-left text-lg text-gray-600 dark:text-gray-300 w-16">{isFahrenheit ? `${minF}°F ` : `${minC}°C`}</span>
        
        <div className="w-full h-2 mx-2 bg-gradient-to-r from-blue-400 via-yellow-300 to-red-500 rounded-full relative">
          {/* Circle representing the current temperature */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
            style={{ left: `${circlePosition}%` }}
          ></div>
        </div>

        <span className="text-right text-lg text-gray-600 dark:text-gray-300 w-16">{isFahrenheit ? `${maxF}°F ` : `${maxC}°C`}</span>
      </div>

      {/* Additional Details (aligned left) */}
      <div className="flex flex-col text-left space-y-2 text-gray-700 dark:text-gray-300">
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
