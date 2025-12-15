/**
 * Hook de Listagem de Nomes
 * 
 * Processa a lista de localidades para retornar uma versão ordenada
 * alfabeticamente, otimizada para exibição em listas simples.
 */

import { useMemo } from 'react';
import type { AppLocation } from '../types.ts';

export const useLocationNames = (locations: AppLocation[]) => {
  /**
   * Retorna uma cópia ordenada da lista de localidades.
   * Usa useMemo para evitar reordenação desnecessária a cada renderização.
   */
  const sortedLocations = useMemo(() => {
    // Cria uma cópia para não mutar o original e ordena
    return [...locations].sort((a, b) => 
      a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
    );
  }, [locations]);

  return sortedLocations;
};