from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import json
import os
import requests
from dotenv import load_dotenv  # Import load_dotenv from dotenv

# Load environment variables from .env file
load_dotenv()  # This loads the .env file

# Get the OpenWeather API key from the environment variable
API_KEY = os.getenv('OPENWEATHER_API_KEY')  # Fetch the API key from .env

# Define your base URL for the weather API
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

# Initialize Flask app
app = Flask(__name__, static_folder='client/dist', template_folder='client/dist')

# Enable CORS for all routes
CORS(app)

# Serve the React app (index.html) from the dist folder
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static assets like JS, CSS, images, etc.
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

# Weather route to fetch data from the OpenWeather API
@app.route('/weather/', methods=['GET'])
def weather():
    city = request.args.get('city', 'Austin')
    weather_url = f"{BASE_URL}?q={city}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(weather_url)
        response.raise_for_status()
        weather_data = response.json()

        temperature_celsius = round(weather_data['main']['temp'], 2)
        temperature_fahrenheit = round((temperature_celsius * 9/5) + 32, 2)  # Convert C to F

        data = {
            'city': weather_data['name'],
            'temperature_fahrenheit': temperature_fahrenheit,
            'temperature_celsius': temperature_celsius,
            'description': weather_data['weather'][0]['description'],
            'humidity': weather_data['main']['humidity'],
            'wind_speed': weather_data['wind']['speed']
        }
        return jsonify(data), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


@app.route('/weather/<coords>', methods=['GET'])
def weatherFromCoords(coords):
    #city = request.args.get('city', 'Austin')  # You can allow a dynamic city
    #weather_url = f"{BASE_URL}?q={city}&appid={API_KEY}&units=metric"
    
    print(coords)
    return  200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
