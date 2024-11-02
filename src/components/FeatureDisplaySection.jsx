import React, { useEffect, useState } from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import Modal from 'react-modal';  // Import react-modal
import { useTranslation } from '../routes/TranslationContext';

// Make sure to set the app element for accessibility
Modal.setAppElement('#root');

const FeatureDisplaySection = () => {
  const [apiKeys, setApiKeys] = useState({ WEATHER_API_KEY: '', MAP_API_KEY: '' });
  const [activeFeature, setActiveFeature] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 30.2672,
    longitude: -97.7431,
    zoom: 9,
    width: '100%',   // Ensure these have proper string values
    height: '400px',
  });

  const { translatedText } = useTranslation(); // Translation hook
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

  useEffect(() => {
    // Ensure this points to your Flask backend
    fetch('http://localhost:5000/api/keys')
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        //console.log("Fetched API Keys:", data);
        setApiKeys(data);
      })
      .catch(error => console.error('Error fetching API keys:', error));
  }, []);


  // Toggles for layers
  const [showClouds, setShowClouds] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [showTemperature, setShowTemperature] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  const toggleLayer = (layer) => {
    if (layer === 'clouds') setShowClouds(!showClouds);
    if (layer === 'precipitation') setShowPrecipitation(!showPrecipitation);
    if (layer === 'temperature') setShowTemperature(!showTemperature);
  };

  const handleFeatureClick = (feature) => {
    if (feature === 'maps') {
      openModal();  // Open the modal when "Interactive Maps" is clicked
    } else {
      setActiveFeature(feature);  // Handle other feature clicks
    }
  };

  return (
    <>
      <section className="py-16 bg-white dark:bg-[#0f172a] dark:text-[#cbd5e1]">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">{translatedText.Features}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Accurate Forecasts Card */}
            <div
              className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110"
              onClick={() => handleFeatureClick('forecasts')}
            >
              <h4 className="text-xl font-semibold">{translatedText.accurateForecasts}</h4>
              <p className="mt-4">{translatedText.reportLocation}</p>
            </div>

            {/* Interactive Maps Card */}
            <div
              className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110"
              onClick={() => handleFeatureClick('maps')}  // Trigger the modal when this card is clicked
            >
              <h4 className="text-xl font-semibold">{translatedText.interactiveMaps}</h4>
              <p className="mt-4">{translatedText.weatherMaps}</p>
            </div>

            {/* Alerts & Warnings Card */}
            <div
              className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110"
              onClick={() => handleFeatureClick('alerts')}
            >
              <h4 className="text-xl font-semibold">{translatedText.alertsWarnings}</h4>
              <p className="mt-4">{translatedText.timelyAlerts}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Map */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Map Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark background overlay
          },
          content: {
            width: '90%',  // Adjust the width
            height: '80%', // Adjust the height
            margin: 'auto', // Automatically center vertically and horizontally
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            overflow: 'hidden',  // Hide any overflow
          }
        }}
      >
        {/* Message to instruct users */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent background
          color: 'white',
          padding: '8px 16px',
          borderRadius: '5px',
          fontSize: '14px',
          textAlign: 'center',
        }}>
          {translatedText.closeMap}
        </div>

        {/* Legend to toggle layers */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '30px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '20px',
          zIndex: 1000,
          borderRadius: '5px',
        }}>
          <h4>{translatedText.Legend}</h4>
          <label>
            <input
              type="checkbox"
              checked={showClouds}
              onChange={() => toggleLayer('clouds')}
              className='checkbox-large'
            />
            {translatedText.Clouds}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showPrecipitation}
              onChange={() => toggleLayer('precipitation')}
              className='checkbox-large'
            />
            {translatedText.Precipitation}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showTemperature}
              onChange={() => toggleLayer('temperature')}
              className='checkbox-large'
            />
            {translatedText.Temperature}
          </label>
        </div>

        {/* Render the Mapbox map inside the modal */}
        <div style={{ width: '100%' ,height: '100%' }}>
          <ReactMapGL
            {...viewport}
            mapboxAccessToken={apiKeys.MAP_API_KEY}
            onMove={(evt) => setViewport(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            scrollZoom={true}     // Enable zooming with scroll
            dragPan={true}        // Enable dragging the map
            touchRotate={true}    // Enable touch gestures for rotation
          >
            {/* Conditionally render weather layers based on the checkbox states */}
            {showClouds && (
              <Source
                id="weather-clouds"
                type="raster"
                tiles={[
                  `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`
                ]}
                tileSize={256}
              >
                <Layer id="clouds-layer" type="raster" />
              </Source>
            )}

            {showPrecipitation && (
              <Source
                id="weather-precipitation"
                type="raster"
                tiles={[
                  `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`
                ]}
                tileSize={256}
              >
                <Layer id="precipitation-layer" type="raster" />
              </Source>
            )}

            {showTemperature && (
              <Source
                id="weather-temperature"
                type="raster"
                tiles={[
                  `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKeys.WEATHER_API_KEY}`
                ]}
                tileSize={256}
              >
                <Layer id="temperature-layer" type="raster" />
              </Source>
            )}
          </ReactMapGL>
        </div>
      </Modal>
    </>
  );
};

export default FeatureDisplaySection;