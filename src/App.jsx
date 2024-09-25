import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="p-6 bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">WeatherLink</h1>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Features</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="hover:text-gray-300">Log in</a></li>
          </ul>
        </div>
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

      {/* Footer */}
      <footer className="py-8 bg-blue-600 text-white text-center">
        <p>&copy; 2024 WeatherLink. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
