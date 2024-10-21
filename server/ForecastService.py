import openmeteo_requests

import requests_cache
import pandas as pd
from retry_requests import retry
import math
class ForecastService():
    
    def __init__(self, latitude: float, longitude: float) -> None:

        url = "https://api.open-meteo.com/v1/forecast"

        cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
        retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
        openmeteo = openmeteo_requests.Client(session = retry_session)

        params = {
            "latitude": latitude,
            "longitude": longitude,
            "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "uv_index_clear_sky_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant", "shortwave_radiation_sum", "et0_fao_evapotranspiration"],
            "timezone": "auto",
            "models": "gfs_seamless"
        }
        responses = openmeteo.weather_api(url, params=params)

        #This is able to get us current, daily, and hourly data
        self.WeatherData = responses[0]

        self.daily = self.WeatherData.Daily()

    def calculateFahrenheit(self, celsiusValue: float) -> int:
        return int((celsiusValue * (9/5)) + 32)
    
    def getDates(self) -> list:
        daily_data = {"date": pd.date_range(
	        start = pd.to_datetime(self.daily.Time(), unit = "s", utc = True),
	        end = pd.to_datetime(self.daily.TimeEnd(), unit = "s", utc = True),
	        freq = pd.Timedelta(seconds = self.daily.Interval()),
	        inclusive = "left"
        )}
        return [date.strftime('%m-%d-%m') for date in daily_data['date']]

    def getMinTemperature(self) -> list[list[int, int]]:
        min_daily_temperatures = self.daily.Variables(2).ValuesAsNumpy()

        return [[int(temp), self.calculateFahrenheit(temp)] for temp in min_daily_temperatures]

    def getMaxTemperature(self) -> list:
        max_daily_tempatures = self.daily.Variables(1).ValuesAsNumpy()

        return [[int(temp), self.calculateFahrenheit(temp)] for temp in max_daily_tempatures]

    def getCloudCover(self) -> list:
        pass

    def getWindSpeed(self) -> list:
        pass

    def getWindDescription(self) -> list:
        pass
    
    def getAverageTemperature_Helper(self) -> list:
        min_temps = self.getMinTemperature()  # Call the method to get the list
        max_temps = self.getMaxTemperature()
        return [[int((_min[0] + _max[0])/2)] for _min, _max in zip(min_temps, max_temps)]

    def precipiationDescription_Helper(self, precipitation, temperature) -> int:
        if precipitation == 0:
            return f"No {'snow' if temperature <= 0 else 'rain'}"
        elif precipitation < 2.5:
            return f"Light {'snow' if temperature <= 0 else 'rain'}"
        elif precipitation < 7.6:
            return f"Moderate {'snow' if temperature <= 0 else 'rain'}"
        else:
            return f"Heavy {'snow' if temperature <= 0 else 'rain'}"

    def getPrecitpitationDescription(self) -> list:
        descriptions = []
        daily_precipitation_values = self.daily.Variables(11).ValuesAsNumpy()
        avg_temps = self.getAverageTemperature_Helper()
        for precipitate, temperature in zip(daily_precipitation_values, avg_temps):
            print(f"{precipitate} {temperature}")
            descriptions.append(self.precipiationDescription_Helper(precipitate, temperature[0]))

        return descriptions

        

    def GetForecast(self) -> dict:
        return {
            "data": {
                "date" : self.getDates(),
                "minTemp" : self.getMinTemperature(),
                "maxTemp" : self.getMaxTemperature(),
                "cloudCover" : self.getCloudCover(),
                "windSpeed" : self.getWindSpeed(),
                "windDescription" : self.getWindDescription(),
                "precipitationDescription" : self.getPrecitpitationDescription()
            }
        }
        

obj = ForecastService(30.2672, -97.7431)
print(f"SERVICE PRINTING MIN TEMP: {obj.getMinTemperature()}")
print(f"SERVICE PRINTING MAX TEMP: {obj.getMaxTemperature()}")
print(obj.getAverageTemperature_Helper())
print(f"SERVICE PRINTING DATES: {obj.getDates()}")
print(f"SERVICE PRINTING Descriptions: {obj.getPrecitpitationDescription()}")



