'use client';
import { useState, useEffect, useCallback } from 'react';
import { 
  Movie, 
  MovieService, 
  ActorService, 
  GerneService, 
  VersionService,
  MovieSearchParams,
  PaginatedResponse,
  Actor,
  Gerne,
  Version
} from '../services/movieService';

interface UseMovieManagementReturn {
  // State
  movies: Movie[];
  loading: boolean;
  error: string | null;
  selectedMovie: Movie | null;
  isModalOpen: boolean;
  isDetailModalOpen: boolean;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  totalMovies: number;
  
  // Related data
  actors: Actor[];
  gernes: Gerne[];
  versions: Version[];
  
  // Actions
  fetchMovies: (params?: MovieSearchParams) => Promise<void>;
  fetchRelatedData: () => Promise<void>;
  handleAddMovie: () => void;
  handleEditMovie: (movie: Movie) => void;
  handleViewDetail: (movie: Movie) => void;
  handleDeleteMovie: (id: number) => Promise<void>;
  handleSearch: (query: string) => void;
  handlePageChange: (page: number) => void;
  closeModal: () => void;
  closeDetailModal: () => void;
  refreshData: () => Promise<void>;
}

export const useMovieManagement = (): UseMovieManagementReturn => {
  // Movie state
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Search and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  
  // Related data
  const [actors, setActors] = useState<Actor[]>([]);
  const [gernes, setGernes] = useState<Gerne[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);

  // Fetch movies with pagination and filters
  const fetchMovies = useCallback(async (params: MovieSearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const searchParams: MovieSearchParams = {
        page: currentPage,
        limit: 10,
        search: searchQuery,
        ...params
      };

      const response = await MovieService.getAllMovies(searchParams);
      if (Array.isArray(response)) {
        setMovies(response);
        setTotalPages(1);
        setTotalMovies(response.length);
        setCurrentPage(1);
      } else {
        setMovies(response.data);
        setTotalPages(response.totalPages);
        setTotalMovies(response.total);
        setCurrentPage(response.page);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      // Fallback to demo data if API fails
      setMovies([
        {
          id: 1,
          name: 'Avengers: Endgame',
          content: 'Phim siêu anh hùng Marvel',
          director: 'Anthony Russo, Joe Russo',
          duration: 181,
          limited_age: '13+',
          trailer: 'https://youtube.com/watch?v=TcMBFSGVi1c',
          nation: 'Mỹ',
          from_date: new Date('2024-01-01'),
          to_date: new Date('2024-12-31'),
          production_company: 'Marvel Studios',
          thumbnail: 'https://via.placeholder.com/150x200/007cbc/ffffff?text=Avengers',
          banner: 'https://via.placeholder.com/800x200/007cbc/ffffff?text=Avengers+Banner',
          is_deleted: false,
        },
        {
          id: 2,
          name: 'Spider-Man: No Way Home',
          content: 'Phim Spider-Man mới nhất',
          director: 'Jon Watts',
          duration: 148,
          limited_age: '13+',
          trailer: 'https://youtube.com/watch?v=JfVOs4VSpmA',
          nation: 'Mỹ',
          from_date: new Date('2024-01-01'),
          to_date: new Date('2024-12-31'),
          production_company: 'Sony Pictures',
          thumbnail: 'https://via.placeholder.com/150x200/ff6b35/ffffff?text=Spider-Man',
          banner: 'https://via.placeholder.com/800x200/ff6b35/ffffff?text=Spider-Man+Banner',
          is_deleted: false,
        },
      ]);
      setTotalPages(1);
      setTotalMovies(2);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  // Fetch related data (actors, gernes, versions)
  const fetchRelatedData = useCallback(async () => {
    try {
      // Thử gọi từng API riêng lẻ để debug
      console.log('Fetching actors...');
      const actorsData = await ActorService.getAllActors();
      setActors(actorsData);
      
      console.log('Fetching gernes...');
      const gernesData = await GerneService.getAllGernes();
      setGernes(gernesData);
      
      console.log('Fetching vers  ions...');
      const versionsData = await VersionService.getAllVersions();
      setVersions(versionsData);
      
    } catch (err) {
      console.error('Error fetching related data:', err);
      
      // Set fallback data nếu API fail
      setActors([
        { id: 1, name: 'Robert Downey Jr.' },
        { id: 2, name: 'Chris Evans' },
        { id: 3, name: 'Tom Holland' }
      ]);
      setGernes([
        { id: 1, name: 'Hành động' },
        { id: 2, name: 'Viễn tưởng' },
        { id: 3, name: 'Phiêu lưu' }
      ]);
      
      setVersions([
        { id: 1, name: '2D' },
        { id: 2, name: '3D' },
        { id: 3, name: 'IMAX' }
      ]);
    }
  }, []);

  // Handle add movie
  const handleAddMovie = useCallback(() => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  }, []);

  // Handle edit movie
  const handleEditMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  // Handle view detail
  const handleViewDetail = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailModalOpen(true);
  }, []);

  // Handle delete movie
  const handleDeleteMovie = useCallback(async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phim này?')) {
      return;
    }

    try {
      await MovieService.deleteMovie(id);
      await fetchMovies(); // Refresh the list
    } catch (err) {
      console.error('Error deleting movie:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete movie');
    }
  }, [fetchMovies]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  // Close detail modal
  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedMovie(null);
  }, []);

  // Refresh data
  const refreshData = useCallback(async () => {
    await Promise.all([
      fetchMovies(),
      fetchRelatedData()
    ]);
  }, [fetchMovies, fetchRelatedData]);

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Fetch movies when search or page changes
  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery, fetchMovies]);

  return {
    // State
    movies,
    loading,
    error,
    selectedMovie,
    isModalOpen,
    isDetailModalOpen,
    searchQuery,
    currentPage,
    totalPages,
    totalMovies,
    
    // Related data
    actors,
    gernes,
    versions,
    
    // Actions
    fetchMovies,
    fetchRelatedData,
    handleAddMovie,
    handleEditMovie,
    handleViewDetail,
    handleDeleteMovie,
    handleSearch,
    handlePageChange,
    closeModal,
    closeDetailModal,
    refreshData,
  };
}; 