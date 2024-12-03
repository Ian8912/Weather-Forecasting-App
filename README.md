# WeatherLink

This is a **weather app** project created for our software engineering course. Group members include **Ian Lingo**, **Nicholas Esteves**, **Taj Telesford**, **Anthony Rojas**, and **Ethan Perez**. This project's main goal is to have a functional app that tends to all the user's needs while embedding features that enhances the user experience. Our main target audience is anyone who owns a smartphone and/or computer that plans to use a weather app. We believe that the weather apps that currently exist are insightful and visually appealing, but we believe that there are features that are missing that could better inform the user when it comes to the weather. We hope to create an app that people can love and appreciate.

## General Info

![Weather Display](<images/AI generated image 'Realistic Weather'.webp>)

## Technologies List

- Javascript (React) -> [What is React?](https://react.dev/)
- Python (Flask) -> [What is Flask?](https://pythonbasics.org/what-is-flask-python/)
- Jira -> [What is Jira?](https://www.atlassian.com/software/jira/guides/getting-started/introduction#what-is-jira-software)
- Bitbucket -> [What is Bitbucket Link?](https://bitbucket.org/product/guides/getting-started/overview#a-brief-overview-of-bitbucket)
- GitKraken -> [What is GitKraken?](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitKraken-tutorial-for-beginners)

## Features

- Basic Landing Page
- Error Handling
- Responsive Design
- Dark/Light Mode
- Loading Indicators
- Weather Data Fetching
- Caching
- City Search Bar
- Geolocation

**Future Features**

- 5-Day Weather Forcast
- Real-time Map with Forecast
- Change Language for Pages
- Clothing Recommendations
- User-Oriented Recommendations

## Sprint 1 (September 23, 2024 - October 5, 2024)

### Contributions

**Ian:**

- **Jira Task CP-42: Set up initial styling for responsiveness**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-42?atlOrigin=eyJpIjoiMTMzYmUxMTJmMDEyNDVhMTgzYjk1ZTY4OGMzM2U0ZDUiLCJwIjoiaiJ9

- **Jira Task CP-62: Integrate CORS to handle cross-origin requests from the React front-end**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-62?atlOrigin=eyJpIjoiNGMzNDk5MDU2MDg0NGI5NDhjODZjMmYwMTdiOWNlZDYiLCJwIjoiaiJ9

- **Jira Task CP-48: Implement Route for serving React app in Flask**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-48?atlOrigin=eyJpIjoiNGJkZWUxYTkzYWJjNDk3YTlmYTYzNGY2N2VhOWExMzMiLCJwIjoiaiJ9

- **Jira Task CP-118: Fine-tune visual details (e.g., spacing, fonts, colors)**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-118?atlOrigin=eyJpIjoiMWExZDMwMTQ2NDYwNDhjMWE1YzUxMGUxNzkzZjcyYzAiLCJwIjoiaiJ9

- **Jira Task CP-73: Add an option for users to manually input a city if they prefer**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-73?atlOrigin=eyJpIjoiOGM0OTFjY2VmM2ZkNDAyN2E0NGQ1ZmJkMjQyODhkZDUiLCJwIjoiaiJ9

- **Jira Task CP-55: Optimize the layout for both mobile and desktop users as well as fix city search name ambiguous issue**
  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-55?atlOrigin=eyJpIjoiYTQ5ODZmNGYzMzAzNGQ3Njg5NDdmNWI4YzVhNDY2OGIiLCJwIjoiaiJ9

**##############################################################################################**

**Nicholas:**

- **Jira Task CP-71: Automatically fetch weather data based on the user's location when they visit the site.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-71?atlOrigin=eyJpIjoiMzU4ZDYzMDRiMDkxNDc3MGE0MzA4NzU1MGJhMDM0OGIiLCJwIjoiaiJ9

- **Jira Task CP-41: Implement basic form submission functionality (but no API calls yet).**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-41?atlOrigin=eyJpIjoiYjNiNGVlNWNhOTYwNGU5MjhmMDcwYzQ2NzZjZjZjZjYiLCJwIjoiaiJ9

- **Jira Task CP-65: Create unit tests to ensure Flask routes respond correctly.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-65?atlOrigin=eyJpIjoiYmY1NTNjNWU4ZTA0NDgzNWE4MzdiMzRjZTdlNGRkMTQiLCJwIjoiaiJ9

- **Jira Task CP-54: Display weather data (e.g., temperature, humidity) in structured React components.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-54?atlOrigin=eyJpIjoiN2Q5YTFkNTEzNDc3NDgzMmI3MGRjNmM2ZGMyMDY5OGUiLCJwIjoiaiJ9

- **Jira Task CP-52: Add animations for loading states while fetching weather data.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-52?atlOrigin=eyJpIjoiYzFmMThlMWQwMjkwNDUxZjk1ZjFlYzA5YTE4YWEyMTIiLCJwIjoiaiJ9

- **Jira Task CP-135: Update the Flask back-end to fetch real weather data.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-135?atlOrigin=eyJpIjoiNTVhNmEyYTJiYTIwNDdiYjlkZWI5Nzk2ZjgzNWQ3NzIiLCJwIjoiaiJ9

- **Jira Task CP-51: Implement a front-end API call using axios or fetch in React to get weather data.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-51?atlOrigin=eyJpIjoiZGJlNjlhMDc2NGQ1NDgzMGE4NTgyZTFhOGQzZGZkNjgiLCJwIjoiaiJ9

- **Jira Task CP-57: Add error handling for invalid city names and API request failures.**

- Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-57?atlOrigin=eyJpIjoiYTQ2ODBlZDcyZTZmNDY2MjhlOTVmZDMxM2NiN2IwZDAiLCJwIjoiaiJ9

**##############################################################################################**

**Anthony:**

- **Jira Task CP-40: Create static landing page with input field, header, and footer.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-40

- **Jira Task CP-61: Set up flask and /weather route with a placeholder response for weather data.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-61

- **Jira Task CP-58: Implement a dark/light theme toggle for user preference.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-58

- **Jira Task CP-46: Modify the Flask /weather route to fetch data from the API.**

  - Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-46

**##############################################################################################**


## Sprint 2 (October 14th, 2024 - November 4th, 2024)

### Contributions

**Anthony:**

- **Jira Task SCRUM-140: Break down some components (e.g., App.jsx) into smaller, reusable components.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-140

- **Jira Task SCRUM-100: install i18next dependencies and configure i18next file**

- Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-100

- **Jira Task SCRUM-99: Set up DeepL API in the backend**

- Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-99

- **Jira Task SCRUM-97: Configure all front-end files to apply translation**

- Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-97

- **Jira Task SCRUM-97: Implement language selection (e.g., English, Spanish, French) in the settings or header.**

- Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-96

### Reports

![Sprint1BurnupReport](images/SE-Sprint1-Jira-Report.png)

### Next Steps (for Sprint 2)

_Note: Specific roles are not delegated yet as of October 9, 2024_

**User Story 6:** Add Weather Forecast As a user, I would like to see a 5-day weather forecast so that I can plan ahead based on future weather conditions.

**User Story 7:** Add UV Index As a user, I would like the UV index so that I can make informed decisions about sun exposure and protect my skin from harmful ultraviolet radiation

**User Story 8:** Add Loading Indicators and Feedback As a user, I would like to see a loading spinner while data is being fetched so that I know the app is processing my request

**User Story 9:** Cache Weather Data As a user, I would like the app to cache previously fetched weather data so that I don’t have to wait for a new API request when searching for the same city multiple times

**User Story 10:** Improve Error Handling and User Experience As a user, I would like the app to provide clear and helpful error messages when something goes wrong so that I understand what happened and how to fix it

## Sprint 2 (October 13, 2024 - November 3, 2024)

### Contributions

**Ian:**

- **Jira Task SCRUM-138: Refactor API calls (for weather, geolocation, UV index) into a dedicated service file (weatherService.js or apiService.js), making the logic reusable across multiple components.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-138

    - Bitbucket Commits:
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/aea3e922d93fbed7a69c179657125e6c102cf936
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/ce77d4b7743b815a2f1ddb833c2af9107196be3f

- **Jira Task SCRUM-123: Implement map markers and weather data fetching.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-123

    - Bitbucket Commits:
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/aad201ea7a1fd5d7ee88a249d0aa86f84e4890ca
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/5ac0571a39b833d2708243f0d3c341d40b0d483a

- **Jira Task SCRUM-124: Refine and test dynamic map interactions UI/UX.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-124

    - Bitbucket Commits:
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/6541ac0ddd117442171bc64132e4139e643348de
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/85f2b25dae9e812da0764942ecf0557de71f9261
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/5973fe24fb6b22e19b8349e60d7eead5ea4a2404

- **Jira Task SCRUM-79: Implement map features (temp, wind, pop-ups, etc.) with real-time updates for when weather conditions change.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-79

    - Bitbucket Commits:
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/bde4a1eee12574b522929339b048076e7569fc76
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/53be868f9fb8057f7848c774932731e0e82e1dd7
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/0af3a1f61bc76c9998105402a334b218519844c0
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/7ba35b2a835d47e293dab2de9b2d680ddf2d4b5f

- **Jira Task SCRUM-78: Fix and test all toggle/data features (UV Index, Air Quality, etc).**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-78

    - Bitbucket Commits:
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/60a5b407014cc44821def7a57f6f61c9ecc73524
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/f1aa12ee0b0f98d7867e17e6e76d6547b9583039

- **Jira Task SCRUM-56: Modify interactive map to fit within same component as current weather and forecast data display.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-56

    - Bitbucket Commits:
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/450618606235e5cc9d88ed1b03a3c8a53aba31a2
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/d1efd6f9f57901fcf01c5785b1c352bfb2a5fad8
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/de4beea930ace78bd0324b9d45777d3eae7e0308
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/29821c03b5dd5e22c8d9cfed831f267e5f3ff91f
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/38bf17f02ee28175ccdc6d8f71d1b9d8bfa0caa5
      - https://bitbucket.org/cs3398-gorns-f24/%7B967422e6-c3bf-46a5-b616-e8b98bad8dbc%7D/commits/ebaa1f1c456486a575d309d503e9add7150de001

**##############################################################################################**

**Anthony:**

- **Jira Task SCRUM-140: Break down some components (e.g., App.jsx) into smaller, reusable components.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-140

- **Jira Task SCRUM-100: install i18next dependencies and configure i18next file**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-100

- **Jira Task SCRUM-99: Set up DeepL API in the backend**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-99

- **Jira Task SCRUM-97: Configure all front-end files to apply translation**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-97

- **Jira Task SCRUM-97: Implement language selection (e.g., English, Spanish, French) in the settings or header.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-96

**##############################################################################################**

**Nicholas:**

- **Jira Task SCRUM-142: API-integration for feedback form**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-142?atlOrigin=eyJpIjoiNWMwODFjMjU5NzkwNGQ1Nzg4YjQxODcyNDM3ZDRlOTUiLCJwIjoiaiJ9

- **Jira Task SCRUM-136: Folder rescruture, organizes components, services, and utilities in a scalable manner.**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-139?atlOrigin=eyJpIjoiMjczMTYyZTk1NjgzNGRiYzlkZDI3YzMzZDUxZDU2ZjciLCJwIjoiaiJ9

- **Jira SCRUM-25: Create feedback form automation**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-143?atlOrigin=eyJpIjoiNzhhZmJjZmVkNzQ1NDRhZmJhOGExMTVkNDJhOGJlMTciLCJwIjoiaiJ9

- **Jira SCRUM-145: Implement Success and Error Messages for Feedback Submission**

  - Jira Link: https://cs3398-gorns-fall24.atlassian.net/browse/SCRUM-145?atlOrigin=eyJpIjoiYTkzNTE2ODJjYjE1NDU4YzliZWQwYTRhODAxNDhjYTMiLCJwIjoiaiJ9

**##############################################################################################**

### Reports

![Sprint2BurnupReport](images/SE-Sprint2-Jira-Report.png)

### Next Steps (for Sprint 2)

_Note: Specific roles are not delegated yet as of November 5, 2024_

**User Story 14:** Add Historical Weather Data As a user, I would like historical weather data so that I can analyze past weather patterns, compare previous conditions to the current forecast, and plan future activities based on trends.

**User Story 15:** Deploy the App and Monitor Performance As a developer, I would like to deploy the app and monitor its performance so that I can ensure it runs smoothly in production.

**User Story 16:** Add Clothing Suggestion As a user, I would like clothing suggestions so that I can dress appropriately for the weather conditions and stay comfortable throughout the day.

**Note:** More Stories will be added. Stay tuned.

## Project Setup Instructions

_Note: The program runs on the **Development Branch**. Please use this branch for **demoing**._

### Step 1: Download Project Dependencies

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Python**:
   Make sure Python is installed on your system. Check by running:
   ```bash
   python --version
   ```
   If Python is not installed, download and install it from [python.org](https://www.python.org/).

### Step 2: Set Up the Python Backend Environment

1. **Create a virtual environment**:
   This isolates your Python environment so that dependencies are kept separate.

   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:

   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **MacOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

3. **Install backend dependencies**:
   With the virtual environment activated, install the necessary Python packages.
   ```bash
   pip install -r requirements.txt
   ```

### Step 3: Set Up the Frontend with npm

1. **Install Node.js**:
   Ensure that Node.js and npm (Node Package Manager) are installed by running:

   ```bash
   node --version
   npm --version
   ```

   If Node.js isn't installed, download and install it from [nodejs.org](https://nodejs.org/).

2. **Navigate to the frontend/root directory**:
   Assuming your frontend code is in a folder like `client`, move to that directory:

   ```bash
   cd client
   ```

3. **Install frontend dependencies**:
   Run the following command to install the required npm packages.

   ```bash
   npm install
   ```

4. **Build the frontend**:
   To create a production-ready build of the frontend, run:

   ```bash
   npm run build
   ```

5. **Start the frontend development server**:
   This command will start the frontend server, typically running on `localhost:5173`.
   ```bash
   npm run dev
   ```

### Step 4: Run the Backend Server

1. **In a new terminal window**, activate the virtual environment again (if not already activated):

   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **MacOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

2. **Run the Flask backend**:
   This will run the Flask app on `localhost:5000`.
   ```bash
   python server/app.py
   ```

### Step 5: Access the Application

- **Access the Frontend**:
  Open your browser and visit the frontend at `http://localhost:5173`.

- **Check Backend APIs**:
  The backend APIs will be available at `http://localhost:5000`. The frontend should communicate with the backend via these APIs if everything is set up correctly.

By following these steps, you will have both the frontend and backend running and be able to develop and test the application effectively.

### Step 6: Set up the Saved Cities History Backend Server

1. **Install necessary dependencies**:
    These dependencies are for handling HTTP requests, enabling cross-origin resource sharing, and parsing incoming request bodies.
    ```npm install express cors body-parser

2. **Run the History backend**:
    This will run the History server on `http://localhost:3001`.
    ``node server.js

### Notes:

If you try to open **app.py** through `http://localhost:5000`, you will get a 404 error code. Run the server and backend on two different terminals and use the frontend development
server `http://localhost:5173`.

### Testing:

Run the following in directory
'pytest'
