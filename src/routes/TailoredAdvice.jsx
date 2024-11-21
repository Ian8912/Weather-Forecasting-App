import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import FeedbackModal from '../components/FeedbackModal'; // Import FeedbackModal component

function TailoredAdvice() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal state and handlers
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });

  // Random background state
  const [backgroundImage, setBackgroundImage] = useState('');

  // Array of background images
  const images = [
    '/images/noaa-day-clouds-unsplash.jpg',
    '/images/noaa-grassfield-unsplash.jpg',
    '/images/noaa-night-lightning-unsplash.jpg',
    '/images/noaa-ocean-sunset-unsplash.jpg',
    'images/noaa-snowy-terrain-unsplash.jpg'
  ];

  // Set a random background image on component mount
  useEffect(() => {
    const getRandomImage = () => images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(getRandomImage());
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
    setAiResponse('');
    try {
      const result = await axios.post('http://localhost:5000/generate-prompt', {
        user_input: userInput,
      });
      setAiResponse(result.data.response);
    } catch (error) {
      setAiResponse('Error generating tailored advice. Please try again.');
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
              <h2 className="font-semibold">AI Response:</h2>
              <p>{aiResponse}</p>
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
