const handleError = (error) => {
    console.error('Error: ', error); // Log the error for debugging purposes
    return { errorMessage: 'An error occurred. Please try again later.' };
  };
  
  // Handling API errors
  const handleApiError = (response, defaultErrorMessage) => {
    if (!response.ok) {
      const error = defaultErrorMessage || 'Failed to fetch data from the server.';
      return { errorMessage: error };
    }
    return response;
  };
  
  // Handling form input validation errors
  const handleValidationError = (field, value) => {
    if (!value) {
      return { errorMessage: `${field} is required.` };
    }
    // Add more validation logic if needed
    return null;
  };
  
  export default { handleError, handleApiError, handleValidationError };