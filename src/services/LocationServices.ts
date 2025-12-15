import type { AppLocation } from '../types';

// URL base do seu json-server
const API_URL = 'http://localhost:3001/locations';

export const LocationService = {
  /**
   * Busca todas as localidades do banco de dados
   */
  getAll: async (): Promise<AppLocation[]> => {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no LocationService.getAll:', error);
      return []; // Retorna array vazio em caso de erro para não quebrar a tela
    }
  },

  /**
   * Busca uma localidade específica pelo ID
   */
  getById: async (id: number): Promise<AppLocation | null> => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Erro ao buscar localidade');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erro no LocationService.getById(${id}):`, error);
      return null;
    }
  },

  /**
   * (Opcional) Busca por termo (nome)
   * O json-server já tem filtro nativo usando ?q=termo
   */
  search: async (term: string): Promise<AppLocation[]> => {
    try {
      const response = await fetch(`${API_URL}?q=${term}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na busca:', error);
      return [];
    }
  }
};