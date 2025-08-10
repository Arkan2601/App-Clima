import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import CitiesWeatherTable from "./components/CitiesWeatherTable";

// Componente principal de la app del clima
function App() {
  // Estado para guardar los datos del clima
  const [weatherData, setWeatherData] = useState(null);
  // Estado para saber si está cargando la info
  const [loading, setLoading] = useState(false);
  // Estado para mostrar errores si hay
  const [error, setError] = useState(null);
  // Estado para la unidad de temperatura (Celsius o Fahrenheit)
  const [unit, setUnit] = useState("metric");
  // Estado para el nombre de la ciudad
  const [location, setLocation] = useState("");
  // Estado para el tema claro/oscuro
  const [theme, setTheme] = useState("light");

  // Obtengo la API Key desde el archivo .env
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Función para pedir los datos del clima a la API
  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error("Ciudad no encontrada");

      const data = await response.json();
      setWeatherData(data);
      setLocation(`${data.name}, ${data.sys.country}`);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Cuando el usuario busca una ciudad
  const handleSearch = (city) => {
    if (city.trim()) fetchWeatherData(city);
  };

  // Cambia entre Celsius y Fahrenheit
  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  // Cambia entre tema claro y oscuro
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  // Cuando seleccionas una ciudad de la tabla
  const handleCitySelect = (cityData) => {
    setWeatherData(cityData);
    setLocation(`${cityData.name}, ${cityData.sys.country}`);
    setError(null);
  };

  // Actualiza los datos si cambia la unidad
  useEffect(() => {
    if (weatherData) fetchWeatherData(weatherData.name);
  }, [unit]);

  // Al iniciar la app, carga Linares, Mx
  useEffect(() => {
    fetchWeatherData("Linares, Mx");
  }, []);

  // Renderiza la interfaz
  return (
    <div className={`app${theme === "dark" ? " dark" : ""}`}>
      <h1>Aplicación del Clima</h1>
      <button onClick={toggleTheme} className="unit-toggle" style={{ marginBottom: 10 }}>
        Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
      </button>
      <SearchBar onSearch={handleSearch} />
      <button onClick={toggleUnit} className="unit-toggle">
        Cambiar a {unit === "metric" ? "°F" : "°C"}
      </button>
      <div className="main-content" style={{ display: "flex", gap: "2rem" }}>
        {/* Sección principal del clima */}
        <div style={{ flex: 2 }}>
          {weatherData && (
            <div className={`weather-container${theme === "dark" ? " dark" : ""}`}>
              <WeatherCard
                location={location}
                temp={weatherData.main.temp}
                description={weatherData.weather[0].description}
                icon={weatherData.weather[0].icon}
                unit={unit}
              />
              <WeatherDetails
                humidity={weatherData.main.humidity}
                windSpeed={weatherData.wind.speed}
                pressure={weatherData.main.pressure}
                feelsLike={weatherData.main.feels_like}
                unit={unit}
              />
            </div>
          )}
          {loading && <p>Cargando datos del clima...</p>}
          {error && <p className="error">{error}</p>}
        </div>
        {/* Tabla de otras ciudades en un div separado */}
        <div style={{ flex: 1 }}>
          <CitiesWeatherTable
            unit={unit}
            apiKey={API_KEY}
            onCitySelect={handleCitySelect}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

export default App;