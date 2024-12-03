from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
from weatherService import *
from translationService import *
import os
from dotenv import load_dotenv
from notificationsBackend import notifications_bp
import requests
import openai

app = Flask(__name__, static_folder='../client/dist', template_folder='../client/dist')

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


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

    uv_index = uv_index_data.get('current_uv_index', 'N/A')
    max_uv_index = uv_index_data.get('max_uv_index', 'N/A')

    data = {
        'city': city_name,
        'state': state,
        'country': country,
        'temperature_fahrenheit': temperature_fahrenheit,
        'temperature_celsius': temperature_celsius,
        'min_temp_celsius': min_temp_celsius,
        'min_temp_fahrenheit': min_temp_fahrenheit,
        'max_temp_celsius': max_temp_celsius,
        'max_temp_fahrenheit': max_temp_fahrenheit,
        'description': weather_data['weather'][0]['description'],
        'humidity': weather_data['main']['humidity'],
        'wind_speed': weather_data['wind']['speed'],
        'uv_index': uv_index,
        'max_uv_index': max_uv_index,
        'air_quality': air_quality_data.get('air_quality_index', "N/A"),
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
    texts = data.get('texts')
    target_lang = data.get('target_lang')

    if not texts or not target_lang:
        return jsonify({'error': 'Invalid input'}), 400

    joined_text = "\n".join(texts)
    translations = fetch_translation(joined_text, target_lang)
    if isinstance(translations, dict) and 'error' in translations:
        return jsonify(translations), 500

    return jsonify({'translated_texts': translations}), 200


@app.route('/api/keys', methods=['GET'])
def get_keys():
    keys = get_api_keys()
    return jsonify(keys)


# Consolidated weather articles route
@app.route('/weather-articles', methods=['GET'])
def get_weather_articles():
    api_key = os.getenv('NEWS_API_KEY')
    query = "weather"
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        return jsonify(response.json()), 200
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error: {http_err}"}), response.status_code
    except Exception as err:
        return jsonify({"error": f"Error: {err}"}), 500


app.register_blueprint(notifications_bp)


@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():
    try:
        data = request.json
        user_input = data.get('user_input')
        weather_data = data.get('weather_data')

        if not user_input or not weather_data:
            return jsonify({'error': 'User input and weather data are required'}), 400

        # Construct the prompt with weather data
        prompt = f"""
        Based on the following weather data:
        City: {weather_data.get('city')}
        Temperature: {weather_data.get('temperature_fahrenheit')}°F ({weather_data.get('temperature_celsius')}°C)
        Humidity: {weather_data.get('humidity')}%
        Weather Condition: {weather_data.get('description')}
        Max Temperature: {weather_data.get('max_temp_fahrenheit')}°F ({weather_data.get('max_temp_celsius')}°C)
        Min Temperature: {weather_data.get('min_temp_fahrenheit')}°F ({weather_data.get('min_temp_celsius')}°C)
        UV Index: {weather_data.get('uv_index', 'N/A')}
        Air Quality Index: {weather_data.get('air_quality', 'N/A')}

        User query: {user_input}
        Provide tailored advice in 4 sentences or fewer.
        """

        # Set the OpenAI API key
        openai.api_key = os.getenv('OPENAI_API_KEY')
        if not openai.api_key:
            return jsonify({'error': 'OpenAI API key is not set'}), 500

        # Use the OpenAI API for chat completions
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use the correct model
            messages=[
                {"role": "system", "content": "You are a helpful assistant providing weather-related advice."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )

        # Extract and return the generated response
        generated_text = response['choices'][0]['message']['content'].strip()
        return jsonify({'response': generated_text}), 200

    except openai.OpenAIError as e:
        print(f"OpenAI API Error: {e}")
        return jsonify({'error': 'Failed to generate response from OpenAI.'}), 500
    except Exception as e:
        print(f"Error in /generate-prompt: {e}")
        return jsonify({'error': 'An error occurred while processing the request.'}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



