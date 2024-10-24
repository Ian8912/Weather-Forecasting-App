import React from 'react'
import WeatherIconService from '../WeatherIconService';

export const ForcastCard = ({ 
  icon,
  date,
  maxC,
  maxF,
  minC,
  minF,
  precipitationDescription,
  winddescription,
  windspeed
 }) => {

   // Function to format the date
   const formatDate = (dateStr) => {
    // Split the date string into components (MM-DD-YY)
    const parts = dateStr.split('-');
    
    if (parts.length !== 3) return "Invalid date format";
    
    const monthMap = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    };

    const month = parts[0];
    const day = parts[1];
    const year = parts[2];

    // Add suffix to the day (1st, 2nd, 3rd, etc.)
    let daySuffix = 'th';
    if (day.endsWith('1') && !day.endsWith('11')) daySuffix = 'st';
    else if (day.endsWith('2') && !day.endsWith('12')) daySuffix = 'nd';
    else if (day.endsWith('3') && !day.endsWith('13')) daySuffix = 'rd';

    const formattedDay = `${parseInt(day)}${daySuffix}`;
    const monthName = monthMap[month] || 'Invalid Month';
    const formattedDate = `${monthName} ${formattedDay}, 20${year}`;
    
    return formattedDate;
  };

  return (
    <div className="weather-card">
        <h3 className="text-xl font-bold">{formatDate(date)}</h3>
        <p className="text-lg">High: {maxF}°F / {maxC}°C</p>
        <p className="text-lg">Low: {minF}°F / {minC}°C</p>
        <p className="text-lg">Wind Speed: {windspeed} m/s</p>
        <p className="text-lg">Wind Description: {winddescription}</p>
        <p className="text-lg">Precipitation: {precipitationDescription}</p>
        {console.log(icon)}
        <img src={icon.precipitateIcon} alt='Weather Icon'/>
      </div>
  )
}
