import {React, useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar';
import { useLocation } from 'react-router-dom';


const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    

    const location = useLocation(); // Access the state from the navigation
    const { lat, long } = location.state || {}

  
    
  
   // Destructure lat and long from state

  useEffect(() => {
    if (lat && long) {
      fetch(`http://localhost:5000/coords/${lat}/${long}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
          setWeatherData(data[0])
          
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [lat, long]);
    return (
      <div className="py-8">
        <div className="container mx-auto text-center">
          <Navbar/>
          <header className="bg-blue-500 dark:bg-[#1e1b4b] dark:text-[#cbd5e1] flex-col text-white py-24 text-center">
            <h2 className="text-4xl font-bold">Current Weather</h2>
            {weatherData ? (
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg shadow-lg">
                <h3 className="text-2xl text-blue-900 dark:bg-[#312e81] dark:text-[#cbd5e1] font-bold">{weatherData.city}</h3>
                <h3 className="text-xl text-blue-900 dark:bg-[#312e81] dark:text-[#cbd5e1] font-bold">{weatherData.description}</h3>
                
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