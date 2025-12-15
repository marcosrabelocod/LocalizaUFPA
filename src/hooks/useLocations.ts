import { useState, useEffect } from 'react';
import type { AppLocation } from '../types';
import { LocationService } from '../services/LocationServices';

export const useLocations = () => {
  const [locations, setLocations] = useState<AppLocation[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento útil para UI
  const [error, setError] = useState<string | null>(null);

  // Função para recarregar os dados (útil após criar/editar algo)
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const data = await LocationService.getAll();
      setLocations(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar localidades.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados assim que o hook é montado
  useEffect(() => {
    fetchLocations();
  }, []);

  const getLocationById = (id: number) => {
    return locations.find(loc => loc.id === id);
  };

  /**
   * Atualiza uma localidade (vamos implementar o PUT/PATCH no serviço depois)
   * Por enquanto, atualiza apenas o estado local para refletir na tela
   */
  const updateLocation = (updatedLocation: AppLocation) => {
    setLocations(prev => 
      prev.map(loc => loc.id === updatedLocation.id ? updatedLocation : loc)
    );
    // Futuro: chamar LocationService.update(updatedLocation) aqui
  };

  return { 
    locations, 
    loading, // Agora você pode mostrar um spinner se quiser
    error,
    updateLocation, 
    getLocationById,
    refresh: fetchLocations // Expor função para forçar recarregamento
  };
};