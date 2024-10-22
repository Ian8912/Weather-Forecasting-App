from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
from weatherService import *
app = Flask(__name__, static_folder='../client/dist', template_folder='../client/dist')

CORS(app)

@app.route('/weather/', methods=['GET'])
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
    elif city:
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
    else:
        return jsonify({"error": "City or coordinates are required"}), 400

    # Handle missing UV index by setting fallback to "N/A"
    uv_index = forecast_data.get('uv_index', "N/A")
    
    # Prepare and return the response
    city_name = weather_data.get('name', 'Unknown')
    country = weather_data['sys'].get('country', 'Unknown')
    state = weather_data['sys'].get('state', 'N/A')
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
        'wind_speed': weather_data['wind']['speed'],
        'uv_index': uv_index,
        'air_quality': air_quality_data.get('air_quality_index', "N/A")  # Handle missing air quality
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
