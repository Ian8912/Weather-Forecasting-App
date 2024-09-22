# WeatherLink

This is a **weather app** project created for our software engineering course. Group members include **Ian Lingo**, **Nicholas Esteves**, **Taj Telesford**, **Anthony Rojas**, and **Ethan Perez**. This project's main goal is to have a functional app that tends to all the user's needs while embedding features that enhances the user experience. Our main target audience is anyone who owns a smartphone and/or computer that plans to use a weather app. We believe that the weather apps that currently exist are insightful and visually appealing, but we believe that there are features that are missing that could better inform the user when it comes to the weather. We hope to create an app that people can love and appreciate.

## General Info

![Weather Display](<AI generated image 'Realistic Weather'.webp>)

## Technologies List

- Javascript (React) -> [What is React?](https://react.dev/)
- Python (Flask) -> [What is Flask?](https://pythonbasics.org/what-is-flask-python/)
- Jira -> [What is Jira?](https://www.atlassian.com/software/jira/guides/getting-started/introduction#what-is-jira-software)
- Bitbucket -> [What is Bitbucket Link?](https://bitbucket.org/product/guides/getting-started/overview#a-brief-overview-of-bitbucket)
- GitKraken -> [What is GitKraken?](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitKraken-tutorial-for-beginners)

## Features

- Basic Landing Page
- Weather Data Fetching
- Geolocation
- 5-Day Weather Forcase
- Clothing Recommendations
- Error Handling
- Loading Indicators
- Dark/Light Mode
- Responsive Design
- Caching

_Note: User stories are grouped to a specific sprint in the implementation stage_

### Sprint 1

**User Story 1: Create basic landing page**

- Landing Page Loads: The landing page should display with a header, an input field, and a footer when visited.
- Input Field Allows Text Entry: The input field should accept text input from the user.
- Basic Form Submission: When the user submits the form, it should trigger an event (no need for actual API calls yet).
- Page is Responsive: The landing page layout should adjust properly on mobile devices and different screen sizes.

**User Story 2: Implement Flask back-end to serve React app and API requests**

- The Flask back-end must be configured and running on a designated port to serve the React app. The React app should be accessible through the Flask server when running in development mode.
- The Flask back-end must provide an API endpoint (like /api/weather) that accepts requests from the React app and handles fetching weather data from an external weather API.
- The Flask back-end must be able to successfully make external API requests to a weather service, process the response, and send the relevant weather data back to the React app in JSON format.
- The Flask back-end must handle errors gracefully, including failed external API requests (e.g., invalid API key, network issues) and return appropriate error responses (e.g., status codes and error messages) to the React app.

**User Story 3: Fetch real-time weather data**

- User must be able to select a city via input or a list. Must show an error message if city doesn’t exist or is invalid.
- Upon successful city selection, the app must show relevant real-time weather data such as temperature, humidity, wind speed, and weather condition (Examples would be sunny, rainy, cloudy, etc.).
- While weather data is loading, there must be a loading indicator that the user must see. If there is an API issue (timeout or no response), there must be an error message to be displayed to user.
- Weather app must display relevant weather data every 10 minutes to keep up with the current time. Must also allow user to refresh data when “refresh” button is clicked.

**User Story 4: Smooth UI and Styling**

- Weather Display Styling: The weather information should be displayed using cards, icons, or charts to make it visually appealing.
- Loading Animations:A loading animation should be shown while weather data is being fetched.
- Responsive Layout: The layout should adjust seamlessly for both mobile and desktop users, ensuring smooth transitions and usability on all devices.
- Dark/Light Theme Toggle: A toggle button should allow the user to switch between dark and light themes, with the app adjusting the visual theme instantly.

**User Story 5: Implement Geolocation Feature**

- The app should automatically detect the user's location using the browser's Geolocation API when the weather page loads.
- The app should ask the user for permission to access their location and only proceed if permission is granted.
- Once the location is detected, the app should fetch and display the weather for the user's current location without needing them to enter a city.
- If location detection fails or permission is denied, the app should show an error message and allow the user to manually enter a city for weather updates.