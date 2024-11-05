import React from "react";
import OpenWeatherIcon from "./components/OpenWeatherIcon";

class WeatherIconService {

    constructor(){}

    OpenMeteoPrecipitateIconMapping = {
        "No rain": "01n",
        "Light rain": "10n",
        "Moderate rain": "10n",   
        "Heavy rain": "10n",
        "Light snow": "13n",                       
        "Moderate snow": "13n", 
        "Heavy snow": "13n",                       
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
        const precipitateIconID = this.OpenMeteoPrecipitateIconMapping[precipitateDescription] || "default_precipitate.png";
        const windIcon = this.OpenMeteoWindIconMapping[windDescription] || "default_wind.png";

        return {
            precipitateIcon: `https://openweathermap.org/img/wn/${precipitateIconID}@2x.png`
        };
        
    }

    OpenWeatherIcons(OpenWeatherID) {
        try {
            const iconUrl = `https://openweathermap.org/img/wn/${OpenWeatherID}@2x.png`
            const res = fetch(iconUrl)
            if (!res.ok)
                throw new Error(`Image not found for ID: ${OpenWeatherID}`)

            return iconUrl
        } catch (error) {
            console.log(error);
        }

    }


}

export default WeatherIconService;