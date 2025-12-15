/**
 * Constantes e Dados Estáticos
 * 
 * Este arquivo armazena configurações fixas (como coordenadas iniciais)
 * e a base de dados inicial da aplicação (ALL_LOCATIONS) que simula o banco de dados.
 */

import type{ LocationRelation } from './types';

// 1°28'33.0"S 48°27'18.4"W converts to:
// Latitude: -(1 + 28/60 + 33/3600) = -1.475833
// Longitude: -(48 + 27/60 + 18.4/3600) = -48.455111

export const UFPA_COORDINATES = {
  lat: -1.475833,
  lng: -48.455111
};

export const MAP_ZOOM_LEVEL = 17;





// Lista para guardar o histórico de relações (Banco de dados de relações)
export const LOCATION_RELATIONS: LocationRelation[] = [];