import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../routes/TranslationContext';

export const SearchBar = ({
  city,
  suggestions,
  errorMessage,
  setCity,
  handleCityChange,
  handleCitySelect,
  handleWeatherSubmit,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleWeatherSubmit(e); // Trigger the form submit when Enter is pressed
    }
  };

  const { translatedText } = useTranslation(); // Translation hook

  return (
    <header
      className="dark:bg-[#1e1b4b] dark:text-[#cbd5e1] text-black py-24 text-center"
      style={{ borderRadius: '5rem' }}
    >
      <h2 className="text-4xl font-bold">{translatedText.Latest}</h2>
      <p className="mt-4 text-lg">{translatedText.cityName}</p>
      <>
        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}
      </>
      <form onSubmit={handleWeatherSubmit} className="mt-8">
        <div className="relative inline-block w-full max-w-sm">
          <input
            type="text"
            value={city} // Bind to `city` state
            onChange={handleCityChange} // Update `city` as user types
            onKeyDown={handleKeyPress}
            placeholder={translatedText.enterName}
            className="text-black w-full px-6 py-3 border rounded-full text-sm shadow-md focus:outline-none focus:border-blue-800"
          />

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 mt-1 bg-white shadow-lg border rounded text-left">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleCitySelect(suggestion)} // Handle city selection from suggestions
                  className="cursor-pointer p-2 bg-blue-50 dark:bg-[#312e81] text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  {suggestion.name}, {suggestion.state || ''} ({suggestion.country})
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
      <LanguageSelector />
    </header>
  );
};
