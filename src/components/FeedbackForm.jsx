import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; 

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous errors

    // Validate inputs
    if (!formData.name || !formData.email || !formData.feedback) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true); // Disable submit button while submitting

    try {
      const { data, error } = await supabase
        .from('feedback') // The table name in Supabase
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            feedback: formData.feedback.trim(),
          },
        ]);

      if (error) {
        console.error('Error submitting feedback:', error.message);
        setErrorMessage('Error submitting feedback. Please try again.');
      } else {
        console.log('Feedback submitted:', data);
        alert('Feedback submitted successfully!');
        setFormData({ name: '', email: '', feedback: '' }); // Clear the form
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="block w-full px-3 py-2 border rounded-md focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="block w-full px-3 py-2 border rounded-md focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          placeholder="Your Feedback"
          className="block w-full px-3 py-2 border rounded-md focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
