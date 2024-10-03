from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import requests
from dotenv import load_dotenv

# Serving static files from the dist folder
app = Flask(__name__, static_folder='client/dist', template_folder='client/dist')

CORS(app)

load_dotenv()
API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

# Serve the React app (index.html) from the dist folder
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve any static assets like JS, CSS, images, etc.
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

# weather route with placeholder data, modifiy later to fetch API data
@app.route('/weather', methods=['GET'])
def weather():

    city = request.args.get('city', 'Austin')
    weather_url = f"{BASE_URL}?q={city}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(weather_url)
        response.raise_for_status()

        weather_data = response.json()
        data = {
            'city': weather_data['name'],
            'temperature': weather_data['main']['temp'],
            'description': weather_data['weather'][0]['description'],
            'humidity': weather_data['main']['humidity'],
            'wind_speed': weather_data['wind']['speed']
        }
        return jsonify(data), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)