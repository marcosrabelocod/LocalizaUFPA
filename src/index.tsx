/**
 * Arquivo de Entrada (Entry Point)
 * 
 * Este arquivo é responsável por inicializar a aplicação React.
 * Ele busca o elemento raiz no HTML e renderiza o componente principal (App) dentro dele.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);