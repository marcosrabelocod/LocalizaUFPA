/**
 * Componente Container do Mapa
 * 
 * Renderiza o mapa Leaflet, gerencia os marcadores, eventos de clique
 * e exibe o painel de detalhes quando um local é selecionado.
 * Também sincroniza a seleção com os parâmetros da URL.
 */

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer as LMapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import L from 'leaflet';
import type{ AppLocation } from '../types.ts';
import { UFPA_COORDINATES, MAP_ZOOM_LEVEL } from '../constants';
import { LocationDetailsPanel } from './LocationDetailsPanel';
import { useLocalMap } from '../hooks/useLocalMap';
import './MapContainer.css';

interface MapContainerProps {
  locations: AppLocation[];
}

/**
 * Gera o HTML string para o ícone SVG usado no marcador do mapa.
 * Atualmente fixo no ícone administrativo (prédio).
 */
const getMarkerHtml = () => {
  const adminIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>';

  return `<div class="custom-marker-pin marker-admin">
            ${adminIcon}
          </div>`;
};

/**
 * Cria um objeto DivIcon do Leaflet usando o HTML gerado.
 * Define o tamanho e ponto de ancoragem do ícone.
 */
const createCategoryIcon = () => {
  return L.divIcon({
    className: 'custom-marker-container',
    html: getMarkerHtml(),
    iconSize: [32, 32],
    iconAnchor: [16, 32], // Center bottom of the circle
    popupAnchor: [0, -16]
  });
};

/**
 * Controlador auxiliar para mover o mapa para a localização selecionada.
 * Realiza um cálculo de projeção para posicionar o marcador a 30% do topo da tela,
 * compensando a rotação de -30 graus e escala de 1.5 do CSS.
 */
const MapController: React.FC<{ center?: { lat: number; lng: number } }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      const targetZoom = 18;
      
      // 1. Converte a coordenada geográfica (lat/lng) para ponto em pixels no nível de zoom desejado
      const targetPoint = map.project([center.lat, center.lng], targetZoom);
      
      // Configurações visuais (Devem corresponder ao CSS .leaflet-container)
      const visualScale = 1.5;
      const visualRotationDeg = 30; // Rotação de 30 graus
      
      // 2. Cálculo do Deslocamento
      // Queremos o marcador em 30% da altura da tela (topo).
      // Centro da tela = 50%.
      // Diferença = 20% (0.2).
      const mapHeight = map.getSize().y;
      
      // Magnitude do deslocamento em pixels lógicos do mapa (dividido pela escala visual)
      const offsetMagnitude = (mapHeight * 0.20) / visualScale;
      
      // Como o mapa está rotacionado -30deg (anti-horário), o eixo "Baixo" da tela
      // corresponde a um vetor rotacionado +30deg no sistema do mapa.
      // Precisamos mover o CENTRO do mapa para "Baixo" visualmente, para que o Marcador suba.
      const angleRad = visualRotationDeg * (Math.PI / 180);
      
      // Vetor (0, 1) rotacionado 30 graus:
      // x = -sin(30)
      // y = cos(30)
      const offsetX = -(offsetMagnitude * Math.sin(angleRad)); 
      const offsetY = offsetMagnitude * Math.cos(angleRad);
      
      const newCenterPoint = targetPoint.add([offsetX, offsetY]);

      // 3. Converte o novo ponto central de volta para LatLng
      const newCenterLatLng = map.unproject(newCenterPoint, targetZoom);

      map.flyTo(newCenterLatLng, targetZoom, {
        animate: true,
        duration: 1.5
      });
    }
  }, [center, map]);

  return null;
};

/**
 * Componente que detecta cliques no fundo do mapa para limpar a seleção.
 */
const MapClickReset: React.FC<{ onMapClick: () => void }> = ({ onMapClick }) => {
  useMapEvents({
    click: () => {
      onMapClick();
    },
  });
  return null;
};

export const MapContainer: React.FC<MapContainerProps> = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState<AppLocation | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const buildings = useLocalMap(locations);

  /**
   * Efeito para sincronizar a URL com o estado de seleção.
   * Se a URL tiver ?selectedId=123, seleciona o local 123.
   */
  useEffect(() => {
    const idParam = searchParams.get('selectedId');
    if (idParam) {
      const locationId = parseInt(idParam, 10);
      const foundLocation = locations.find(loc => loc.id === locationId);
      if (foundLocation) {
        setSelectedLocation(foundLocation);
      }
    } else {
      // Se não tiver parametro, não necessariamente limpamos a seleção 
      // para evitar flash ao navegar, mas idealmente segue a URL.
      // Se quisermos limpar ao remover o param: setSelectedLocation(null);
    }
  }, [searchParams, locations]);

  /**
   * Define o local selecionado ao clicar em um marcador.
   * Atualiza também a URL.
   */
  const handleMarkerClick = (location: AppLocation) => {
    setSelectedLocation(location);
    setSearchParams({ selectedId: location.id.toString() });
  };

  /**
   * Limpa a seleção e remove o parametro da URL.
   */
  const handleClose = () => {
    setSelectedLocation(null);
    setSearchParams({}); // Remove query params
  };

  return (
    <div className="map-full-screen">
      <LMapContainer
        center={[UFPA_COORDINATES.lat, UFPA_COORDINATES.lng]}
        zoom={MAP_ZOOM_LEVEL}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Controla o centro do mapa quando uma localização é selecionada */}
        <MapController center={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : undefined} />
        
        <MapClickReset onMapClick={handleClose} />

        {buildings.map(location => {
          return (
            <Marker 
              key={location.id}
              position={[location.lat, location.lng]} 
              icon={createCategoryIcon()}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  handleMarkerClick(location);
                }
              }}
            />
          );
        })}
      </LMapContainer>
      
      <div className="ufpa-attribution-overlay">
        Leaflet | OpenStreetMap
      </div>

      <LocationDetailsPanel 
        selectedLocation={selectedLocation} 
        onClose={handleClose}
        allLocations={locations}
      />
    </div>
  );
};