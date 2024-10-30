import React, { useEffect, useState } from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import Modal from 'react-modal';  // Import react-modal
import { useTranslation } from '../routes/TranslationContext';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const MAP_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

//console.log("OpenWeatherMap API Key:", WEATHER_API_KEY);
//console.log("Mapbox API Key:", MAP_API_KEY);

// Make sure to set the app element for accessibility
Modal.setAppElement('#root');

const FeatureDisplaySection = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 30.2672,
    longitude: -97.7431,
    zoom: 9,
    width: '100%',   // Ensure these have proper string values
    height: '400px',
  });

  const { translatedText } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

  // Toggles for layers
  const [showClouds, setShowClouds] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  //const [showUvIndex, setShowUvIndex] = useState(false);
  //const [showAirQuality, setShowAirQuality] = useState(false);
  const [showTemperature, setShowTemperature] = useState(false);

  // Data states for different layers
  //const [uvData, setUvData] = useState([]);
  //const [airQualityData, setAirQualityData] = useState([]);

  //let uvLastFetchTime = 0;
  //let airQualityLastFetchTime = 0;
  
  // Fetch UV Index Data
  {/*useEffect(() => {
    async function fetchUvIndex() {
      const currentTime = Date.now();
      // Fetch only if more than 10 minutes have passed since the last request
      if (currentTime - uvLastFetchTime > 600000) {
        try {
          const lat = viewport.latitude;
          const lon = viewport.longitude;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${WEATHER_API_KEY}`
          );
          if (!response.ok) throw new Error('Failed to fetch UV Index data');
          const data = await response.json();
          setUvData([data.current.uvi]);
          uvLastFetchTime = currentTime; // Update last fetch time
        } catch (error) {
          console.error(error);
          setUvData([]); // Handle error
        }
      }
    }
  
    if (showUvIndex) fetchUvIndex();
  }, [showUvIndex, viewport.latitude, viewport.longitude]);*/}
  
  // Fetch Air Quality Data
  {/*useEffect(() => {
    async function fetchAirQuality() {
      const currentTime = Date.now();
      // Fetch only if more than 10 minutes have passed since the last request
      if (currentTime - airQualityLastFetchTime > 600000) {
        try {
          const lat = viewport.latitude;
          const lon = viewport.longitude;
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
          );
          if (!response.ok) throw new Error('Failed to fetch air quality data');
          const data = await response.json();
          setAirQualityData(data.list);
          airQualityLastFetchTime = currentTime; // Update last fetch time
        } catch (error) {
          console.error(error);
          setAirQualityData([]); // Handle error
        }
      }
    }
  
    if (showAirQuality) fetchAirQuality();
  }, [showAirQuality, viewport.latitude, viewport.longitude]);*/}

  //console.log('UV Data:', uvData);
  //console.log('Air Quality Data:', airQualityData);

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
    //if (layer === 'uvIndex') setShowUvIndex(!showUvIndex);
    //if (layer === 'airQuality') setShowAirQuality(!showAirQuality);
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
          <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Accurate Forecasts Card */}
            <div
              className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110"
              onClick={() => handleFeatureClick('forecasts')}
            >
              <h4 className="text-xl font-semibold">Accurate Forecasts</h4>
              <p className="mt-4">Get up-to-the-minute weather reports based on your location.</p>
            </div>

            {/* Interactive Maps Card */}
            <div
              className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110"
              onClick={() => handleFeatureClick('maps')}  // Trigger the modal when this card is clicked
            >
              <h4 className="text-xl font-semibold">Interactive Maps</h4>
              <p className="mt-4">Visualize weather patterns with dynamic weather maps.</p>
            </div>

            {/* Alerts & Warnings Card */}
            <div
              className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110"
              onClick={() => handleFeatureClick('alerts')}
            >
              <h4 className="text-xl font-semibold">Alerts & Warnings</h4>
              <p className="mt-4">Receive timely alerts on severe weather conditions in your area.</p>
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
          To close map, click outside the modal.
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
          <h4>Legend</h4>
          <label>
            <input
              type="checkbox"
              checked={showClouds}
              onChange={() => toggleLayer('clouds')}
              className='checkbox-large'
            />
            Clouds
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showPrecipitation}
              onChange={() => toggleLayer('precipitation')}
              className='checkbox-large'
            />
            Precipitation
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showTemperature}
              onChange={() => toggleLayer('temperature')}
              className='checkbox-large'
            />
            Temperature
          </label>
          {/*<br />
          <label>
            <input
              type="checkbox"
              checked={showUvIndex}
              onChange={() => toggleLayer('uvIndex')}
              className="checkbox-large"
            />
            UV Index
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showAirQuality}
              onChange={() => toggleLayer('airQuality')}
              className="checkbox-large"
            />
            Air Quality
          </label>*/}
        </div>

        {/* Temporary div for debugging */}
        {/*<div style={{ height: '100%', backgroundColor: 'red' }}>
          <p>Map should be here</p>
        </div>
      </Modal>*/}

        {/* Render the Mapbox map inside the modal */}
        <div style={{ width: '100%' ,height: '100%' }}>
          <ReactMapGL
            {...viewport}
            mapboxAccessToken={MAP_API_KEY}
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
                  `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`
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
                  `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`
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
                  `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`
                ]}
                tileSize={256}
              >
                <Layer id="temperature-layer" type="raster" />
              </Source>
            )}

            {/* UV Index Markers */}
            {/*{showUvIndex && uvData.length > 0 && uvData.map((uv, index) => (
              uv && (
                <Marker key={index} latitude={uv.lat} longitude={uv.lon}>
                  <div style={{
                    backgroundColor: uv.value > 11 ? 'purple' :
                                    uv.value > 8 ? 'red' :
                                    uv.value > 6 ? 'orange' :
                                    uv.value > 3 ? 'yellow' : 'green',
                    width: '40px',  // Increased width for better visibility
                    height: '40px', // Increased height for better visibility
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                    UV: {uv.value}
                  </div>
                </Marker>
              )
            ))}*/}

            {/* Air Quality Markers */}
            {/*{showAirQuality && airQualityData.length > 0 && airQualityData.map((aqi, index) => (
              aqi && aqi.coord && (
                <Marker key={index} latitude={aqi.coord.lat || 0} longitude={aqi.coord.lon || 0}>
                  <div style={{
                    backgroundColor: aqi.main.aqi <= 2 ? 'green' :
                                    aqi.main.aqi === 3 ? 'yellow' : 'red',
                    width: '40px',  // Increased width for better visibility
                    height: '40px', // Increased height for better visibility
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                    AQI: {aqi.main.aqi || 'N/A'}
                  </div>
                </Marker>
              )
            ))}*/}
          </ReactMapGL>
        </div>
      </Modal>
    </>
  );
};

export default FeatureDisplaySection;