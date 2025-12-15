/**
 * Componente de Navegação (Navbar)
 * 
 * Barra de navegação que permite alternar entre a visualização do Mapa
 * e a Lista de Locais usando rotas do React Router.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { Map as MapIcon, List as ListIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="ufpa-navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => `ufpa-nav-link ${isActive ? 'active' : ''}`}
        end
      >
        <MapIcon size={18} />
        <span>Mapa</span>
      </NavLink>
      <NavLink 
        to="/list" 
        className={({ isActive }) => `ufpa-nav-link ${isActive ? 'active' : ''}`}
      >
        <ListIcon size={18} />
        <span>Lista de Locais</span>
      </NavLink>
    </nav>
  );
};