/**
 * Componente de Cabeçalho (Header)
 * 
 * Exibe o logotipo e o título da aplicação na parte superior da tela.
 */

import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="ufpa-header">
      <div className="ufpa-header-brand">
        {/* Ícone simples representando um mapa/localização */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="ufpa-header-logo"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <div>
          <h1 className="ufpa-header-title">UFPA Campus Map</h1>
          <span className="ufpa-header-subtitle">Universidade Federal do Pará</span>
        </div>
      </div>
    </header>
  );
};