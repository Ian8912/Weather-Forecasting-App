import React from 'react';
import './HistorySavedCities.css'; // Add styles here

const HistorySavedCities = ({ cities, onCityClick, onRemoveCity }) => {
  return (
    <div className="history-saved-cities">
      <h3>Recent & Saved Cities</h3>
      <ul className="city-list">
        {cities.map((city) => (
          <li key={city.name} className="city-item">
            <div className="city-info" onClick={() => onCityClick(city.name)}>
              <p className="city-name">{city.name}</p>
              <p className="city-temp">{city.temperature}°C</p>
              <img
                src={city.icon}
                alt={city.weather}
                className="weather-icon"
              />
            </div>
            {city.isSaved && (
              <button
                className="remove-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCity(city.name);
                }}
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorySavedCities;
