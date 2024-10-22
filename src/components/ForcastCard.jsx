import React from 'react'

export const ForcastCard = ({ 
  date,
  maxC,
  maxF,
  minC,
  minF,
  precipitationDescription,
  winddescription,
  windspeed
 }) => {
  return (
    <div className="weather-card">
        <h3 className="text-xl font-bold">{date}</h3>
        <p className="text-lg">High: {maxF}°F / {maxC}°C</p>
        <p className="text-lg">Low: {minF}°F / {minC}°C</p>
        <p className="text-lg">Wind Speed: {windspeed} m/s</p>
        <p className="text-lg">Wind Description: {winddescription}</p>
        <p className="text-lg">Precipitation: {precipitationDescription}</p>
      </div>
  )
}
