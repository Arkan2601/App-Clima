# App Clima

Aplicación web para consultar el clima actual en ciudades de México, con modo claro/oscuro y tabla de comparación.

## Requisitos

- Node.js >= 16.x
- npm >= 8.x

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Arkan2601/App-Clima
   cd app-clima
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura tu API Key de OpenWeatherMap:**

   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade tu API Key:

     ```
     REACT_APP_OPENWEATHER_API_KEY=tu_api_key_aqui
     ```

   - Puedes obtener una API Key gratuita en [OpenWeatherMap](https://openweathermap.org/api).

## Ejecución en local

```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Dependencias principales

- React
- OpenWeatherMap API

## Características

- Búsqueda de ciudades mexicanas.
- Tabla comparativa de clima en otras ciudades.
- Modo claro y oscuro.
- Visualización de detalles meteorológicos.

## Personalización

Puedes modificar la lista de ciudades en `src/components/CitiesWeatherTable.jsx`.

## Despliegue

Para crear una versión de producción:

```bash
npm run build
```

Esto generará la carpeta `build` lista para desplegar en cualquier hosting estático.

---

¡Disfruta tu app del clima!
