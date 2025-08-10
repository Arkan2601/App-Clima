import React from "react";

// Este componente muestra los detalles extra del clima
const WeatherDetails = ({ humidity, windSpeed, pressure, feelsLike, unit }) => {
    return (
        <div className="weather-details">
            <h3>Detalles del Clima</h3>
            <div className="details-grid">
                {/* Sensación térmica */}
                <div>
                    <p>Sensación Térmica</p>
                    <p>{Math.round(feelsLike)}°{unit === "metric" ? "C" : "F"}</p>
                </div>
                {/* Humedad */}
                <div>
                    <p>Humedad</p>
                    <p>{humidity}%</p>
                </div>
                {/* Viento */}
                <div>
                    <p>Viento</p>
                    <p>
                        {unit === "metric"
                            ? `${Math.round(windSpeed * 3.6)} km/h`
                            : `${Math.round(windSpeed)} mph`}
                    </p>
                </div>
                {/* Presión */}
                <div>
                    <p>Presión</p>
                    <p>{pressure} hPa</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails;