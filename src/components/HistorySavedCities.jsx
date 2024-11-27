import React, { useState, useEffect } from 'react';
import './HistorySavedCities.css';

const HistorySavedCities = ({ onCityClick, onRemoveCity }) => {
  
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecentCities = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/recent-cities');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data);
          setCities(data);
        } else {
          console.error('Failed to fetch recent cities:', response.statusText);
          setError('Failed to load recent cities.');
        }
      } catch (error) {
        console.error('Error fetching recent cities:', error);
        setError('An error occurred while fetching cities.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecentCities();
  }, []);

  return (
    <div className="history-saved-cities">
      <h3>Recent & Saved Cities</h3>
      {error && <p className="error-message">{error}</p>}
      {loading ? ( 
        <p>Loading cities...</p>
      ) : (
        <ul className="city-list">
          {cities.length > 0 ? (
            cities.map((city, index) => (
              <li key={`${city.name}-${index}`} className="city-item">
                <div className="city-info" onClick={() => onCityClick?.(city.name)}>
                  <img
                    src={city.icon}
                    alt={`${city.weather} icon`}
                    className="weather-icon"
                  />
                  <div>
                    <p className="city-name">{city.name}</p>
                    <p className="city-temp">{city.temperature}°C</p>
                  </div>
                </div>
                {city.isSaved && (
                  <button
                    className="remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCity?.(city.name);
                    }}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))
          ) : (
            <p>No cities to display.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default HistorySavedCities;
