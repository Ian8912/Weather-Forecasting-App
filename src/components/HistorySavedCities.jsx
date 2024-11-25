import React, { useState, useEffect } from 'react';
import './HistorySavedCities.css'; // Add styles here

const HistorySavedCities = () => {
  const [cities, setCities] = useState([]);

// Fetch recent cities on component load
useEffect(() => {
  const fetchRecentCities = async () => {
    try {
      const response = await fetch('/api/recent-cities'); // Replace with actual API endpoint
      if (response.ok) {
        const data = await response.json();
        setCities(data); // Update state with fetched cities
      } else {
        console.error('Failed to fetch recent cities:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recent cities:', error);
    }
  };

  fetchRecentCities();
}, []);

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
