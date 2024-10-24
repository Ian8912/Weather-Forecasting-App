class WeatherIconService {

    constructor(){}

    OpenMeteoPrecipitateIconMapping = {
        "No rain": "no_rain.png",
        "Light rain": "light_rain.png",
        "Moderate rain": "moderate_rain.png",
        "Heavy rain": "heavy_rain.png",
        "Light snow": "light_snow.png",
        "Moderate snow": "moderate_snow.png",
        "Heavy snow": "heavy_snow.png",
        // Add more mappings as needed
    };

    OpenMeteoWindIconMapping = {
        "Calm": "calm.png",
        "Light breeze": "light_breeze.png",
        "Gentle breeze": "gentle_breeze.png",
        "Moderate breeze": "moderate_breeze.png",
        "Strong breeze": "strong_breeze.png",
        // Add more mappings as needed
    };

    OpenMeteoForecastingIcons(precipitateDescription, windDescription) {
        const precipitateIcon = this.OpenMeteoPrecipitateIconMapping[precipitateDescription] || "default_precipitate.png";
        const windIcon = this.OpenMeteoWindIconMapping[windDescription] || "default_wind.png";

        return {
            precipitateIcon: `/images/static/${precipitateIcon}`,
            windIcon: `/images/static/${windIcon}`
        };
        
    }

    OpenWeatherIcons(OpenWeatherDescription) {

    }


}

export default WeatherIconService;