import { useState } from 'react';
import type { AppLocation, LocationRelation } from '../types.ts';
import { ALL_LOCATIONS, LOCATION_RELATIONS } from '../constants';



export const useLocations = () => {

  const [locations, setLocations] = useState<AppLocation[]>(ALL_LOCATIONS);

  const [relations, setRelations] = useState<LocationRelation[]>(LOCATION_RELATIONS);



  /**
   * Atualiza uma localidade existente e gerencia a criação de relações
   * se a localidade for do tipo departamento.
  */

  const updateLocation = (updatedLocation: AppLocation) => {

    setLocations((prevLocations) =>

      prevLocations.map((loc) =>

        loc.id === updatedLocation.id ? updatedLocation : loc

      )

    );



    // Se for um departamento e tiver um pai, registramos a relação

    if (updatedLocation.locationType === 'DEPARTMENT' && updatedLocation.parentId) {

      // Verifica se já existe uma relação para este departamento para não duplicar

      const relationExists = relations.some(

        r => r.idDepartment === updatedLocation.id && r.idBuilding === updatedLocation.parentId

      );



      if (!relationExists) {

        const newRelation: LocationRelation = {

          id: Date.now(), // Gera um ID simples

          idBuilding: updatedLocation.parentId,

          idDepartment: updatedLocation.id

        };

       

        setRelations(prev => [...prev, newRelation]);

        console.log("Relação Salva:", newRelation); // Log para confirmar no console

      }

    }

  };



  /**

   * Busca e retorna um objeto de localidade baseado no seu ID numérico.

   */

  const getLocationById = (id: number): AppLocation | undefined => {

    return locations.find(loc => loc.id === id);

  };



  return {

    locations,

    relations,

    updateLocation,

    getLocationById

  };

};