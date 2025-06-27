'use client';

import AddnewButton from '@/app/components/AddnewButton';
import SearchInput from '@/app/components/SearchInput';
import Tilte from '@/app/components/Tilte';
import UtilityContainer from '@/app/components/UtilityContainer';
import Toast from '@/app/components/Toast';
import MovieForm from '@/app/admin/movie/components/MovieForm1';
import MovieTable from '@/app/admin/movie/components/TableMovie1';
import { getAllMovies, Movie, createMovie, updateMovie } from '@/app/admin/movie/services/movieService';
import { handleApiError } from '@/app/utils/errorHandler';
import { useEffect, useState } from 'react';
import AdminNavbar from '@/app/components/AdminNavbar';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
}

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    isVisible: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const data = await getAllMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleAddNew = () => {
    setSelectedMovie(null); // tạo mới
    setIsModalOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    // Transform movie data for form display
    const formData = {
      ...movie,
      // Convert arrays of objects to arrays of IDs for form
      actors: Array.isArray(movie.actors) ? movie.actors.map((actor: any) => actor.id) : [],
      gernes: Array.isArray(movie.gernes) ? movie.gernes.map((genre: any) => genre.id) : [],
      versions: Array.isArray(movie.versions) ? movie.versions.map((version: any) => version.id) : []
    };
    setSelectedMovie(formData);
    setIsModalOpen(true);
  };

  const handleSubmitMovie = async (data: any) => {
    try {
      setIsLoading(true);
      
      // Transform data to match server expectations
      const transformedData = {
        name: data.name,
        content: data.content,
        director: data.director,
        duration: parseInt(data.duration, 10),
        nation: data.nation,
        is_deleted: data.is_deleted === 'true',
        from_date: data.from_date,
        to_date: data.to_date,
        trailer: data.trailer,
        limited_age: data.limited_age,
        production_company: data.production_company,
        thumbnail: data.thumbnail,
        banner: data.banner
        // Removed actors, gernes, versions as server doesn't expect them
      };

      if (selectedMovie && selectedMovie.id) {
        // Editing existing movie
        await updateMovie(selectedMovie.id, transformedData);
        showToast('Cập nhật phim thành công!', 'success');
      } else {
        // Creating new movie
        await createMovie(transformedData);
        showToast('Thêm phim mới thành công!', 'success');
      }
      
      await fetchMovies();
      setIsModalOpen(false);
      setSelectedMovie(null); // Reset selected movie after submit
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <section className="p-4">
    
        <UtilityContainer>
          <AddnewButton onClick={handleAddNew} />
          <div className="flex-1 flex justify-end">
            <SearchInput
              className="max-w-xs"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Tìm kiếm theo tên phim..."
            />
          </div>
        </UtilityContainer>

        <MovieTable movies={filteredMovies} onEdit={handleEditMovie} />

        <MovieForm
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitMovie}
          defaultValues={selectedMovie || {}}
          isLoading={isLoading}
        />

        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </section>
    </>
  );
}
