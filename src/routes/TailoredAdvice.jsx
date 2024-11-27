import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import FeedbackModal from '../components/FeedbackModal'; // Import FeedbackModal component
import API_BASE_URL from '../config';

function TailoredAdvice() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal state and handlers
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });

  // Random background state
  const [backgroundImage, setBackgroundImage] = useState('');

  // Weather Data State
  const [cachedWeatherData, setCachedWeatherData] = useState(null);


  // Array of background images
  const images = [
    '/images/noaa-day-clouds-unsplash.jpg?v=1',
    '/images/noaa-grassfield-unsplash.jpg?v=1',
    '/images/noaa-night-lightning-unsplash.jpg?v=1',
    '/images/noaa-ocean-sunset-unsplash.jpg?v=1',
    '/images/noaa-snowy-terrain-unsplash.jpg?v=1',
  ];

  // Set a random background image on component mount
  useEffect(() => {
    const getRandomImage = () => images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(getRandomImage());

    // Fetch cached weather data from localStorage
    const cachedData = JSON.parse(localStorage.getItem("cachedWeatherData"));
    if (cachedData && cachedData.data) {
      setCachedWeatherData(cachedData.data); // Set state with weather data
    } else {
      console.warn("No cached weather data found.");
    }
  }, []); // Only runs once when the component is mounted

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Feedback submitted:', formData); // Replace with your submission logic
      setFormData({ name: '', email: '', feedback: '' }); // Reset form after submission
      handleCloseModal(); // Close modal after submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse("");

    // Ensure cachedWeatherData is available
    if (!cachedWeatherData) {
      setAiResponse("No weather data available. Please try refreshing the page.");
      setLoading(false);
      return;
    }

    try {
      // Prepare the prompt with cached weather data
      const prompt = `
        Provide tailored weather advice based on the following data:
        - City: ${cachedWeatherData.city}
        - Temperature: ${cachedWeatherData.temperature_fahrenheit}°F (${cachedWeatherData.temperature_celsius}°C)
        - Humidity: ${cachedWeatherData.humidity}%
        - Weather Condition: ${cachedWeatherData.description}
        - Max Temperature: ${cachedWeatherData.max_temp_fahrenheit}°F (${cachedWeatherData.max_temp_celsius}°C)
        - Min Temperature: ${cachedWeatherData.min_temp_fahrenheit}°F (${cachedWeatherData.min_temp_celsius}°C)
        - UV Index: ${cachedWeatherData.uv_index}
        - Air Quality Index: ${cachedWeatherData.air_quality}
        User Input: ${userInput}
        Respond with activities and precautions in **exactly 4 sentences** or fewer. Be brief, clear, and to the point.
      `;

      // Send prompt to Flask backend
      const result = await axios.post(`${API_BASE_URL}/generate-prompt`, {
        user_input: prompt,
      });

      // Update AI response
      setAiResponse(result.data.response);
    } catch (error) {
      setAiResponse("Error generating tailored advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {/* Navbar Section */}
      <header className="p-2 py-8 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
        <Navbar />
      </header>

      {/* Main Content with Background */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: 'calc(100vh - 10rem)', // Subtract height of the footer
        }}
        className="flex flex-col justify-center items-center"
      >
        <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-black p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Tailored Advice</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Ask for weather-based advice here!"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border rounded w-full p-8"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Loading...' : 'Get Advice'}
            </button>
          </form>
          {aiResponse && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <h2 className="font-semibold text-xl mb-2">AI Response</h2>
              <ul className="space-y-2">
                {/* Display the response in a structured format */}
                {aiResponse.split("\n").map((line, index) => (
                  <li key={index} className="text-lg leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  onClick={() =>
                    alert("Explore more activities tailored for today's weather!")
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Explore Activities
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-blue-500 dark:bg-[#312e81] dark:text-[#cbd5e1] text-white text-center flex flex-col items-center">
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={handleOpenModal}
            className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-[#312e81] dark:text-[#cbd5e1] rounded-lg"
          >
            Give Feedback
          </button>
          <p>&copy; 2024 WeatherLink. All rights reserved.</p>
        </div>
      </footer>

      {/* Feedback Modal */}
      <FeedbackModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleFeedbackSubmit}
        formData={formData}
        handleFeedbackChange={handleFeedbackChange}
      />
    </div>
  );
}

export default TailoredAdvice;
