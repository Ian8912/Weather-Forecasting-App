import React from 'react'

export const ForcastCard = (day) => {
  return (
    <div className="weather-card">
        <h3 className="text-xl font-bold">{day.date}</h3>
        <p className="text-lg">{day.condition}</p>
        <img src={day.icon} alt={day.condition} className="mx-auto" />
        <p className="text-lg">High: {day.highTemp}°F / {day.highTempC}°C</p>
        <p className="text-lg">Low: {day.lowTemp}°F / {day.lowTempC}°C</p>
        <p className="text-lg">Humidity: {day.humidity}%</p>
        <p className="text-lg">Wind Speed: {day.windSpeed} m/s</p>
      </div>
  )
}
