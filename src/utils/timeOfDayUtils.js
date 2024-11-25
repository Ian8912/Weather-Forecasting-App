export function getTimeOfDay(currentTime, sunriseTime, sunsetTime) {
    const now = new Date(currentTime).getTime();
    const sunrise = new Date(sunriseTime).getTime();
    const sunset = new Date(sunsetTime).getTime();
  
    if (now < sunrise) {
      return 'night'; // Before sunrise
    } else if (now >= sunrise && now < sunrise + 4 * 60 * 60 * 1000) {
      return 'morning'; // Within 4 hours after sunrise
    } else if (now >= sunrise + 4 * 60 * 60 * 1000 && now < sunset) {
      return 'afternoon'; // Between late morning and sunset
    } else if (now >= sunset && now < sunset + 4 * 60 * 60 * 1000) {
      return 'evening'; // Within 4 hours after sunset
    } else {
      return 'night'; // After evening
    }
  }
  