import React from 'react'
import CurrentWeatherDataDisplay from './CurrentWeatherDataDisplay'
import { ForecastDisplay } from './ForecastDisplay'
import '../App.css'

export const RenderWeatherData = ( { weatherData, city, cityHasBeenEntered, errorMessage, setErrorMessage, loading } ) => {

    const LoadingSpinner = () => (
        <div className="flex justify-center items-center py-16">
          <div className="spinner"></div>
          <p className="dark:text-[#cbd5e1] text-lg ml-4">Loading weather data...</p>
        </div>
      );

  return (
    <>
            {/* Ternary conditional for loading */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <CurrentWeatherDataDisplay weatherData={weatherData} />
                    {cityHasBeenEntered && (
                        <ForecastDisplay 
                            city={city} 
                            cityhasBeenEntered={cityHasBeenEntered} 
                            errorMessage={errorMessage} 
                            setError={setErrorMessage} 
                        />
                    )}
                </>
            )}
        </>
  )
}
