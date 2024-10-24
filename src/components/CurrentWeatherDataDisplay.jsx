import React from 'react'
import { useTranslation } from 'react-i18next';
import OpenWeatherIcon from '../components/OpenWeatherIcon';

const CurrentWeatherDataDisplay = ({weatherData}) => {

    const { t } = useTranslation();

    if (!weatherData) {
        return <p>{t('No weather data available. Please enter a city to check the weather.')}</p>;
    }
  return (
          <section className="py-8">
            <div className="container mx-auto text-center">
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg shadow-lg items-center flex flex-col">
                <h3 className="text-2xl font-bold">{t('Weather for ')} {weatherData.city}, {weatherData.state || 'N/A'}, {weatherData.country}</h3>
    
                <OpenWeatherIcon id={weatherData.openweathericonid}/>
    
                <p className="text-lg">{t('Temperature')}: {weatherData.temperature_fahrenheit}°F / {weatherData.temperature_celsius}°C</p>
                <p className="text-lg">{t('Condition')}: {weatherData.description}</p>
                <p className="text-lg">{t('Humidity')}: {weatherData.humidity}%</p>
                <p className="text-lg">{t('Wind Speed')}: {weatherData.wind_speed} m/s</p>
                <p className="text-lg">
                  UV Index: {weatherData.uv_index || 'N/A'} {/* Add a fallback for UV Index */}
                </p>
                
                <p className="text-lg">Air Quality: {weatherData.air_quality} AQI</p>
              </div>
            </div>
          </section>
        );
      };
  

export default CurrentWeatherDataDisplay