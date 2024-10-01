from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

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