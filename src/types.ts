/**
 * Definições de Tipos TypeScript
 * 
 * Este arquivo centraliza todas as interfaces e tipos usados na aplicação,
 * garantindo consistência na estrutura dos dados de Localidades e Relações.
 */

export interface DbLocation {
  Id: number;
  Nome: string;
  latitude: string; // Note: In the dump, this column holds longitude (-48...)
  longitude: string; // Note: In the dump, this column holds latitude (-1...)
  Andar: number;
  Tipo: number;
  Setor: number;
  Portao: number;
  Origem: string;
}

export interface AppLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  locationType?: 'BUILDING' | 'DEPARTMENT'; // Novo campo
  parentId?: number; // Novo campo para referenciar o prédio pai
}

// Nova interface para guardar o histórico de relações
export interface LocationRelation {
  id: number;
  idBuilding: number;
  idDepartment: number;
}

export interface DbSchema {
  localidade: DbLocation[];
}

export const LocationCategory = {
  ADMINISTRATION: 'ADMINISTRATION',
  ACADEMIC: 'ACADEMIC',
  LIBRARY: 'LIBRARY',
  FOOD: 'FOOD',
  HEALTH: 'HEALTH',
  SERVICE: 'SERVICE',
  LEISURE: 'LEISURE',
  OTHER: 'OTHER'
} as const;

export type LocationCategory = (typeof LocationCategory)[keyof typeof LocationCategory];

// 3. A Interface
export interface LocationInfo {
  id: string | number;
  name: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
  category: LocationCategory; // Agora isso funciona!
  imageUrl?: string;
}