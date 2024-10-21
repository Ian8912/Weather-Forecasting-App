import React from 'react'

export const ForcastCard = ({ 
  date,
  maxTemp,
  minTemp,
  precipitationDescription,
  windDescription,
  windSpeed
 }) => {
  return (
    <div className="weather-card">
        <h3 className="text-xl font-bold">{date}</h3>
        <p className="text-lg">{day.condition}</p>
        <img src={day.icon} alt={day.condition} className="mx-auto" />
        <p className="text-lg">High: {maxTemp[1]}°F / {maxTemp[0]}°C</p>
        <p className="text-lg">Low: {minTemp[1]}°F / {minTemp[0]}°C</p>
        <p className="text-lg">Humidity: {day.humidity}%</p>
        <p className="text-lg">Wind Speed: {windSpeed} m/s</p>
        <p className="text-lg">Wind Description: {windDescription} m/s</p>
        <p className="text-lg">Precipitation: {precipitationDescription} m/s</p>
      </div>
  )
}