# # Setup the Open-Meteo API client with cache and retry on error
# cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
# retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
# openmeteo = openmeteo_requests.Client(session = retry_session)

# # Make sure all required weather variables are listed here
# # The order of variables in hourly or daily is important to assign them correctly below
# url = "https://api.open-meteo.com/v1/forecast"
# params = {
# 	"latitude": 30.2672,
# 	"longitude": -97.7431,
# 	"current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "pressure_msl", "surface_pressure"],
# 	"hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "visibility", "evapotranspiration", "et0_fao_evapotranspiration", "vapour_pressure_deficit", "wind_speed_10m", "wind_speed_80m", "wind_direction_10m", "wind_direction_80m", "wind_gusts_10m", "temperature_80m", "surface_temperature", "soil_temperature_0_to_10cm", "soil_temperature_10_to_40cm", "soil_temperature_40_to_100cm", "soil_temperature_100_to_200cm", "soil_moisture_0_to_10cm", "soil_moisture_10_to_40cm", "soil_moisture_40_to_100cm", "soil_moisture_100_to_200cm", "uv_index", "uv_index_clear_sky", "is_day", "sunshine_duration", "total_column_integrated_water_vapour", "cape", "lifted_index", "convective_inhibition", "freezing_level_height", "boundary_layer_height", "mass_density_8m", "thunderstorm_probability", "rain_probability", "snowfall_probability", "freezing_rain_probability", "ice_pellets_probability"],
# 	"daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "uv_index_clear_sky_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant", "shortwave_radiation_sum", "et0_fao_evapotranspiration"],
# 	"timezone": "auto",
# 	"models": "gfs_seamless"
# }
# responses = openmeteo.weather_api(url, params=params)

# # Process first location. Add a for-loop for multiple locations or weather models
# response = responses[0]
# print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
# print(f"Elevation {response.Elevation()} m asl")
# print(f"Timezone {response.Timezone()} {response.TimezoneAbbreviation()}")
# print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")



# Current values. The order of variables needs to be the same as requested.
# current = response.Current()
# current_temperature_2m = current.Variables(0).Value()
# current_relative_humidity_2m = current.Variables(1).Value()
# current_apparent_temperature = current.Variables(2).Value()
# current_is_day = current.Variables(3).Value()
# current_precipitation = current.Variables(4).Value()
# current_rain = current.Variables(5).Value()
# current_showers = current.Variables(6).Value()
# current_snowfall = current.Variables(7).Value()
# current_weather_code = current.Variables(8).Value()
# current_cloud_cover = current.Variables(9).Value()
# current_pressure_msl = current.Variables(10).Value()
# current_surface_pressure = current.Variables(11).Value()

# print(f"Current time {current.Time()}")
# print(f"Current temperature_2m {current_temperature_2m}")
# print(f"Current relative_humidity_2m {current_relative_humidity_2m}")
# print(f"Current apparent_temperature {current_apparent_temperature}")
# print(f"Current is_day {current_is_day}")
# print(f"Current precipitation {current_precipitation}")
# print(f"Current rain {current_rain}")
# print(f"Current showers {current_showers}")
# print(f"Current snowfall {current_snowfall}")
# print(f"Current weather_code {current_weather_code}")
# print(f"Current cloud_cover {current_cloud_cover}")
# print(f"Current pressure_msl {current_pressure_msl}")
# print(f"Current surface_pressure {current_surface_pressure}")

