import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/weather')
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // console log default until API call is implemented
    // API call goes here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="p-6 bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">WeatherLink</h1>

          {/* Hamburger Menu for Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xlmns="https://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {/* Links for Larger Screens */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Features</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="hover:text-gray-300">Log in</a></li>
          </ul>
        </div>

        {/* Links for Smaller Screens, Toggled by Hamburger Button */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col space-y-4 mt-4 text-center">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Features</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="hover:text-gray-300">Log in</a></li>
          </ul>
        )}
      </nav>

      {/* Check Weather Section */}
      <header className="bg-blue-500 text-white py-24 text-center">
        <h2 className="text-4xl font-bold">Get the Latest Weather Updates</h2>
        <p className="mt-4 text-lg">Stay updated with accurate weather information, forecasts, and more.</p>
        <button className="mt-8 px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg">Check Weather Now</button>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold">Accurate Forecasts</h4>
              <p className="mt-4">Get up-to-the-minute weather reports based on your location.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold">Interactive Maps</h4>
              <p className="mt-4">Visualize weather patterns with dynamic weather maps.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold">Alerts & Warnings</h4>
              <p className="mt-4">Receive timely alerts on severe weather conditions in your area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Feedback Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-blue-600 text-white text-center">
        <p>&copy; 2024 WeatherLink. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
