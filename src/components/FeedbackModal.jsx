import React from 'react';

const FeedbackModal = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Feedback Form</h2>
        <p>This is where the feedback form will go.</p>
      </div>
    </div>
  );
};

export default FeedbackModal;
