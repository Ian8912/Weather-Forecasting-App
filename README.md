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

### Sprint 1 (September 23, 2024 - October 5, 2024)

**Ian's Tasks:**

-`Jira Task CP-42: Set up initial styling for responsiveness`
-Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-42?atlOrigin=eyJpIjoiMTMzYmUxMTJmMDEyNDVhMTgzYjk1ZTY4OGMzM2U0ZDUiLCJwIjoiaiJ9

-`Jira Task CP-62: Integrate CORS to handle cross-origin requests from the React front-end`
-Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-62?atlOrigin=eyJpIjoiNGMzNDk5MDU2MDg0NGI5NDhjODZjMmYwMTdiOWNlZDYiLCJwIjoiaiJ9

-`Jira Task CP-48: Implement Route for serving React app in Flask`
-Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-48?atlOrigin=eyJpIjoiNGJkZWUxYTkzYWJjNDk3YTlmYTYzNGY2N2VhOWExMzMiLCJwIjoiaiJ9

-`Jira Task CP-118: Fine-tune visual details (e.g., spacing, fonts, colors)`
-Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-118?atlOrigin=eyJpIjoiMWExZDMwMTQ2NDYwNDhjMWE1YzUxMGUxNzkzZjcyYzAiLCJwIjoiaiJ9

-`Jira Task CP-73: Add an option for users to manually input a city if they prefer`
-Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-73?atlOrigin=eyJpIjoiOGM0OTFjY2VmM2ZkNDAyN2E0NGQ1ZmJkMjQyODhkZDUiLCJwIjoiaiJ9

-`Jira Task CP-55: Optimize the layout for both mobile and desktop users as well as fix city search name ambiguous issue`
-Jira Link: https://cs3398-gorns-f24.atlassian.net/browse/CP-55?atlOrigin=eyJpIjoiYTQ5ODZmNGYzMzAzNGQ3Njg5NDdmNWI4YzVhNDY2OGIiLCJwIjoiaiJ9

### Reports

![Sprint1BurnupReport](images/SE-Sprint1-Jira-Report.png)

### Next Steps (for Sprint 2)

_Note: Specific roles are not delegated yet as of October 9, 2024_

**User Story 6:** Add Weather Forecast As a user, I would like to see a 5-day weather forecast so that I can plan ahead based on future weather conditions.

**User Story 7:** Add UV Index As a user, I would like the UV index so that I can make informed decisions about sun exposure and protect my skin from harmful ultraviolet radiation

**User Story 8:** Add Loading Indicators and Feedback As a user, I would like to see a loading spinner while data is being fetched so that I know the app is processing my request

**User Story 9:** Cache Weather Data As a user, I would like the app to cache previously fetched weather data so that I don’t have to wait for a new API request when searching for the same city multiple times

**User Story 10:** Improve Error Handling and User Experience As a user, I would like the app to provide clear and helpful error messages when something goes wrong so that I understand what happened and how to fix it

## Project Setup Instructions

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
   This command will start the frontend server, typically running on `localhost:3000`.
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
   python app.py
   ```

### Step 5: Access the Application

- **Access the Frontend**:
  Open your browser and visit the frontend at `http://localhost:3000`.

- **Check Backend APIs**:
  The backend APIs will be available at `http://localhost:5000`. The frontend should communicate with the backend via these APIs if everything is set up correctly.

By following these steps, you will have both the frontend and backend running and be able to develop and test the application effectively.
