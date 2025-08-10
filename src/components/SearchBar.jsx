import React, { useState } from "react";

// Lista de ciudades de México para las sugerencias del buscador
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

// Componente SearchBar que recibe una función onSearch como prop
const SearchBar = ({ onSearch }) => {
    // Estado para guardar la ciudad que escribe el usuario
    const [city, setCity] = useState("");
    // Estado para guardar las sugerencias filtradas
    const [suggestions, setSuggestions] = useState([]);
    // Estado para mostrar u ocultar las sugerencias
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Esta función se ejecuta cuando el usuario escribe en el input
    const handleChange = (e) => {
        const value = e.target.value;
        setCity(value);
        // Si el input no está vacío, filtra las ciudades que coincidan
        if (value.length > 0) {
            const filtered = ciudadesMexico.filter((c) =>
                c.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            // Si está vacío, borra las sugerencias y las oculta
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Cuando el usuario da click en una sugerencia, la pone en el input
    const handleSuggestionClick = (suggestion) => {
        setCity(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    // Cuando el usuario envía el formulario, llama a la función onSearch
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(city);
        setShowSuggestions(false);
    };

    // Renderiza el formulario con el input y las sugerencias
    return (
        <form onSubmit={handleSubmit} className="search-form" autoComplete="off">
            <div className="autocomplete-container">
                <input
                    type="text"
                    value={city}
                    onChange={handleChange}
                    placeholder="Escribe una ciudad de México"
                    className="search-select"
                />
                {/* Si hay sugerencias y se deben mostrar, las pone en una lista */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="autocomplete-list">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion}
                                className="autocomplete-item"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit">Buscar</button>
        </form>
    );
};

export default SearchBar;