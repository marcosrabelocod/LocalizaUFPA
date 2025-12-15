/**
 * Constantes e Dados Estáticos
 * 
 * Este arquivo armazena configurações fixas (como coordenadas iniciais)
 * e a base de dados inicial da aplicação (ALL_LOCATIONS) que simula o banco de dados.
 */

import type{ AppLocation, LocationRelation } from './types';

// 1°28'33.0"S 48°27'18.4"W converts to:
// Latitude: -(1 + 28/60 + 33/3600) = -1.475833
// Longitude: -(48 + 27/60 + 18.4/3600) = -48.455111

export const UFPA_COORDINATES = {
  lat: -1.475833,
  lng: -48.455111
};

export const MAP_ZOOM_LEVEL = 17;


export const ALL_LOCATIONS: AppLocation[] = [
  { id: 1, name: 'Portão 1', lat: -1.475972, lng: -48.459511, locationType: 'BUILDING' },
  { id: 2, name: 'Portão 2', lat: -1.472347, lng: -48.455924, locationType: 'BUILDING' },
  { id: 3, name: 'Portão 3', lat: -1.472784, lng: -48.451622, locationType: 'BUILDING' },
  { id: 4, name: 'Portão 4', lat: -1.466799, lng: -48.448121, locationType: 'BUILDING' },
  { id: 5, name: 'Portão 5', lat: -1.463082, lng: -48.445642, locationType: 'BUILDING' },
  { id: 6, name: 'Mirante do Rio', lat: -1.47721, lng: -48.45654, locationType: 'BUILDING' },
  { id: 7, name: 'Biblioteca Central', lat: -1.47637, lng: -48.45628, locationType: 'BUILDING' },
  { id: 8, name: 'CIAC', lat: -1.47551, lng: -48.45612, locationType: 'BUILDING' },
  { id: 9, name: 'Centro de Internacionalização', lat: -1.47664, lng: -48.45772, locationType: 'BUILDING' },
  { id: 10, name: 'Reitoria', lat: -1.47595, lng: -48.45516, locationType: 'BUILDING' },
  { id: 11, name: 'Restaurante Universitário Básico', lat: -1.47779, lng: -48.45806, locationType: 'BUILDING' },
  { id: 12, name: 'ICEM - Instituto de Ciências Exatas e Naturais', lat: -1.47446, lng: -48.45605, locationType: 'BUILDING' },
  { id: 13, name: 'Ver-o-pesinho Básico', lat: -1.47570, lng: -48.45657, locationType: 'BUILDING' },
  { id: 14, name: 'Laboratório de Engenharia Elétrica e Computação', lat: -1.47378, lng: -48.45185, locationType: 'BUILDING' },
  { id: 15, name: 'PCT - Parque de Ciência e Tecnologia do Guamá', lat: -1.46347, lng: -48.44456, locationType: 'BUILDING' },
  { id: 16, name: 'EETEPA Dr. Celso Malcher', lat: -1.46189, lng: -48.44161, locationType: 'BUILDING' },
  { id: 17, name: 'Faculdade de Medicina(FAMED)', lat: -1.46887, lng: -48.44795, locationType: 'BUILDING' },
  { id: 18, name: 'FENAV - Faculdade de Engenharia Naval', lat: -1.47035, lng: -48.44518, locationType: 'BUILDING' },
  { id: 19, name: 'Faculdade de Odontologia', lat: -1.47105, lng: -48.44732, locationType: 'BUILDING' },
  { id: 20, name: 'FFTO - Faculdade de Fisioterapia e Terapia Ocupacional', lat: -1.47108, lng: -48.44617, locationType: 'BUILDING' },
  { id: 21, name: 'Restaurante Universitário Profissional(RU)', lat: -1.473480, lng: -48.450710, locationType: 'BUILDING' },
  { id: 23, name: 'Ceamazon', lat: -1.4682558, lng: -48.4445067, locationType: 'BUILDING' },
  { id: 24, name: 'Restaurante do NAEA', lat: -1.47193, lng: -48.44953, locationType: 'BUILDING' },
  { id: 25, name: 'POEMA', lat: -1.4714443, lng: -48.4493141, locationType: 'BUILDING' },
  { id: 26, name: 'Hospital Universitário Bettina Ferro de Souza', lat: -1.469484, lng: -48.4470607, locationType: 'BUILDING' },
  { id: 27, name: 'Centro de Atenção à Saúde da Mulher e da Criança (CASMUC)', lat: -1.4700024, lng: -48.4474612, locationType: 'BUILDING' },
  { id: 28, name: 'Estacionamento', lat: -1.4701186, lng: -48.4474124, locationType: 'BUILDING' },
  { id: 29, name: 'Programa de Pós-graduação em Enfermagem (PPGENF)', lat: -1.4708392, lng: -48.4465938, locationType: 'BUILDING' },
  { id: 30, name: 'Farma Orto', lat: -1.47178, lng: -48.44663, locationType: 'BUILDING' },
  { id: 31, name: 'Faculdade de Farmácia', lat: -1.472011, lng: -48.447388, locationType: 'BUILDING' },
  { id: 32, name: 'Faculdade de Odontologia', lat: -1.471144, lng: -48.447279, locationType: 'BUILDING' },
  { id: 33, name: 'Programa Interdisciplinar Trópico em Movimento', lat: -1.4732126, lng: -48.4481978, locationType: 'BUILDING' },
  { id: 34, name: 'Núcleo de Educação Básica (NEB)', lat: -1.4721404, lng: -48.4496766, locationType: 'BUILDING' },
  { id: 35, name: 'Associação dos Docentes da UFPA (Adufpa)', lat: -1.4743872, lng: -48.4527693, locationType: 'BUILDING' },
  { id: 36, name: 'Calman Brasil LTDA ME', lat: -1.4641442, lng: -48.4454217, locationType: 'BUILDING' },
  { id: 37, name: 'Execute Soluções em TI', lat: -1.46406, lng: -48.44527, locationType: 'BUILDING' },
  { id: 38, name: 'Soluções em Geológia e Ambiente (GEOIN)', lat: -1.4642395, lng: -48.4453406, locationType: 'BUILDING' },
  { id: 39, name: 'Eletroposto Ceamazon', lat: -1.46701823, lng: -48.4464747, locationType: 'BUILDING' },
  { id: 40, name: 'Laboratorio de Biotecnologia', lat: -1.46928463, lng: -48.44794046, locationType: 'BUILDING' },
  { id: 41, name: 'Estacionamento ', lat: -1.47028138, lng: -48.44671945, locationType: 'BUILDING' }
];


// Lista para guardar o histórico de relações (Banco de dados de relações)
export const LOCATION_RELATIONS: LocationRelation[] = [];