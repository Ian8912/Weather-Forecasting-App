import React from 'react'

export const ForecastDisplay = () => {

    const forecastData = [
        {
            date: "Monday",
            condition: "Wet",
            highTemp: 72,
            lowTemp: 56,
            humidity: 40,
            windSpeed: 2
        }, 
        {
            date: "Tuesday",
            condition: "Wet",
            highTemp: 72,
            lowTemp: 56,
            humidity: 40,
            windSpeed: 2
        }, 
        {
            date: "Wednsday",
            condition: "Wet",
            highTemp: 72,
            lowTemp: 56,
            humidity: 40,
            windSpeed: 2
        }, 
        {
            date: "Thursday",
            condition: "Wet",
            highTemp: 72,
            lowTemp: 56,
            humidity: 40,
            windSpeed: 2
        }, 
        {
            date: "Friday",
            condition: "Wet",
            highTemp: 72,
            lowTemp: 56,
            humidity: 40,
            windSpeed: 2
        }, 
    ]

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
    {forecastData.map((day, index) => (
      <div key={index} className="weather-card">
        <h3 className="text-xl font-bold">{day.date}</h3>
        <p className="text-lg">{day.condition}</p>
        <img src={day.icon} alt={day.condition} className="mx-auto" />
        <p className="text-lg">High: {day.highTemp}°F / {day.highTempC}°C</p>
        <p className="text-lg">Low: {day.lowTemp}°F / {day.lowTempC}°C</p>
        <p className="text-lg">Humidity: {day.humidity}%</p>
        <p className="text-lg">Wind Speed: {day.windSpeed} m/s</p>
      </div>
    ))}
  </div>
  )
}
