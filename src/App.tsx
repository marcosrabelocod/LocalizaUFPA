/**
 * Componente Principal da Aplicação
 * 
 * Este arquivo define a estrutura base do layout (Header, Navbar, Conteúdo).
 * Configura o Roteamento (React Router) e inicializa o estado global das localidades.
 */

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MapContainer } from './components/MapContainer';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { LocationsList } from './components/LocationsList';
import { LocationEditor } from './components/LocationEditor';
import { useLocations } from './hooks/useLocations';

const App: React.FC = () => {
  // Hook personalizado que fornece a lista de locais e funções para atualizar o estado global
  const { locations, updateLocation, getLocationById } = useLocations();

  return (
    <HashRouter>
      <div className="app-container">
        <Header />
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<MapContainer locations={locations} />} />
            <Route path="/list" element={<LocationsList locations={locations} />} />
            <Route 
              path="/edit/:id" 
              element={
                <LocationEditor 
                  getLocationById={getLocationById} 
                  onUpdate={updateLocation}
                  allLocations={locations} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;