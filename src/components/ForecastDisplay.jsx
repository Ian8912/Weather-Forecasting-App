import React from 'react'
import { useEffect, useState } from 'react'
import { ForcastCard } from './ForcastCard'

import WeatherIconService from '../WeatherIconService'

export const ForecastDisplay = ({city, cityhasBeenEntered, errorMessage, setError}) => {

    const [forecastData, setForecastData] = useState([])

    const IconServicer = new WeatherIconService()

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
              setForecastData(data); // Assuming the forecast data contains a 'list' array
            } catch (error) {
              setError(error.message);
            }
          };
          
          if (cityhasBeenEntered && city && city.trim())
            fetchForecast();
        }, [city, errorMessage]); 
      

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
    {forecastData ? forecastData.map((day, index) => (
      <ForcastCard key={index} 
        icon={IconServicer.OpenMeteoForecastingIcons(day.precipitateDescription, day.winddescription)}
        date={day.date}
        maxC={day.maxC}
        maxF={day.maxF}
        minC={day.minC}
        minF={day.minF}
        precipitationDescription={day.precipitateDescription}
        winddescription={day.winddescription}
        windspeed={day.windspeed}
      
      />
    )) : 
    <p>{errorMessage}</p>
    }
  </div>
  )
}
