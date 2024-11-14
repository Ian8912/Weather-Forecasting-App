import React from 'react'
import { useEffect, useState } from 'react'
import { ForcastCard } from './ForcastCard'

import WeatherIconService from '../WeatherIconService'

export const ForecastDisplay = ({forecastData, cityhasBeenEntered, errorMessage, setError, isFahrenheit}) => {

    const IconServicer = new WeatherIconService()      

  return (
    <div className="container flex flex-wrap justify-center items-center mx-auto gap-5">
    {forecastData ? forecastData.map((day, index) => (
      <>
      <ForcastCard key={index} 
        icon={IconServicer.OpenMeteoForecastingIcons(day.precipitateDescription, day.winddescription)}
        date={index == 0 ? day.date = "Today" : day.date}
        maxC={day.maxC}
        maxF={day.maxF}
        minC={day.minC}
        minF={day.minF}
        precipitationDescription={day.precipitateDescription}
        winddescription={day.winddescription}
        windspeed={parseFloat(day.windspeed).toFixed(1)}
        isFahrenheit={isFahrenheit}
      />
      </>
    )) : 
    <p>{errorMessage}</p>
    }
  </div>
  )
}
