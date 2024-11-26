import React, { useEffect, useState, useCallback } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const MAP_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

Modal.setAppElement('#root');

const Legend = ({ toggleLayer, showClouds, showPrecipitation, showTemperature }) => (
  <div className="map-legend">
    <h4>Legend</h4>
    <label>
      <input
        type="checkbox"
        checked={showClouds}
        onChange={() => toggleLayer('clouds')}
        className="checkbox-large"
      />
      Clouds
    </label>
    <label>
      <input
        type="checkbox"
        checked={showPrecipitation}
        onChange={() => toggleLayer('precipitation')}
        className="checkbox-large"
      />
      Precipitation
    </label>
    <label>
      <input
        type="checkbox"
        checked={showTemperature}
        onChange={() => toggleLayer('temperature')}
        className="checkbox-large"
      />
      Temperature
    </label>
  </div>
);

const FeatureDisplaySection = () => {
  const { t } = useTranslation();
  const [viewport, setViewport] = useState({
    latitude: 30.2672,
    longitude: -97.7431,
    zoom: 9,
    width: '100%',
    height: '100%',
  });

  const onMove = useCallback((event) => {
    setViewport(event.viewState);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showClouds, setShowClouds] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [showTemperature, setShowTemperature] = useState(false);

  const toggleLayer = (layer) => {
    if (layer === 'clouds') setShowClouds((prev) => !prev);
    if (layer === 'precipitation') setShowPrecipitation((prev) => !prev);
    if (layer === 'temperature') setShowTemperature((prev) => !prev);
  };

  return (
    <>
      <section className="py-16 bg-white dark:bg-[#0f172a] dark:text-[#cbd5e1]">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">{t('Features')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="p-6 bg-blue-50 dark:bg-[#312e81] rounded-lg shadow-lg text-center transition transform hover:scale-110"
              onClick={() => setIsModalOpen(true)}
            >
              <h4 className="text-xl font-semibold">{t('Interactive Maps')}</h4>
              <p className="mt-4">{t('Visualize weather patterns with dynamic weather maps.')}</p>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Map Modal"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            width: '90%',
            height: '80%',
            margin: 'auto',
            padding: '0',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
          },
        }}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          aria-label="Close map modal"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            fontSize: '18px',
            zIndex: 1001,
          }}
        >
          &times;
        </button>
        <Legend
          toggleLayer={toggleLayer}
          showClouds={showClouds}
          showPrecipitation={showPrecipitation}
          showTemperature={showTemperature}
        />
        <div style={{ width: '100%', height: '100%' }}>
          <ReactMapGL
            {...viewport}
            mapboxAccessToken={MAP_API_KEY}
            onMove={onMove}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            {showClouds && (
              <Source
                id="clouds-layer-source"
                type="raster"
                tiles={[
                  `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`,
                ]}
                tileSize={256}
              >
                <Layer id="clouds-layer" type="raster" />
              </Source>
            )}
            {showPrecipitation && (
              <Source
                id="precipitation-layer-source"
                type="raster"
                tiles={[
                  `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`,
                ]}
                tileSize={256}
              >
                <Layer id="precipitation-layer" type="raster" />
              </Source>
            )}
            {showTemperature && (
              <Source
                id="temperature-layer-source"
                type="raster"
                tiles={[
                  `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`,
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
