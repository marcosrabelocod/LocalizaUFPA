/**
 * Hook de Filtragem para o Mapa
 * 
 * Filtra a lista de locais para retornar apenas aqueles que devem aparecer
 * como marcadores físicos no mapa (Prédios), excluindo departamentos internos.
 */

import { useMemo } from 'react';
import type{ AppLocation } from '../types.ts';

export const useLocalMap = (locations: AppLocation[]) => {
  /**
   * Filtra as localidades mantendo apenas as do tipo 'BUILDING'
   * ou aquelas sem tipo definido (assumidas como prédios).
   */
  const buildings = useMemo(() => {
    return locations.filter(location => 
      location.locationType === 'BUILDING' || !location.locationType
    );
  }, [locations]);

  return buildings;
};