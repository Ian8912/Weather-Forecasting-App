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
GEO_URL = "http://api.openweathermap.org/geo/1.0/direct"

# Initialize Flask app
app = Flask(__name__, static_folder='client/dist', template_folder='client/dist')

# Enable CORS for all routes
CORS(app)
    
# Serve the React app (index.html) from the dist folder
@app.route('/root')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static assets like JS, CSS, images, etc.
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

# Weather route to fetch data from the OpenWeather API
@app.route('/weather/', methods=['GET'])
def weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    city = request.args.get('city', '').strip()

    # Case 1: If latitude and longitude are provided, use those for fetching weather data
    if lat and lon:
        print(f"Fetching weather data for coordinates: {lat}, {lon}")
        weather_url = f"{BASE_URL}?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
        try:
            response = requests.get(weather_url, timeout=10)
            response.raise_for_status()
            weather_data = response.json()

            # Extract city name and country from the weather API response
            city_name = weather_data['name']
            country = weather_data['sys']['country']  # Country code
            state = weather_data['sys'].get('state', 'N/A')  # Extract state if available

            # Prepare and return the response with temperature in both Celsius and Fahrenheit
            temperature_celsius = round(weather_data['main']['temp'], 2)
            temperature_fahrenheit = round((temperature_celsius * 9/5) + 32, 2)
            data = {
                'city': city_name,
                'state': state,
                'country': country,
                'temperature_fahrenheit': temperature_fahrenheit,
                'temperature_celsius': temperature_celsius,
                'description': weather_data['weather'][0]['description'],
                'humidity': weather_data['main']['humidity'],
                'wind_speed': weather_data['wind']['speed']
            }
            return jsonify(data), 200

        except requests.exceptions.RequestException as e:
            return jsonify({"error": str(e)}), 500

    # Case 2: Fallback to city name search if lat/lon not provided
    elif city:
        print(f"Fetching weather data for city: {city}")
        geo_url = f"{GEO_URL}?q={city}&limit=5&appid={API_KEY}"
        try:
            geo_response = requests.get(geo_url, timeout=10)
            geo_response.raise_for_status()
            geo_data = geo_response.json()

            # If no results found
            if len(geo_data) == 0:
                return jsonify({"error": "City not found"}), 404

            # If more than one city is found, return the list of possible matches
            if len(geo_data) > 1:
                cities = [{'name': g['name'], 'country': g['country'], 'state': g.get('state', ''), 'lat': g['lat'], 'lon': g['lon']} for g in geo_data]
                return jsonify({"message": "Multiple cities found, please select:", "cities": cities}), 200

            # Use the first city match if only one city is found
            city_data = geo_data[0]
            lat = city_data['lat']
            lon = city_data['lon']
            country = city_data['country']
            state = city_data['state', 'N/A']
            city_name = city_data['name']

            # Fetch weather data based on lat/lon from the city match
            weather_url = f"{BASE_URL}?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
            response = requests.get(weather_url, timeout=10)
            response.raise_for_status()
            weather_data = response.json()

            # Prepare and return the response with temperature in both Celsius and Fahrenheit
            temperature_celsius = round(weather_data['main']['temp'], 2)
            temperature_fahrenheit = round((temperature_celsius * 9/5) + 32, 2)
            data = {
                'city': city_name,
                'state': state,
                'country': country,
                'temperature_fahrenheit': temperature_fahrenheit,
                'temperature_celsius': temperature_celsius,
                'description': weather_data['weather'][0]['description'],
                'humidity': weather_data['main']['humidity'],
                'wind_speed': weather_data['wind']['speed']
            }

            return jsonify(data), 200

        except requests.exceptions.RequestException as e:
            return jsonify({"error": str(e)}), 500

    else:
        return jsonify({"error": "City or coordinates are required"}), 400

# New route to handle city suggestions
@app.route('/city-suggestions', methods=['GET'])
def city_suggestions():
    city = request.args.get('city', '').strip()
    
    if not city:
        return jsonify({"error": "City is required"}), 400
    
    # Geocoding API to fetch city suggestions
    geo_url = f"{GEO_URL}?q={city}&limit=5&appid={API_KEY}"

    try:
        geo_response = requests.get(geo_url, timeout=10)
        geo_response.raise_for_status()
        geo_data = geo_response.json()

        # Extract city suggestions (name, country, state, lat, lon)
        cities = [{'name': g['name'], 'country': g['country'], 'state': g.get('state', ''), 'lat': g['lat'], 'lon': g['lon']} for g in geo_data]
        
        return jsonify({"cities": cities}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


@app.route('/coords/<float:lat>/<float:long>/', methods=['GET'])
def weatherFromCoords(lat, long):
   
    res = requests.get(f'{BASE_URL}?lat={lat}&lon={long}&appid={API_KEY}')
    res_str = res.content.decode('utf-8')

    res = json.loads(res_str)
    print(json.dumps(res, indent=4))
    
    data = {
        'city': res.get('name'),
        'description' : res.get('weather')[0].get('description')
    }

    return jsonify(data, 200)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
