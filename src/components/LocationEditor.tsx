/**
 * Editor de Localidade
 * 
 * Formulário para editar informações de um local. Suporta alteração de nome,
 * coordenadas e tipo (Prédio/Departamento). Inclui lógica de busca para vincular
 * departamentos a prédios pai.
 */

import React, { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type{ AppLocation } from '../types.ts';
import { useLocationForm } from '../hooks/useLocationForm';
import { Save, X as XIcon, Search, Building, MapPin } from 'lucide-react';
import './LocationEditor.css';

interface LocationEditorProps {
  getLocationById: (id: number) => AppLocation | undefined;
  onUpdate: (location: AppLocation) => void;
  allLocations: AppLocation[]; // Necessário para buscar os pais
}

export const LocationEditor: React.FC<LocationEditorProps> = ({ 
  getLocationById, 
  onUpdate,
  allLocations 
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const locationId = id ? parseInt(id, 10) : 0;
  const existingLocation = getLocationById(locationId);

  // Estados locais para controlar a busca de prédio pai
  const [parentSearchTerm, setParentSearchTerm] = useState('');
  const [showParentResults, setShowParentResults] = useState(false);
  
  const { formData, handleChange, handleSubmit } = useLocationForm(
    existingLocation,
    (updatedLoc) => {
      onUpdate(updatedLoc);
      navigate('/');
    }
  );

  // Quando carregar, se já tiver um pai, definir o nome para exibição (opcional)
  const parentLocation = formData.parentId 
    ? allLocations.find(l => l.id === formData.parentId) 
    : null;

  // Filtrar locais para sugestão (apenas Prédios, excluindo o próprio local atual)
  const filteredParents = allLocations.filter(loc => 
    loc.id !== formData.id && // Não pode ser pai dele mesmo
    loc.name.toLowerCase().includes(parentSearchTerm.toLowerCase()) &&
    (loc.locationType === 'BUILDING' || !loc.locationType) // Assumindo undefined como Building por padrão
  );

  if (!existingLocation) {
    return (
      <div className="editor-container">
        <h2>Local não encontrado</h2>
        <button onClick={() => navigate('/')} className="btn-cancel">Voltar</button>
      </div>
    );
  }

  /**
   * Seleciona um prédio pai da lista de busca, atualizando o ID do pai
   * e herdando automaticamente as coordenadas do prédio.
   */
  const selectParent = (parent: AppLocation) => {
    handleChange('parentId', parent.id);
    // Herdar automaticamente as coordenadas do pai
    handleChange('lat', parent.lat);
    handleChange('lng', parent.lng);
    
    setParentSearchTerm(''); // Limpa busca
    setShowParentResults(false);
  };

  /**
   * Remove a seleção do prédio pai.
   */
  const clearParent = () => {
    // @ts-ignore - gambiarra tipada para permitir null/undefined no form
    handleChange('parentId', undefined);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2 className="editor-title">Editar Localidade</h2>
      </div>

      <form className="editor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">ID</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.id} 
            disabled 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nome do Local</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.name} 
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        {/* Seleção do Tipo de Construção */}
        <div className="form-group">
          <label className="form-label">Tipo da Construção</label>
          <select 
            className="form-select"
            value={formData.locationType || 'BUILDING'}
            onChange={(e) => {
              handleChange('locationType', e.target.value);
              // Se mudar para prédio, limpa o pai
              if (e.target.value === 'BUILDING') {
                clearParent();
              }
            }}
          >
            <option value="BUILDING">Prédio / Edifício</option>
            <option value="DEPARTMENT">Departamento / Sala</option>
          </select>
        </div>

        {/* Lógica Condicional: Se for Departamento, mostrar busca de Prédio Pai */}
        {formData.locationType === 'DEPARTMENT' && (
          <div className="form-group">
            <label className="form-label">Localizado no Prédio:</label>
            
            {parentLocation ? (
              <div className="selected-parent-display">
                <span className="flex items-center gap-2">
                  <Building size={16} />
                  {parentLocation.name}
                </span>
                <button type="button" onClick={clearParent} className="clear-parent-btn">
                  <XIcon size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="form-input pl-10"
                    placeholder="Pesquisar prédio..."
                    value={parentSearchTerm}
                    onChange={(e) => {
                      setParentSearchTerm(e.target.value);
                      setShowParentResults(true);
                    }}
                    onFocus={() => setShowParentResults(true)}
                  />
                </div>
                
                {showParentResults && parentSearchTerm && (
                  <div className="search-results-dropdown">
                    {filteredParents.length > 0 ? (
                      filteredParents.map(loc => (
                        <div 
                          key={loc.id} 
                          className="search-result-item"
                          onClick={() => selectParent(loc)}
                        >
                          {loc.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500 text-sm">Nenhum prédio encontrado.</div>
                    )}
                  </div>
                )}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              A localização será herdada do prédio selecionado.
            </p>
          </div>
        )}

        {/* Campos de Coordenadas (Latitude/Longitude) 
            Só aparecem se NÃO for um departamento. 
            Se for departamento, as coordenadas são gerenciadas automaticamente pelo pai.
        */}
        {formData.locationType !== 'DEPARTMENT' ? (
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input 
                type="number" 
                step="any"
                className="form-input" 
                value={formData.lat} 
                onChange={(e) => handleChange('lat', parseFloat(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input 
                type="number" 
                step="any"
                className="form-input" 
                value={formData.lng} 
                onChange={(e) => handleChange('lng', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        ) : (
          // Feedback visual quando as coordenadas estão ocultas
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3 text-gray-600">
             <MapPin className="text-blue-600" size={20} />
             <div className="text-sm">
               <strong>Localização Vinculada:</strong>
               <div className="font-mono text-xs mt-1">
                 {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
               </div>
             </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
            <XIcon size={18} /> Cancelar
          </button>
          <button type="submit" className="btn-save">
            <Save size={18} /> Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};