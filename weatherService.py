import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct'
FORECAST_URL = 'https://api.openweathermap.org/data/3.0/onecall'

# Function to fetch weather data by coordinates
def fetch_weather_data(lat, lon):
    weather_url = f"{BASE_URL}?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    try:
        response = requests.get(weather_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch weather data: " + str(e)}
    
# Function to fetch geocoding data by city
def fetch_geo_data(city):
    geo_url = f"{GEO_URL}?q={city}&limit=5&appid={API_KEY}"
    try:
        response = requests.get(geo_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch city data: " + str(e)}
# Fetehes forecast data
def fetch_forecast_data(lat, lon):
    forecast_url = f"{FORECAST_URL}?lat={lat}&lon={lon}&appid={API_KEY}"
    try:
        res = requests.get(forecast_url, timeout=10)
        res.raise_for_status()
        return res.json()
    except requests.exceptions.RequestException as e:
        print("ERROR")
        return {"error": "Failed to find forecast for this city" + str(e)}
    