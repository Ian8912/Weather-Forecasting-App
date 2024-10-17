import React from 'react'
import { useEffect, useState } from 'react'
import { ForcastCard } from './ForcastCard'

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
      <ForcastCard key={index} day={day} />
    ))}
  </div>
  )
}
