// API Configuration
  export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Helper function to serialize data for API requests
function serializeData(data: any): any {
  if (data === null || data === undefined) {
    return null;
  }
  
  if (data instanceof Date) {
    // Format date as YYYY-MM-DD for backend compatibility
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const day = String(data.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  if (typeof data === 'string' && data.trim() === '') {
    return null;
  }
  
  if (Array.isArray(data)) {
    return data.map(serializeData).filter(item => item !== null);
  }
  
  if (typeof data === 'object') {
    const serialized: any = {};
    for (const [key, value] of Object.entries(data)) {
      const serializedValue = serializeData(value);
      if (serializedValue !== null) {
        serialized[key] = serializedValue;
      }
    }
    return serialized;
  }
  
  return data;
}

// HTTP Client with error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<T> {
    let url = `${this.baseURL}${endpoint}`;
    
    // Add query parameters if provided
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Determine if we're sending FormData
    const isFormData = options.body instanceof FormData;
    
    // Get token for debugging
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('Auth token:', token ? `${token.substring(0, 20)}...` : 'No token');
    
    const defaultHeaders: Record<string, string> = {
      // Don't set Content-Type for FormData, let the browser set it with boundary
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      // Add JWT token if available
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      console.log(`Making request to: ${url}`, { 
        method: options.method, 
        body: isFormData ? '[FormData]' : options.body,
        headers: config.headers
      });
      
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let errorDetails = '';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          errorDetails = JSON.stringify(errorData, null, 2);
        } catch (parseError) {
          // If we can't parse JSON, try to get text
          try {
            errorDetails = await response.text();
          } catch (textError) {
            errorDetails = 'Could not read response body';
          }
        }
        
        console.error(`API Error (${endpoint}):`, {
          status: response.status,
          statusText: response.statusText,
          message: errorMessage,
          details: errorDetails,
          url: url,
          requestBody: options.body
        });
        
        throw new Error(`${errorMessage}\n\nDetails: ${errorDetails}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, params);
  }

  async post<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<T> {
    const isFormData = data instanceof FormData;
    const body = isFormData ? data : (data ? JSON.stringify(data) : undefined);
    
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body,
    }, params);
  }

  async patch<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<T> {
    const isFormData = data instanceof FormData;
    const body = isFormData ? data : (data ? JSON.stringify(data) : undefined);
    
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body,
    }, params);
  }

  async delete<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, params);
  }

  async put<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<T> {
    const isFormData = data instanceof FormData;
    const body = isFormData ? data : (data ? JSON.stringify(data) : undefined);
    
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body,
    }, params);
  }
}

// Initialize API client
const apiClient = new ApiClient(API_BASE_URL);

// Movie Service
export class MovieService {
  // Get all movies with pagination
  static async getAllMovies(
    params: MovieSearchParams = {}
  ): Promise<PaginatedResponse<Movie>> {
    try {
      const queryParams = {
        page: params.page || 1,
        limit: params.limit || 10,
        search: params.search,
        status: params.status,
        from_date: params.from_date?.toISOString(),
        to_date: params.to_date?.toISOString(),
      };
      
      const response = await apiClient.get<PaginatedResponse<Movie>>(
        '/movies',
        queryParams
      );
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
      console.log('Creating movie with data:', movieData);
      
      // Validate required fields
      const requiredFields = ['name', 'content', 'director', 'duration', 'production_company', 'thumbnail', 'banner'];
      const missingFields = requiredFields.filter(field => !movieData[field as keyof CreateMovieDto]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      // Validate dates
      if (!movieData.from_date || !movieData.to_date) {
        throw new Error('Both from_date and to_date are required');
      }
      
      if (movieData.from_date >= movieData.to_date) {
        throw new Error('to_date must be after from_date');
      }
      
      // Serialize the data to handle Date objects properly
      const serializedData = serializeData(movieData);
      console.log('Serialized data:', serializedData);
      
      const response = await apiClient.post<ApiResponse<Movie>>(
        '/movies',
        serializedData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  
  // Update movie
  static async updateMovie(
    id: number,
    movieData: Partial<CreateMovieDto>
  ): Promise<Movie> {
    try {
      const response = await apiClient.put<ApiResponse<Movie>>(
        `/movies/${id}`,
        movieData
      );
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
  static async uploadImage(
    file: File,
    type: 'thumbnail' | 'banner'
  ): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await apiClient.post<{ url: string }>(
        '/movies/upload-image',
        formData
      );
      return response;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Search movies
  static async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response = await apiClient.get<ApiResponse<Movie[]>>(
        `/movies/search`,
        { q: query }
      );
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
      const response = await apiClient.get<ApiResponse<Version>>(
        `/versions/${id}`
      );
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
      const response = await apiClient.get<ApiResponse<Schedule[]>>(
        `/schedule/movie/${movieId}`
      );
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
  },
};
