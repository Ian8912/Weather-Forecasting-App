import React, { useState } from 'react';

function CoordinateInputCard() {
  const [longCoordinates, setLongCoordinates] = useState();
  const [latCoordinates, setLatCoordinates] = useState()

  const longHandleChange = (e) => {
    const {_, value} = e.target;
    setLongCoordinates(value)
  };

  const latHandleChange = (e) => {
    const {_, value} = e.target
    setLatCoordinates(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Example: Post the data to a server
    fetch(`http://localhost:5000/weather/${latCoordinates}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: latCoordinates,
        long: longCoordinates
      })
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-[#0f172a] rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center dark:text-[#cbd5e1]">Enter Coordinates</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="latitude" className="block mb-2 dark:text-[#cbd5e1]">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={latCoordinates}
            onChange={(e)=>latHandleChange(e)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-[#1e293b]"
            placeholder="Enter latitude"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="longitude" className="block mb-2 dark:text-[#cbd5e1]">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={longCoordinates}
            onChange={(e)=>longHandleChange(e)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-[#1e293b]"
            placeholder="Enter longitude"
            required
          />
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white dark:bg-[#312e81] dark:hover:bg-[#4c1d95] rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CoordinateInputCard;