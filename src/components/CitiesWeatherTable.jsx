import React, { useState, useEffect } from "react";

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

const CitiesWeatherTable = ({ unit, apiKey, onCitySelect, theme }) => {
    const [citiesWeather, setCitiesWeather] = useState([]);

    useEffect(() => {
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
                        fullData: data
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
    }, [unit, apiKey]);

    const getWeatherIcon = (iconCode) => {
        if (!iconCode) return null;
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    // Al seleccionar una ciudad, mueve el scroll a los detalles
    const handleRowClick = (city) => {
        if (city.fullData && onCitySelect) {
            onCitySelect(city.fullData);
            setTimeout(() => {
                const details = document.querySelector(".weather-container");
                if (details) {
                    details.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 100);
        }
    };

    return (
        <div className={`cities-table-container${theme === "dark" ? " dark" : ""}`}>
            <h3>Clima en otras ciudades</h3>
            <table className="cities-weather-table">
                <thead>
                    <tr>
                        <th className={theme === "dark" ? "dark" : ""}>Ciudad</th>
                        <th className={theme === "dark" ? "dark" : ""}>Clima</th>
                        <th className={theme === "dark" ? "dark" : ""}>Icono</th>
                        <th className={theme === "dark" ? "dark" : ""}>Temperatura</th>
                    </tr>
                </thead>
                <tbody>
                    {citiesWeather.map((city) => (
                        <tr
                            key={city.name}
                            style={{ cursor: city.fullData ? "pointer" : "default" }}
                            onClick={() => handleRowClick(city)}
                        >
                            <td className={theme === "dark" ? "dark" : ""}>{city.name}</td>
                            <td className={theme === "dark" ? "dark" : ""}>{city.weather}</td>
                            <td className={theme === "dark" ? "dark" : ""}>
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
                            <td className={theme === "dark" ? "dark" : ""}>
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