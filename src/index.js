import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Aquí obtengo el elemento root del HTML donde se va a montar la app
const container = document.getElementById('root');

// Creo la raíz para React 18 usando createRoot
const root = createRoot(container);

// Renderizo el componente principal App dentro de React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);