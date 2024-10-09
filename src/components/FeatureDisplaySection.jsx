import React from 'react'

const FeatureDisplaySection = () => {
  return (
    <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110">
                <h4 className="text-xl font-semibold">Accurate Forecasts</h4>
                <p className="mt-4">Get up-to-the-minute weather reports based on your location.</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110">
                <h4 className="text-xl font-semibold">Interactive Maps</h4>
                <p className="mt-4">Visualize weather patterns with dynamic weather maps.</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-[#312e81] dark:shadow-[#1e1b4b] rounded-lg shadow-lg text-center transition transform hover:scale-110">
                <h4 className="text-xl font-semibold">Alerts & Warnings</h4>
                <p className="mt-4">Receive timely alerts on severe weather conditions in your area.</p>
              </div>
            </div>
          </div>
  )
}

export default FeatureDisplaySection