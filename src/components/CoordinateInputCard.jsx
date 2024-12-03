import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WeatherPage from '../routes/WeatherCoordsPage';
import errorService from '../errorService';
import { useTranslation } from '../routes/TranslationContext';

function CoordinateInputCard() {
  const [longCoordinates, setLongCoordinates] = useState();
  const [latCoordinates, setLatCoordinates] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const { translatedText } = useTranslation(); // Translation hook
  const navigate = useNavigate();

  const longHandleChange = (e) => {
    const {_, value} = e.target;
    setLongCoordinates(value)
  };

  const latHandleChange = (e) => {
    const {_, value} = e.target
    setLatCoordinates(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(latCoordinates);

    const latError = errorService.handleValidationError('Latitude', latCoordinates);
    const longError = errorService.handleValidationError('Longitude', longCoordinates);

    if (latError || longError) {
      setErrorMessage(latError?.errorMessage || longError?.errorMessage);
      return;
    }
    
    navigate(`/coords/${latCoordinates}/${longCoordinates}/`, {
      state: { lat: latCoordinates, long: longCoordinates },
    })}

  

    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-[#0f172a] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-[#cbd5e1]">{translatedText.enterCoordinates}</h2>
  
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="latitude" className="block mb-2 dark:text-[#cbd5e1]">{translatedText.Latitude}</label>
            <input
              type="text"
              name="latitude"
              value={latCoordinates}
              onChange={latHandleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-[#1e293b]"
              placeholder={translatedText.enterLat}
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="longitude" className="block mb-2 dark:text-[#cbd5e1]">{translatedText.Longitude}</label>
            <input
              type="text"
              name="longitude"
              value={longCoordinates}
              onChange={longHandleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-[#1e293b]"
              placeholder={translatedText.enterLon}
              required
            />
          </div>
  
          {/* Error message display */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  
          <button onClick={handleSubmit} type="submit" className="w-full py-2 px-4 bg-blue-600 text-white dark:bg-[#312e81] dark:hover:bg-[#4c1d95] rounded-lg">
          {translatedText.Submit}
          </button>
        </form>
      </div>
    );
  }
  
  export default CoordinateInputCard;