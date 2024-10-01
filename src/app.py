from flask import Flask, jsonify
from flask_cors import CORS
import json
import os
import requests
from dotenv import load_dotenv

app = Flask(__name__)

CORS(app)

load_dotenv()
API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

# weather route with placeholder data, modifiy later to fetch API data
@app.route('/weather', methods=['GET'])
def weather():
    placeholder_data = {
        "location": "City, Country",
        "temperature_C": "20°C",
        "temperature_F": "68°F",
        "condition": "Sunny",
        "forecast": "Clear skies for the next few days"
    }
    return jsonify(placeholder_data)


if __name__ == '__main__':
    app.run(debug=True, port=5000)