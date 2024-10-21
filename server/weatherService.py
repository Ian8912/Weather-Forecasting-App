import os
import requests
from dotenv import load_dotenv
from ForecastService import *
# Load environment variables
load_dotenv()

WEATHER_API_KEY = os.getenv('VITE_OPENWEATHER_API_KEY')
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct'
FORECAST_URL = 'https://api.openweathermap.org/data/2.5/onecall'
AIR_QUALITY_URL = 'http://api.openweathermap.org/data/2.5/air_pollution'

# Function to fetch weather data by coordinates
def fetch_weather_data(lat, lon):
    weather_url = f"{BASE_URL}?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
    try:
        response = requests.get(weather_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch weather data: " + str(e)}  # Return standardized error message
    
# Function to fetch geocoding data by city
def fetch_geo_data(city):
    geo_url = f"{GEO_URL}?q={city}&limit=5&appid={WEATHER_API_KEY}"
    try:
        response = requests.get(geo_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch city data: " + str(e)}

# Function to fetch forecast data, including UV Index
def fetch_forecast_data(lat, lon):
    forecast_url = f"{FORECAST_URL}?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}"
    try:
        res = requests.get(forecast_url, timeout=10)
        res.raise_for_status()
        data = res.json()

        # Debug: Print the entire forecast data to verify
        print(f"Full forecast data: {data}")

        # Extract the UV Index
        uv_index = data.get('current', {}).get('uvi', None)

        # Explicitly handle if the UV index is None or missing
        if uv_index is None:
            uv_index = "N/A (Nighttime or Data Unavailable)"

        # Debug: Print UV index to check if the condition is met
        print(f"UV Index (final): {uv_index}")

        return {'uv_index': uv_index, 'forecast_data': data}
    
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to find forecast for this city: " + str(e)}


def fetch_coordinates(city):
    try:
        url = f"{GEO_URL}?q={city}&limit=1&appid={WEATHER_API_KEY}"
        res = requests.get(url)
        res.raise_for_status()
        data = res.json()
   
        if data and len(data) > 0:
            return data[0]['lat'], data[0]['lon']
        else:
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching coordinates: {e}")
        return {"error": f"Failed to find forecast for this location: {e}"}

# Function to fetch air quality data by coordinates
def fetch_air_quality_data(lat, lon):
    air_quality_url = f"{AIR_QUALITY_URL}?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}"
    try:
        response = requests.get(air_quality_url, timeout=10)
        response.raise_for_status()
        data = response.json()
        aqi = data.get('list', [])[0]['main']['aqi'] if 'list' in data and len(data['list']) > 0 else None
        return {'air_quality_index': aqi}
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch air quality data: " + str(e)}
    
def fetch_5day_forecast(lat, lon):
    forecast_service = ForecastService(lat, lon)
    return  forecast_service.GetForecast()