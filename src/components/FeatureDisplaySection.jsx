import React, { useState } from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import Modal from 'react-modal';  // Import react-modal

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const MAP_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

console.log("OpenWeatherMap API Key:", WEATHER_API_KEY);
console.log("Mapbox API Key:", MAP_API_KEY);

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

  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

  const openModal = () => {
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
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
            width: '80%',  // Adjust the width
            height: '70%', // Adjust the height
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
            {/* Add OpenWeatherMap Cloud Layer */}
            <Source
              id="weather-clouds"
              type="raster"
              tiles={[
                `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`
              ]}
              tileSize={512}
            >
              <Layer id="clouds-layer" type="raster" />
            </Source>

            {/* Add OpenWeatherMap Precipitation Layer */}
            <Source
              id="weather-precipitation"
              type="raster"
              tiles={[
                `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`
              ]}
              tileSize={512}
            >
              <Layer id="precipitation-layer" type="raster" />
            </Source>
          </ReactMapGL>
        </div>
      </Modal>
    </>
  );
};

export default FeatureDisplaySection;