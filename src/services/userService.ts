// src/services/userService.ts
import api from './api'; 

// --- AQUI ESTÁ A CHAVE: A palavra 'export' é obrigatória ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'proprietario' | 'atendente' | 'cliente';
  is_active: boolean | number;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  role: string;
}

// Objeto do serviço
export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  create: async (data: CreateUserDTO) => {
    const response = await api.post('/users', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};