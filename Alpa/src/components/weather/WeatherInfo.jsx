import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(''); // Input field for city

  const API_KEY = 'fd6abcdb3c58b2c6d6ba146d7d6849f9'; 
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;


  useEffect(() => {
    if (city) {
      axios.get(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => setWeatherData(response.data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
  }, [city]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity:{weatherData.main.humidity}</p>
          <p>wind speed:{weatherData.wind.speed.toFixed()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
