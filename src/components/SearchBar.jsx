import React from 'react'
import errorService from './errorService';
import { useTranslation } from 'react-i18next';
export const SearchBar = ({city, suggestions, errorMessage, setcity, handleCityChange, handleCitySelect, handleWeatherSubmit}) => {

  const { t } = useTranslation();
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleWeatherSubmit(e); // Trigger the form submit when Enter is pressed
    }
  };
    
  return (
    <header className="bg-blue-500 dark:bg-[#1e1b4b] dark:text-[#cbd5e1] text-white py-24 text-center">
          <h2 className="text-4xl font-bold">{t('Get the Latest Weather Updates')}</h2>
          <p className="mt-4 text-lg">{t('Enter a city name to get current weather updates.')}</p>
          <>
            {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
          </>
          <form onSubmit={handleWeatherSubmit} className="mt-8">
            <div className="relative inline-block w-full max-w-sm">
              <input
                type="text"
                value={city}  // Bind to `city` state
                onChange={handleCityChange}  // Update `city` as user types
                onKeyDown={handleKeyPress}
                placeholder="Enter city name"
                className="text-black w-full px-3 py-2 border rounded text-sm"
              />

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 z-10 mt-1 bg-white shadow-lg border rounded text-left">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleCitySelect(suggestion)}  // Handle city selection from suggestions
                      className="cursor-pointer p-2 bg-blue-50 dark:bg-[#312e81] text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      {suggestion.name}, {suggestion.state || ''} ({suggestion.country})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/*<button type="submit" className="ml-4 px-6 py-3 bg-blue-700 dark:bg-[#312e81] dark:text-[#cbd5e1] hover:bg-blue-800 rounded-lg">
              Check Weather Now
            </button>*/}
          </form>
        </header>
  )
}