# # Process hourly data. The order of variables needs to be the same as requested.
# hourly = response.Hourly()
# hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
# hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()
# hourly_dew_point_2m = hourly.Variables(2).ValuesAsNumpy()
# hourly_apparent_temperature = hourly.Variables(3).ValuesAsNumpy()
# hourly_precipitation_probability = hourly.Variables(4).ValuesAsNumpy()
# hourly_precipitation = hourly.Variables(5).ValuesAsNumpy()
# hourly_rain = hourly.Variables(6).ValuesAsNumpy()
# hourly_showers = hourly.Variables(7).ValuesAsNumpy()
# hourly_snowfall = hourly.Variables(8).ValuesAsNumpy()
# hourly_snow_depth = hourly.Variables(9).ValuesAsNumpy()
# hourly_weather_code = hourly.Variables(10).ValuesAsNumpy()
# hourly_pressure_msl = hourly.Variables(11).ValuesAsNumpy()
# hourly_surface_pressure = hourly.Variables(12).ValuesAsNumpy()
# hourly_cloud_cover = hourly.Variables(13).ValuesAsNumpy()
# hourly_cloud_cover_low = hourly.Variables(14).ValuesAsNumpy()
# hourly_cloud_cover_mid = hourly.Variables(15).ValuesAsNumpy()
# hourly_cloud_cover_high = hourly.Variables(16).ValuesAsNumpy()
# hourly_visibility = hourly.Variables(17).ValuesAsNumpy()
# hourly_evapotranspiration = hourly.Variables(18).ValuesAsNumpy()
# hourly_et0_fao_evapotranspiration = hourly.Variables(19).ValuesAsNumpy()
# hourly_vapour_pressure_deficit = hourly.Variables(20).ValuesAsNumpy()
# hourly_wind_speed_10m = hourly.Variables(21).ValuesAsNumpy()
# hourly_wind_speed_80m = hourly.Variables(22).ValuesAsNumpy()
# hourly_wind_direction_10m = hourly.Variables(23).ValuesAsNumpy()
# hourly_wind_direction_80m = hourly.Variables(24).ValuesAsNumpy()
# hourly_wind_gusts_10m = hourly.Variables(25).ValuesAsNumpy()
# hourly_temperature_80m = hourly.Variables(26).ValuesAsNumpy()
# hourly_surface_temperature = hourly.Variables(27).ValuesAsNumpy()
# hourly_soil_temperature_0_to_10cm = hourly.Variables(28).ValuesAsNumpy()
# hourly_soil_temperature_10_to_40cm = hourly.Variables(29).ValuesAsNumpy()
# hourly_soil_temperature_40_to_100cm = hourly.Variables(30).ValuesAsNumpy()
# hourly_soil_temperature_100_to_200cm = hourly.Variables(31).ValuesAsNumpy()
# hourly_soil_moisture_0_to_10cm = hourly.Variables(32).ValuesAsNumpy()
# hourly_soil_moisture_10_to_40cm = hourly.Variables(33).ValuesAsNumpy()
# hourly_soil_moisture_40_to_100cm = hourly.Variables(34).ValuesAsNumpy()
# hourly_soil_moisture_100_to_200cm = hourly.Variables(35).ValuesAsNumpy()
# hourly_uv_index = hourly.Variables(36).ValuesAsNumpy()
# hourly_uv_index_clear_sky = hourly.Variables(37).ValuesAsNumpy()
# hourly_is_day = hourly.Variables(38).ValuesAsNumpy()
# hourly_sunshine_duration = hourly.Variables(39).ValuesAsNumpy()
# hourly_total_column_integrated_water_vapour = hourly.Variables(40).ValuesAsNumpy()
# hourly_cape = hourly.Variables(41).ValuesAsNumpy()
# hourly_lifted_index = hourly.Variables(42).ValuesAsNumpy()
# hourly_convective_inhibition = hourly.Variables(43).ValuesAsNumpy()
# hourly_freezing_level_height = hourly.Variables(44).ValuesAsNumpy()
# hourly_boundary_layer_height = hourly.Variables(45).ValuesAsNumpy()
# hourly_mass_density_8m = hourly.Variables(46).ValuesAsNumpy()
# hourly_thunderstorm_probability = hourly.Variables(47).ValuesAsNumpy()
# hourly_rain_probability = hourly.Variables(48).ValuesAsNumpy()
# hourly_snowfall_probability = hourly.Variables(49).ValuesAsNumpy()
# hourly_freezing_rain_probability = hourly.Variables(50).ValuesAsNumpy()
# hourly_ice_pellets_probability = hourly.Variables(51).ValuesAsNumpy()

