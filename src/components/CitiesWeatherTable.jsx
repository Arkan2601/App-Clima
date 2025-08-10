import React, { useState, useEffect } from "react";

// Lista de ciudades para mostrar en la tabla
const ciudadesMexico = [
    "Linares, mx",
    "Hualahuises, mx",
    "Ciudad de México",
    "Guadalajara",
    "Monterrey",
    "Puebla",
    "Tijuana",
    "León",
    "Querétaro",
    "Cancún",
    "Mérida",
    "Toluca",
    "Chihuahua",
    "San Luis Potosí",
    "Aguascalientes",
    "Cuernavaca",
    "Acapulco"
];

const CitiesWeatherTable = ({ unit, apiKey, onCitySelect }) => {
    const [citiesWeather, setCitiesWeather] = useState([]);

    useEffect(() => {
        // Función para obtener el clima de todas las ciudades
        const fetchAllCitiesWeather = async () => {
            const promises = ciudadesMexico.map(async (city) => {
                try {
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
                    );
                    if (!res.ok) throw new Error();
                    const data = await res.json();
                    return {
                        name: data.name,
                        weather: data.weather[0].main,
                        temp: Math.round(data.main.temp),
                        icon: data.weather[0].icon,
                        fullData: data // Guarda toda la data para mostrar detalles
                    };
                } catch {
                    return {
                        name: city,
                        weather: "No disponible",
                        temp: "-",
                        icon: null,
                        fullData: null
                    };
                }
            });
            const results = await Promise.all(promises);
            setCitiesWeather(results);
        };

        fetchAllCitiesWeather();
        // eslint-disable-next-line
    }, [unit, apiKey]);

    // Función para obtener el ícono del clima desde openweathermap
    const getWeatherIcon = (iconCode) => {
        if (!iconCode) return null;
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="cities-table-container">
            <h3>Clima en otras ciudades</h3>
            <table className="cities-weather-table">
                <thead>
                    <tr>
                        <th>Ciudad</th>
                        <th>Clima</th>
                        <th>Icono</th>
                        <th>Temperatura</th>
                    </tr>
                </thead>
                <tbody>
                    {citiesWeather.map((city) => (
                        <tr
                            key={city.name}
                            style={{ cursor: city.fullData ? "pointer" : "default" }}
                            onClick={() => city.fullData && onCitySelect(city.fullData)}
                        >
                            <td>{city.name}</td>
                            <td>{city.weather}</td>
                            <td>
                                {city.icon ? (
                                    <img
                                        src={getWeatherIcon(city.icon)}
                                        alt={city.weather}
                                        style={{ width: "38px", height: "38px" }}
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td>
                                {city.temp !== "-"
                                    ? `${city.temp}°${unit === "metric" ? "C" : "F"}`
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitiesWeatherTable;