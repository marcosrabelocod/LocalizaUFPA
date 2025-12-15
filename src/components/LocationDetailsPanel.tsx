/**
 * Painel de Detalhes da Localidade
 * 
 * Componente deslizante (bottom sheet) que exibe informações detalhadas
 * sobre o local selecionado, incluindo hierarquia (pai/filho) e botão de edição.
 */

import React from 'react';
//import { useNavigate } from 'react-router-dom';
import type{ AppLocation, LocationRelation } from '../types.ts';
import { 
  X as CloseIcon, 
  MapPin, 
  //Edit, Função para edição de localidade desabilitada temporariamente
  Building2,
  Landmark,
  DoorOpen
} from 'lucide-react';
import './LocationDetailsPanel.css';

interface LocationDetailsPanelProps {
  selectedLocation: AppLocation | null;
  onClose: () => void;
  allLocations: AppLocation[];
  relations?: LocationRelation[];
}

/**
 * Retorna o ícone padrão para exibir no cabeçalho do painel.
 */
const getPanelIcon = () => {
  return <Building2 size={24} />;
};

export const LocationDetailsPanel: React.FC<LocationDetailsPanelProps> = ({ 
  selectedLocation, 
  onClose,
  allLocations,
  relations = []
}) => {
  /*const navigate = useNavigate();*/

  if (!selectedLocation) {
    return <div className="location-details-panel" />;
  }

  const isDepartment = selectedLocation.locationType === 'DEPARTMENT';

  // Lógica para encontrar informações relacionadas
  let relationshipContent = null;

  if (isDepartment) {
    // Se for departamento, mostrar o prédio pai
    const parentBuilding = selectedLocation.parentId 
      ? allLocations.find(l => l.id === selectedLocation.parentId) 
      : null;

    relationshipContent = (
      <div className="info-row">
        <span className="info-label flex items-center gap-1">
          <Landmark size={12} /> Localizado em
        </span>
        <span className="info-value font-medium text-blue-800">
          {parentBuilding ? parentBuilding.name : 'Prédio não vinculado'}
        </span>
      </div>
    );
  } else {
    // Se for prédio, mostrar os departamentos vinculados
    const deptRelations = relations.filter(r => r.idBuilding === selectedLocation.id);
    const departments = deptRelations
      .map(r => allLocations.find(l => l.id === r.idDepartment))
      .filter((l): l is AppLocation => !!l);

    relationshipContent = (
      <div className="info-row">
        <span className="info-label flex items-center gap-1">
          <DoorOpen size={12} /> Departamentos/Salas
        </span>
        {departments.length > 0 ? (
          <div className="info-value mt-1">
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {departments.map(dept => (
                <li key={dept.id}>{dept.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <span className="info-value text-gray-400 italic text-sm">
            Nenhum departamento registrado.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`location-details-panel open`}>
      <div className="panel-header">
        <div className="panel-title-group">
          <div className={`panel-category-icon bg-admin`}>
            {getPanelIcon()}
          </div>
          <div>
            <h3 className="panel-title">{selectedLocation.name}</h3>
            <span className="panel-category-label">
              {isDepartment ? 'Departamento / Sala' : 'Prédio / Edifício'}
            </span>
          </div>
        </div>
        <button 
          className="panel-close-btn" 
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          <CloseIcon size={24} />
        </button>
      </div>
      
      <div className="panel-content">
        <div className="info-row">
          <span className="info-label">Coordenadas</span>
          <span className="info-value flex items-center gap-1">
            <MapPin size={14} /> 
            {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </span>
        </div>

        {/* Renderiza a informação contextual (Pai ou Filhos) */}
        {relationshipContent}
        
        {/*<button 
          onClick={() => navigate(`/edit/${selectedLocation.id}`)}
          className="panel-action-btn"
        >
          <Edit size={18} />
          Editar Informações
        </button>*/}
      </div>
    </div>
  );
};