# hourly_data = {"date": pd.date_range(
# 	start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
# 	end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
# 	freq = pd.Timedelta(seconds = hourly.Interval()),
# 	inclusive = "left"
# )}
# hourly_data["temperature_2m"] = hourly_temperature_2m
# hourly_data["relative_humidity_2m"] = hourly_relative_humidity_2m
# hourly_data["dew_point_2m"] = hourly_dew_point_2m
# hourly_data["apparent_temperature"] = hourly_apparent_temperature
# hourly_data["precipitation_probability"] = hourly_precipitation_probability
# hourly_data["precipitation"] = hourly_precipitation
# hourly_data["rain"] = hourly_rain
# hourly_data["showers"] = hourly_showers
# hourly_data["snowfall"] = hourly_snowfall
# hourly_data["snow_depth"] = hourly_snow_depth
# hourly_data["weather_code"] = hourly_weather_code
# hourly_data["pressure_msl"] = hourly_pressure_msl
# hourly_data["surface_pressure"] = hourly_surface_pressure
# hourly_data["cloud_cover"] = hourly_cloud_cover
# hourly_data["cloud_cover_low"] = hourly_cloud_cover_low
# hourly_data["cloud_cover_mid"] = hourly_cloud_cover_mid
# hourly_data["cloud_cover_high"] = hourly_cloud_cover_high
# hourly_data["visibility"] = hourly_visibility
# hourly_data["evapotranspiration"] = hourly_evapotranspiration
# hourly_data["et0_fao_evapotranspiration"] = hourly_et0_fao_evapotranspiration
# hourly_data["vapour_pressure_deficit"] = hourly_vapour_pressure_deficit
# hourly_data["wind_speed_10m"] = hourly_wind_speed_10m
# hourly_data["wind_speed_80m"] = hourly_wind_speed_80m
# hourly_data["wind_direction_10m"] = hourly_wind_direction_10m
# hourly_data["wind_direction_80m"] = hourly_wind_direction_80m
# hourly_data["wind_gusts_10m"] = hourly_wind_gusts_10m
# hourly_data["temperature_80m"] = hourly_temperature_80m
# hourly_data["surface_temperature"] = hourly_surface_temperature
# hourly_data["soil_temperature_0_to_10cm"] = hourly_soil_temperature_0_to_10cm
# hourly_data["soil_temperature_10_to_40cm"] = hourly_soil_temperature_10_to_40cm
# hourly_data["soil_temperature_40_to_100cm"] = hourly_soil_temperature_40_to_100cm
# hourly_data["soil_temperature_100_to_200cm"] = hourly_soil_temperature_100_to_200cm
# hourly_data["soil_moisture_0_to_10cm"] = hourly_soil_moisture_0_to_10cm
# hourly_data["soil_moisture_10_to_40cm"] = hourly_soil_moisture_10_to_40cm
# hourly_data["soil_moisture_40_to_100cm"] = hourly_soil_moisture_40_to_100cm
# hourly_data["soil_moisture_100_to_200cm"] = hourly_soil_moisture_100_to_200cm
# hourly_data["uv_index"] = hourly_uv_index
# hourly_data["uv_index_clear_sky"] = hourly_uv_index_clear_sky
# hourly_data["is_day"] = hourly_is_day
# hourly_data["sunshine_duration"] = hourly_sunshine_duration
# hourly_data["total_column_integrated_water_vapour"] = hourly_total_column_integrated_water_vapour
# hourly_data["cape"] = hourly_cape
# hourly_data["lifted_index"] = hourly_lifted_index
# hourly_data["convective_inhibition"] = hourly_convective_inhibition
# hourly_data["freezing_level_height"] = hourly_freezing_level_height
# hourly_data["boundary_layer_height"] = hourly_boundary_layer_height
# hourly_data["mass_density_8m"] = hourly_mass_density_8m
# hourly_data["thunderstorm_probability"] = hourly_thunderstorm_probability
# hourly_data["rain_probability"] = hourly_rain_probability
# hourly_data["snowfall_probability"] = hourly_snowfall_probability
# hourly_data["freezing_rain_probability"] = hourly_freezing_rain_probability
# hourly_data["ice_pellets_probability"] = hourly_ice_pellets_probability

# hourly_dataframe = pd.DataFrame(data = hourly_data)
# print(hourly_dataframe)

