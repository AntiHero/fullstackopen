import React from 'react';

const Weather = ({ info, weather }) => {
  return (
    <>
      <h1>Weather in {info.capital}</h1>
      <p>
        <b>temperature:</b>{' '}
        {weather.temperature >= 0
          ? '+' + weather.temperature
          : weather.temperature}{' '}
        Celcius
      </p>
      {weather.weather_icons.map((icon, index) => (
        <img key={index} className='weather-img' src={icon} alt='weather' />
      ))}
      <p>
        <br />
        <b>wind:</b> {weather.wind_speed} kph direction {weather.wind_dir}
      </p>
    </>
  );
};

export default Weather;
