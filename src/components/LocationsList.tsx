/**
 * Componente de Lista de Locais
 * 
 * Exibe uma lista de todos os locais cadastrados com funcionalidade de busca em tempo real.
 * Ao clicar em um item, o usuário é redirecionado para o mapa com o local selecionado.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AppLocation } from '../types.ts';
import { useLocationNames } from '../hooks/useLocationNames';
import './LocationsList.css';
import { MapPin, Search, ChevronRight } from 'lucide-react';

interface LocationsListProps {
  locations: AppLocation[];
}

export const LocationsList: React.FC<LocationsListProps> = ({ locations }) => {
  const sortedLocations = useLocationNames(locations);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filtra a lista com base no termo de pesquisa
  const displayedLocations = sortedLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Navega para o mapa passando o ID do local selecionado via query param.
   */
  const handleLocationClick = (id: number) => {
    navigate(`/?selectedId=${id}`);
  };

  return (
    <div className="locations-list-container">
      <div className="locations-list-header">
        <div className="header-title-row">
          <h2>Índice de Locais</h2>
          <span className="locations-count">{displayedLocations.length} registros</span>
        </div>
        
        <div className="search-box-container">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input"
            placeholder="Buscar localidade..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ul className="locations-simple-list">
        {displayedLocations.length > 0 ? (
          displayedLocations.map(loc => (
            <li 
              key={loc.id} 
              className="location-simple-item clickable"
              onClick={() => handleLocationClick(loc.id)}
            >
              <div className="item-content">
                <MapPin size={16} className="item-icon" />
                <div className="item-info">
                  <span className="item-name">{loc.name}</span>
                  <span className="item-type">
                    {loc.locationType === 'DEPARTMENT' ? 'Departamento' : 'Prédio'}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="item-arrow" />
            </li>
          ))
        ) : (
          <li className="empty-state">
            Nenhum local encontrado para "{searchTerm}"
          </li>
        )}
      </ul>
    </div>
  );
};