# Process daily data. The order of variables needs to be the same as requested.
# daily = response.Daily()
# daily_weather_code = daily.Variables(0).ValuesAsNumpy()
# daily_temperature_2m_max = daily.Variables(1).ValuesAsNumpy()
# daily_temperature_2m_min = daily.Variables(2).ValuesAsNumpy()
# daily_apparent_temperature_max = daily.Variables(3).ValuesAsNumpy()
# daily_apparent_temperature_min = daily.Variables(4).ValuesAsNumpy()
# daily_sunrise = daily.Variables(5).ValuesAsNumpy()
# daily_sunset = daily.Variables(6).ValuesAsNumpy()
# daily_daylight_duration = daily.Variables(7).ValuesAsNumpy()
# daily_sunshine_duration = daily.Variables(8).ValuesAsNumpy()
# daily_uv_index_max = daily.Variables(9).ValuesAsNumpy()
# daily_uv_index_clear_sky_max = daily.Variables(10).ValuesAsNumpy()
# daily_precipitation_sum = daily.Variables(11).ValuesAsNumpy()
# daily_rain_sum = daily.Variables(12).ValuesAsNumpy()
# daily_showers_sum = daily.Variables(13).ValuesAsNumpy()
# daily_snowfall_sum = daily.Variables(14).ValuesAsNumpy()
# daily_precipitation_hours = daily.Variables(15).ValuesAsNumpy()
# daily_precipitation_probability_max = daily.Variables(16).ValuesAsNumpy()
# daily_wind_speed_10m_max = daily.Variables(17).ValuesAsNumpy()
# daily_wind_gusts_10m_max = daily.Variables(18).ValuesAsNumpy()
# daily_wind_direction_10m_dominant = daily.Variables(19).ValuesAsNumpy()
# daily_shortwave_radiation_sum = daily.Variables(20).ValuesAsNumpy()
# daily_et0_fao_evapotranspiration = daily.Variables(21).ValuesAsNumpy()

# daily_data = {"date": pd.date_range(
# 	start = pd.to_datetime(daily.Time(), unit = "s", utc = True),
# 	end = pd.to_datetime(daily.TimeEnd(), unit = "s", utc = True),
# 	freq = pd.Timedelta(seconds = daily.Interval()),
# 	inclusive = "left"
# )}



# for date, mintemp, maxtemp in zip(daily_data['date'], daily_temperature_2m_min, daily_temperature_2m_max ):
#     print(f"Date: {date}, Low: {mintemp}°C, High: {maxtemp}°C")

# daily_data["weather_code"] = daily_weather_code
# daily_data["temperature_2m_max"] = daily_temperature_2m_max
# daily_data["temperature_2m_min"] = daily_temperature_2m_min
# daily_data["apparent_temperature_max"] = daily_apparent_temperature_max
# daily_data["apparent_temperature_min"] = daily_apparent_temperature_min
# daily_data["sunrise"] = daily_sunrise
# daily_data["sunset"] = daily_sunset
# daily_data["daylight_duration"] = daily_daylight_duration
# daily_data["sunshine_duration"] = daily_sunshine_duration
# daily_data["uv_index_max"] = daily_uv_index_max
# daily_data["uv_index_clear_sky_max"] = daily_uv_index_clear_sky_max
# daily_data["precipitation_sum"] = daily_precipitation_sum
# daily_data["rain_sum"] = daily_rain_sum
# daily_data["showers_sum"] = daily_showers_sum
# daily_data["snowfall_sum"] = daily_snowfall_sum
# daily_data["precipitation_hours"] = daily_precipitation_hours
# daily_data["precipitation_probability_max"] = daily_precipitation_probability_max
# daily_data["wind_speed_10m_max"] = daily_wind_speed_10m_max
# daily_data["wind_gusts_10m_max"] = daily_wind_gusts_10m_max
# daily_data["wind_direction_10m_dominant"] = daily_wind_direction_10m_dominant
# daily_data["shortwave_radiation_sum"] = daily_shortwave_radiation_sum
# daily_data["et0_fao_evapotranspiration"] = daily_et0_fao_evapotranspiration

# # daily_dataframe = pd.DataFrame(data = daily_data)
# # print(daily_dataframe)