import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    if (error.response?.status === 403) {
      console.error('Forbidden access');
    }
    return Promise.reject(error);
  }
);

// Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Configuration
export const API_CONFIG = {
  // Base URL for backend API
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // API Endpoints
  ENDPOINTS: {
    // Movie endpoints
    MOVIE: {
      LIST: '/movies',
      DETAIL: (id: number) => `/movies/${id}`,
      CREATE: '/movies',
      UPDATE: (id: number) => `/movies/${id}`,
      DELETE: (id: number) => `/movies/${id}`,
      SEARCH: '/movies/search',
      STATS: '/movies/stats',
      UPLOAD_IMAGE: '/movies/upload-image',
    },
    
    // Actor endpoints
    ACTOR: {
      LIST: '/actors',
      DETAIL: (id: number) => `/actors/${id}`,
      CREATE: '/actors',
      UPDATE: (id: number) => `/actors/${id}`,
      DELETE: (id: number) => `/actors/${id}`,
    },
    
    // Gerne endpoints
    GERNE: {
      LIST: '/gernes',
      DETAIL: (id: number) => `/gernes/${id}`,
      CREATE: '/gernes',
      UPDATE: (id: number) => `/gernes/${id}`,
      DELETE: (id: number) => `/gernes/${id}`,
    },
    
    // Version endpoints
    VERSION: {
      LIST: '/versions',
      DETAIL: (id: number) => `/versions/${id}`,
      CREATE: '/versions',
      UPDATE: (id: number) => `/versions/${id}`,
      DELETE: (id: number) => `/versions/${id}`,
    },
    
    // Schedule endpoints
    SCHEDULE: {
      LIST: '/schedule',
      BY_MOVIE: (movieId: number) => `/schedule/movie/${movieId}`,
      CREATE: '/schedule',
      UPDATE: (id: number) => `/schedule/${id}`,
      DELETE: (id: number) => `/schedule/${id}`,
    },
    
    // Auth endpoints
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
  },
  
  // Request configuration
  REQUEST: {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },
  
  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
  
  // File upload configuration
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',
  TIMEOUT_ERROR: 'Yêu cầu hết thời gian chờ. Vui lòng thử lại.',
  UNAUTHORIZED: 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.',
  FORBIDDEN: 'Bạn không có quyền truy cập vào tài nguyên này.',
  NOT_FOUND: 'Không tìm thấy tài nguyên yêu cầu.',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
  SERVER_ERROR: 'Lỗi máy chủ. Vui lòng thử lại sau.',
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Tạo mới thành công.',
  UPDATED: 'Cập nhật thành công.',
  DELETED: 'Xóa thành công.',
  SAVED: 'Lưu thành công.',
  UPLOADED: 'Tải lên thành công.',
};

// Validation Rules
export const VALIDATION_RULES = {
  MOVIE: {
    NAME: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 100,
      REQUIRED: true,
    },
    CONTENT: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 2000,
      REQUIRED: true,
    },
    DIRECTOR: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 100,
      REQUIRED: true,
    },
    DURATION: {
      MIN: 1,
      MAX: 999,
      REQUIRED: true,
    },
    PRODUCTION_COMPANY: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 100,
      REQUIRED: true,
    },
  },
  URL: {
    PATTERN: /^https?:\/\/.+/,
    MESSAGE: 'URL phải bắt đầu bằng http:// hoặc https://',
  },
  DATE: {
    MIN_DATE: new Date('1900-01-01'),
    MAX_DATE: new Date('2100-12-31'),
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// App Configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Movie Theater Admin',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  DESCRIPTION: 'Hệ thống quản lý rạp chiếu phim',
  AUTHOR: 'Movie Theater Team',
  SUPPORT_EMAIL: 'support@movietheater.com',
}; 