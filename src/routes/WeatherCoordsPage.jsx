import {React, useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import errorService from '../errorService';


const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    

    const location = useLocation(); // Access the state from the navigation
    const { lat, long } = location.state || {}

  
    
  
   // Destructure lat and long from state

   useEffect(() => {
    if (lat && long) {
      fetch(`http://localhost:5000/coords/${lat}/${long}/`)
        .then((response) => {
          const handledResponse = errorService.handleApiError(response, 'Failed to fetch weather data.');
          if (handledResponse.errorMessage) {
            setErrorMessage(handledResponse.errorMessage); // Set error message
          }
          return handledResponse.json();
        })
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          const errorMsg = errorService.handleError(error);
          setErrorMessage(errorMsg.errorMessage);
        });
    }
  }, [lat, long]);

    return (
      <div className="py-8">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="container mx-auto text-center">
          <Navbar/>
          <header className="bg-blue-500 dark:bg-[#1e1b4b] dark:text-[#cbd5e1] flex-col text-white py-24 text-center">
            <h2 className="text-4xl font-bold">Current Weather</h2>
            {weatherData ? (
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg shadow-lg">
                <h3 className="text-2xl text-[#1e3a8a] dark:bg-[#312e81] dark:text-[#cbd5e1] font-bold">{weatherData.city}</h3>
                <h3 className="text-xl text-[#1e3a8a] dark:bg-[#312e81] dark:text-[#cbd5e1] font-bold">{weatherData.description}</h3>
                
              </div>
            ) : (
              <p className="text-center dark:text-[#cbd5e1]">Loading weather data...</p>
            )}
          </header>
        </div>
        
        
      </div>
    );
  }
  
  export default WeatherPage;