import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function TailoredAdvice() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="p-2 py-8 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
        <h1 className="text-3xl font-bold mb-4">Tailored Advice</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ask for weather-based advice..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border rounded w-full p-3"
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
  );
}

export default TailoredAdvice;
