import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; 

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.feedback) {
      alert('All fields are required.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('feedback') // The table name in Supabase
        .insert([
          {
            name: formData.name,
            email: formData.email,
            feedback: formData.feedback,
          },
        ]);

      if (error) {
        console.error('Error submitting feedback:', error.message);
        alert('Error submitting feedback. Please try again.');
      } else {
        console.log('Feedback submitted:', data);
        alert('Feedback submitted successfully!');
        setFormData({ name: '', email: '', feedback: '' }); // Clear the form
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <textarea
        name="feedback"
        value={formData.feedback}
        onChange={handleChange}
        placeholder="Your Feedback"
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
