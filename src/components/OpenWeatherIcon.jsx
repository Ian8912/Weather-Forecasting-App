import React from 'react'

const OpenWeatherIcon = ({id}) => {
  return (
    <img src={`https://openweathermap.org/img/wn/${id}@2x.png`} alt='Weather Icon'/>
  )
}

export default OpenWeatherIcon