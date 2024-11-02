import os
import requests
from dotenv import load_dotenv
from ForecastService import *

# Load environment variables
load_dotenv()

WEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
MAP_API_KEY = os.getenv('MAPBOX_API_KEY')
OPENUV_API_KEY = os.getenv('OPENUV_API_KEY')

BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct'
FORECAST_URL = 'https://api.openweathermap.org/data/3.0/onecall'
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


# Function to fetch forecast data
def fetch_forecast_data(lat, lon):
    forecast_url = f"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}"
    try:
        response = requests.get(forecast_url, timeout=10)
        response.raise_for_status()
        data = response.json()

        #return {'forecast_data': data}
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch forecast data: " + str(e)}


# Function to fetch UV index data using OpenUV API
def fetch_uv_index_openuv(lat, lon):
    # Construct the base URL for the OpenUV API endpoint
    uv_url = f"https://api.openuv.io/api/v1/uv?lat={lat}&lng={lon}"

    headers = {
        'x-access-token': OPENUV_API_KEY
    }

    try:
        response = requests.get(uv_url, headers=headers, timeout=10)
        response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)
        data = response.json()

        # Extract relevant UV data
        uv_index = data['result'].get('uv', "N/A")
        uv_max = data['result'].get('uv_max', "N/A")

        return {
            'current_uv_index': uv_index,
            'max_uv_index': uv_max,
            'uv_data': data['result']  # Return the full result for additional use
        }

    except requests.exceptions.RequestException as e:
        print(f"Error fetching UV data: {e}")
        return {
            'current_uv_index': "N/A",
            'error': f"Error fetching UV data: {e}"
        }
    

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
    

# Function to get the API keys
def get_api_keys():
    return {
        'WEATHER_API_KEY': WEATHER_API_KEY,
        'MAP_API_KEY': MAP_API_KEY
    }
    
