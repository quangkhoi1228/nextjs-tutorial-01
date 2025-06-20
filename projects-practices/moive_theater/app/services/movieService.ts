// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Types based on NestJS backend entities
export interface Movie {
  id: number;
  name: string;
  content: string;
  director: string;
  duration: number;
  limited_age: string;
  trailer: string;
  nation: string;
  from_date: Date;
  to_date: Date;
  production_company: string;
  thumbnail: string;
  banner: string;
  is_deleted: boolean;
  created_at?: Date;
  updated_at?: Date;
  actors?: Actor[];
  gernes?: Gerne[];
  versions?: Version[];
  schedules?: Schedule[];
}

export interface Actor {
  id: number;
  name: string;
  avatar?: string;
  description?: string;
  movies?: Movie[];
}

export interface Gerne {
  id: number;
  name: string;
  description?: string;
  movies?: Movie[];
}

export interface Version {
  id: number;
  name: string;
  description?: string;
  movies?: Movie[];
}

export interface Schedule {
  id: number;
  movie_id: number;
  cinema_room_id: number;
  start_time: Date;
  end_time: Date;
  price: number;
  movie?: Movie;
}

export interface CreateMovieDto {
  name: string;
  content: string;
  director: string;
  duration: number;
  limited_age?: string;
  trailer?: string;
  nation?: string;
  from_date: Date;
  to_date: Date;
  production_company: string;
  thumbnail: string;
  banner: string;
  actorIds?: number[];
  gerneIds?: number[];
  versionIds?: number[];
}

export interface UpdateMovieDto extends Partial<CreateMovieDto> {
  id: number;
}

export interface MovieSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'deleted';
  from_date?: Date;
  to_date?: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response wrapper
interface   ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// HTTP Client with error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // Add JWT token if available
      ...(typeof window !== 'undefined' && localStorage.getItem('token') && {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body:  data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Initialize API client
const apiClient = new ApiClient(API_BASE_URL);

// Movie Service
export class MovieService {
  // Get all movies with pagination
  static async getAllMovies(params: MovieSearchParams = {}): Promise<PaginatedResponse<Movie>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Movie>>('/movies', {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          status: params.status,
          from_date: params.from_date?.toISOString(),
          to_date: params.to_date?.toISOString(),
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  // Get movie by ID
  static async getMovieById(id: number): Promise<Movie> {
    try {
      const response = await apiClient.get<ApiResponse<Movie>>(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  }

  // Create new movie
  static async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    try {
      const response = await apiClient.post<ApiResponse<Movie>>('/movies', movieData);
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  // Update movie
  static async updateMovie(id: number, movieData: Partial<CreateMovieDto>): Promise<Movie> {
    try {
      const response = await apiClient.patch<ApiResponse<Movie>>(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  }

  // Delete movie
  static async deleteMovie(id: number): Promise<void> {
    try {
      await apiClient.delete(`/movies/${id}`);
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }

  // Upload image
  static async uploadImage(file: File, type: 'thumbnail' | 'banner'): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await apiClient.post<{ url: string }>('/movies/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Search movies
  static async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response = await apiClient.get<ApiResponse<Movie[]>>(`/movies/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  // Get movie statistics
  static async getMovieStats(): Promise<{
    total: number;
    active: number;
    upcoming: number;
    deleted: number;
  }> {
    try {
      const response = await apiClient.get<ApiResponse<any>>('/movies/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching movie stats:', error);
      throw error;
    }
  }
}

// Actor Service
export class ActorService {
  static async getAllActors(): Promise<Actor[]> {
    try {
      const response = await apiClient.get<ApiResponse<Actor[]>>('/actor');
      return response.data;
    } catch (error) {
      console.error('Error fetching actors:', error);
      throw error;
    }
  }

  static async getActorById(id: number): Promise<Actor> {
    try {
      const response = await apiClient.get<ApiResponse<Actor>>(`/actor/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching actor:', error);
      throw error;
    }
  }
}

// Gerne Service
export class GerneService {
  static async getAllGernes(): Promise<Gerne[]> {
    try {
      const response = await apiClient.get<ApiResponse<Gerne[]>>('/gernes');
      return response.data;
    } catch (error) {
      console.error('Error fetching gernes:', error);
      throw error;
    }
  }

  static async getGerneById(id: number): Promise<Gerne> {
    try {
      const response = await apiClient.get<ApiResponse<Gerne>>(`/gernes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gerne:', error);
      throw error;
    }
  }
}

// Version Service
export class VersionService {
  static async getAllVersions(): Promise<Version[]> {
    try {
      const response = await apiClient.get<ApiResponse<Version[]>>('/versions');
      return response.data;
    } catch (error) {
      console.error('Error fetching versions:', error);
      throw error;
    }
  }

  static async getVersionById(id: number): Promise<Version> {
    try {
      const response = await apiClient.get<ApiResponse<Version>>(`/versions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching version:', error);
      throw error;
    }
  }
}

// Schedule Service
export class ScheduleService {
  static async getSchedulesByMovie(movieId: number): Promise<Schedule[]> {
    try {
      const response = await apiClient.get<ApiResponse<Schedule[]>>(`/schedule/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  }
}

// Export API configuration for debugging
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  endpoints: {
    movie: '/movies',
    actor: '/actors',
    gerne: '/gernes',
    version: '/versions',
    schedule: '/schedule',
  }
}; 