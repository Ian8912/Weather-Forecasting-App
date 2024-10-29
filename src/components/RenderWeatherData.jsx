import React from 'react'
import CurrentWeatherDataDisplay from './CurrentWeatherDataDisplay'
import { ForecastDisplay } from './ForecastDisplay'
import '../App.css'
import { useState, useEffect } from 'react'

export const RenderWeatherData = ( { weatherData, city, cityHasBeenEntered, errorMessage, setErrorMessage, loading, forecastingData } ) => {

    const [isFahrenheit, setIsFahrenheit] = useState(true); // State for toggling temperature
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
              const response = await fetch(`http://localhost:5000/forecast?city=${weatherData.city}`, {
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
          if(weatherData) fetchForecast();
        },[weatherData]); 

    const toggleTemperatureUnit = () => {
        setIsFahrenheit(!isFahrenheit);
    };

    const LoadingSpinner = () => (
        <div className="flex justify-center items-center py-16">
          <div className="spinner"></div>
          <p className="dark:text-[#cbd5e1] text-lg ml-4">Loading weather data...</p>
        </div>
      );

  return (
    <div className='flex flex-col items-center justify-center w-full unified-weather-card rounded-3xl bg-blue-500'
    style={{ borderRadius: '5rem', transform: 'scale(0.9)', transformOrigin: 'top center' }}
>
            {/* Ternary conditional for loading */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className=' pb-6'>
                    <CurrentWeatherDataDisplay 
                        weatherData={weatherData} 
                        isFahrenheit={isFahrenheit} 
                        setIsFahrenheit={setIsFahrenheit} 
                    />
                
                        <ForecastDisplay 
                            forecastData={forecastData} 
                            cityhasBeenEntered={cityHasBeenEntered} 
                            errorMessage={errorMessage} 
                            setError={setErrorMessage} 
                            isFahrenheit={isFahrenheit}
                        />
                </div>
            )}
        </div>
  )
}
