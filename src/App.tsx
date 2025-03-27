import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = "6c8df95147d11c6acdff6c5a6e7cd0df"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

type WeatherData = {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { description: string; icon: string }[];
};

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric", 
          lang: "en", 
        },
      });
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found.");
    }
  }
  return(
    <div className="container">
      <h1>Weather App</h1>
      <input type="text" 
      placeholder="Give me the name of a city "
      value = {city}
      onChange={(e) => setCity(e.target.value)}
      /> 
      <br />
      <button onClick={fetchWeather}>Get weather</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Sky: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};
export default App;
