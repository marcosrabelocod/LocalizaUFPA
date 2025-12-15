/**
 * Hook de Formulário de Localização
 * 
 * Gerencia o estado do formulário de edição, controlando os inputs
 * e a submissão dos dados.
 */

import React, { useState, useEffect } from 'react';
import type{ AppLocation } from '../types.ts';

export const useLocationForm = (
  initialLocation: AppLocation | undefined, 
  onSubmit: (location: AppLocation) => void
) => {
  const [formData, setFormData] = useState<AppLocation>({
    id: 0,
    name: '',
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    if (initialLocation) {
      setFormData(initialLocation);
    }
  }, [initialLocation]);

  /**
   * Atualiza um campo específico do estado do formulário.
   */
  const handleChange = (field: keyof AppLocation, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Manipula o evento de envio do formulário e chama o callback onSubmit.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};