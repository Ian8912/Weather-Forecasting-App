from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
from weatherService import *
from translationService import *
from openai import OpenAI
import os
from dotenv import load_dotenv

app = Flask(__name__, static_folder='../client/dist', template_folder='../client/dist')

CORS(app, resources={r"/*": {"origins": "*"}})

load_dotenv()


@app.route('/weather', methods=['GET'])
def weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    city = request.args.get('city', '').strip()

    if lat and lon:
        # Fetch weather data by coordinates
        weather_data = fetch_weather_data(lat, lon)
        if 'error' in weather_data:
            return jsonify(weather_data), 500

        # Fetch additional data (UV index and air quality)
        forecast_data = fetch_forecast_data(lat, lon)
        air_quality_data = fetch_air_quality_data(lat, lon)
        uv_index_data = fetch_uv_index_openuv(lat, lon)

        # Print to verify the data source
        print("Forecast Data:", forecast_data)
    
        """ REDUNDANT CODE """
    elif city:
        print("APP: ========= City Search")
        # Fetch geolocation data by city name
        geo_data = fetch_geo_data(city)
        if 'error' in geo_data:
            return jsonify(geo_data), 500
        if len(geo_data) == 0:
            return jsonify({"error": "City not found"}), 404
        elif len(geo_data) > 1:
            cities = [{'name': g['name'], 'country': g['country'], 'state': g.get('state', ''), 'lat': g['lat'], 'lon': g['lon']} for g in geo_data]
            return jsonify({"message": "Multiple cities found, please select:", "cities": cities}), 200
        
        city_data = geo_data[0]
        lat = city_data['lat']
        lon = city_data['lon']
        weather_data = fetch_weather_data(lat, lon)
        if 'error' in weather_data:
            return jsonify(weather_data), 500
        
        # Fetch additional data (UV index and air quality)
        forecast_data = fetch_forecast_data(lat, lon)
        air_quality_data = fetch_air_quality_data(lat, lon)
        uv_index_data = fetch_uv_index_openuv(lat, lon)

        #print("Forecast Data:", forecast_data)
    else:
        return jsonify({"error": "City or coordinates are required"}), 400
    
    # Prepare and return the response
    city_name = weather_data.get('name', 'Unknown')
    country = weather_data['sys'].get('country', 'Unknown')
    state = weather_data['sys'].get('state', 'N/A')
    temperature_celsius = round(weather_data['main']['temp'], 2)
    temperature_fahrenheit = round((temperature_celsius * 9/5) + 32, 2)
    OpenWeatherIconID = weather_data['weather'][0]['icon']
    min_temp_celsius = round(weather_data["main"]["temp_min"])
    min_temp_fahrenheit = round((min_temp_celsius * 9/5) + 32, 2)
    max_temp_celsius = round(weather_data["main"]["temp_max"])
    max_temp_fahrenheit = round((max_temp_celsius * 9/5) + 32, 2)

    # Extract the UV indices or set a default value
    uv_index = uv_index_data.get('current_uv_index', 'N/A')
    max_uv_index = uv_index_data.get('max_uv_index', 'N/A')


    data = {
        'city': city_name,
        'state': state,
        'country': country,
        'temperature_fahrenheit': temperature_fahrenheit,
        'temperature_celsius': temperature_celsius,
        'min_temp_celsius' : min_temp_celsius,
        'min_temp_fahrenheit': min_temp_fahrenheit,
        'max_temp_celsius': max_temp_celsius,
        'max_temp_fahrenheit': max_temp_fahrenheit,
        'description': weather_data['weather'][0]['description'],
        'humidity': weather_data['main']['humidity'],
        'wind_speed': weather_data['wind']['speed'],
        'uv_index': uv_index,
        'max_uv_index': max_uv_index,
        'air_quality': air_quality_data.get('air_quality_index', "N/A"),  # Handle missing air quality
        'openweathericonid': OpenWeatherIconID
    }
    return jsonify(data), 200


@app.route('/city-suggestions', methods=['GET'])
def city_suggestions():
    city = request.args.get('city', '').strip()
    if not city:
        return jsonify({"error": "City is required"}), 400
    
    geo_data = fetch_geo_data(city)
    if 'error' in geo_data:
        return jsonify(geo_data), 500

    # Extract city suggestions
    cities = [{'name': g['name'], 'country': g['country'], 'state': g.get('state', ''), 'lat': g['lat'], 'lon': g['lon']} for g in geo_data]
    return jsonify({"cities": cities}), 200


@app.route('/coords/<float:lat>/<float:long>/', methods=['GET'])
def weatherFromCoords(lat, long):
    weather_data = fetch_weather_data(lat, long)
    if 'error' in weather_data:
        return jsonify(weather_data), 500

    data = {
        'city': weather_data.get('name'),
        'description': weather_data['weather'][0].get('description')
    }
    return jsonify(data), 200


@app.route('/forecast', methods=['GET'])
def forecast():
    city = request.args.get("city", '').strip()
    if not city:
        return jsonify({"error": "City Cannot Be Found!"}), 400
    lat, lon = fetch_coordinates(city)
    forecast_servicer = ForecastService(lat, lon)
    data = forecast_servicer.GetForecast()
    if not data:
        return jsonify({"error": "Cannot find forecast for this city!"}), 400
    return jsonify(data), 200


@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    texts = data.get('texts')  # Expecting an array of texts
    target_lang = data.get('target_lang')

    if not texts or not target_lang:
        return jsonify({'error': 'Invalid input'}), 400

    # Join all texts with line breaks for batch translation
    joined_text = "\n".join(texts)

    return fetch_translation(joined_text, target_lang)


# Endpoint to send API keys to the front end securely
@app.route('/api/keys', methods=['GET'])
def get_keys():
    keys = get_api_keys()  # Call the function to get API keys
    return jsonify(keys)


# Initialize the OpenAI client
client = OpenAI(
    api_key = os.environ.get("OPENAI_API_KEY")  # Load API key from environment variables
)

@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():
    try:
        # Get input from the frontend
        data = request.json
        user_input = data.get('user_input', '')

        # Generate response using OpenAI client
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_input,
                }
            ],
            model="gpt-3.5-turbo",  # Update model if necessary
            max_tokens=100 # Limit the response to 100 tokens
        )

        response_content = chat_completion.choices[0].message.content.strip()

        # Extract and return the assistant's response
        return jsonify({'response': response_content})
    except Exception as e:
        # Log and return the error
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)