import React from "react";

// Este componente muestra la tarjeta principal del clima
const WeatherCard = ({ location, temp, description, icon, unit }) => {
    // Función para obtener el ícono del clima desde openweathermap
    const getWeatherIcon = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="weather-card">
            {/* Nombre de la ciudad */}
            <h2>{location}</h2>
            <div className="weather-main">
                {/* Imagen del clima */}
                <img
                    src={getWeatherIcon(icon)}
                    alt={description}
                    className="weather-icon"
                />
                <div>
                    {/* Temperatura */}
                    <p className="temperature">
                        {Math.round(temp)}°{unit === "metric" ? "C" : "F"}
                    </p>
                    {/* Descripción del clima */}
                    <p className="description">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;