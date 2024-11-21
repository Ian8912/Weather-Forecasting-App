import React from 'react'
import CurrentWeatherDataDisplay from './CurrentWeatherDataDisplay'
import { ForecastDisplay } from './ForecastDisplay'
import '../App.css'
import { useState, useEffect } from 'react'
import { useTranslation } from '../routes/TranslationContext';
import API_BASE_URL from "../config";


export const RenderWeatherData = ( { weatherData, city, cityHasBeenEntered, errorMessage, setErrorMessage, loading, forecastingData } ) => {

    const [isFahrenheit, setIsFahrenheit] = useState(true); 
    const [forecastData, setForecastData] = useState([]);
    const { translatedText } = useTranslation(); // Translation hook

    useEffect(() => {
        const fetchForecast = async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/forecast?city=${weatherData.city}`, {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json'
                }
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
              }
              const data = await response.json();          
              setForecastData(data); 
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
          <p className="dark:text-[#cbd5e1] text-lg ml-4">{translatedText.Load}</p>
        </div>
      );

  return (
    <div className='flex flex-col items-center justify-center w-full unified-weather-card rounded-3xl bg-blue-500'
    style={{ borderRadius: '5rem', transform: 'scale(0.9)', transformOrigin: 'top center' }}
>
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
