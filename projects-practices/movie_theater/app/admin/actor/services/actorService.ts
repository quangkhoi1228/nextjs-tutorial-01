// app/actor/services/actorService.ts

import axiosInstance from '../../movie/services/axiosConfig';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';


export interface Actor {
  id: number;
  name: string;
  stage_name?: string;
  gender: string;
  date_of_birth: string;
  nationality: string;
  biography: string;
  profile_image: string;
  is_deleted?: boolean;
}

export const ActorService = {
  getAll: async (): Promise<Actor[]> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/actor`);
    return res.data;
  },
  getById: async (id: number): Promise<Actor> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/actor/${id}`);
    return res.data;
  },
  search: async (name: string): Promise<Actor[]> => {
    const res = await axiosInstance.get(`${API_BASE_URL}/actor/search`, { params: { name } });
    return res.data;
  },
  create: async (data: Partial<Actor>) => {
    const res = await axiosInstance.post(`${API_BASE_URL}/actor`, data);
    return res.data;
  },
  update: async (id: number, data: Partial<Actor>) => {
    const res = await axiosInstance.put(`${API_BASE_URL}/actor/${id}`, data);
    return res.data;
  },
  softDelete: async (id: number) => {
    const res = await axiosInstance.patch(`${API_BASE_URL}/actor/${id}/soft-delete`);
    return res.data;
  },
  remove: async (id: number) => {
    const res = await axiosInstance.delete(`${API_BASE_URL}/actor/${id}`);
    return res.data;
  },
};