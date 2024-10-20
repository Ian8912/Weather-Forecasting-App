import React from 'react'
import { useEffect, useState } from 'react'
import { ForcastCard } from './ForcastCard'

export const ForecastDisplay = (location) => {

    const [forecastData, setForecastData] = useState([])

    useEffect(() => {
        const fetchForecast = async () => {
            try {
              const response = await fetch(`http://localhost:5000/forecast?city=${city}`, {
                method: 'GET', // Make sure it's a GET request
                headers: {
                  'Content-Type': 'application/json'
                }
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
              }
      
              const data = await response.json();
              console.log(data);
              
              setForecastData(data.list); // Assuming the forecast data contains a 'list' array
            } catch (error) {
              setError(error.message);
            }
          };
      
          fetchForecast();
        }, [city]); // This hook will trigger whenever the city prop changes
      

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
    {forecastData.map((day, index) => (
      <ForcastCard key={index} day={day} />
    ))}
  </div>
  )
}
