import axiosInstance from './axiosConfig';

export interface Actor {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  genre_name: string;
}

export interface Version {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  name: string;
  content: string;
  director: string;
  duration: number;
  from_date: string;
  to_date: string;
  production_company: string;
  thumbnail: string;
  banner: string;
  limited_age?: string;
  trailer?: string;
  nation?: string;
  is_deleted: boolean;
  actors: Actor[]; // number[]
  gernes: Genre[]; // number[]
  versions: Version[]; // number[]
}

export interface UpdateMovieDto {
  id?: number;
  name: string;
  content: string;
  director: string;
  duration: number;
  from_date: string;
  to_date: string;
  production_company: string;
  thumbnail: string;
  banner: string;
  limited_age?: string;
  trailer?: string;
  nation?: string;
  is_deleted: boolean;
  actors: number[]; // number[]
  gernes: number[]; // number[]
  versions: number[]; // number[]
}

const API = 'http://localhost:3001/movies';

export const getAllMovies = async (): Promise<Movie[]> => {
  const res = await axiosInstance.get(API);
  return res.data;
};

export const createMovie = async (data: UpdateMovieDto) =>
  axiosInstance.post(API, data);

export const getMovieById = async (id: number) => {
  const res = await axiosInstance.get(`${API}/${id}`);
  return res.data;
};

export const updateMovie = async (id: number, data: UpdateMovieDto) =>
  axiosInstance.put(`${API}/${id}`, data);

export const deleteSoftMovie = async (id: number) =>
  axiosInstance.patch(`${API}/${id}`);

export const deletetMovie = async (id: number) =>
  axiosInstance.delete(`${API}/${id}`);
