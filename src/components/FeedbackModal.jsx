import React from 'react';
import { useTranslation } from '../routes/TranslationContext';

const FeedbackModal = ({ isVisible, onClose, onSubmit, formData, handleFeedbackChange }) => {
  if (!isVisible) return null;
  const { translatedText } = useTranslation(); // Translation hook
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2">X</button>
        <h2 className="text-xl font-bold">We'd Love Your Feedback</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="w-full px-3 py-2 border rounded" 
              required 
              value={formData.name} 
              onChange={handleFeedbackChange} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="w-full px-3 py-2 border rounded" 
              required 
              value={formData.email} 
              onChange={handleFeedbackChange} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="feedback">Feedback</label>
            <textarea 
              id="feedback" 
              name="feedback" 
              className="w-full px-3 py-2 border rounded" 
              required 
              value={formData.feedback} 
              onChange={handleFeedbackChange}
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{translatedText.Submit}</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
