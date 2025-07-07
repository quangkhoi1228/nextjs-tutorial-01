'use client';

import MovieForm from '@/app/admin/movie/components/MovieForm1';
import MovieTable from '@/app/admin/movie/components/TableMovie1';
import {
  Actor,
  createMovie,
  Genre,
  getAllMovies,
  Movie,
  updateMovie,
  UpdateMovieDto,
  Version,
} from '@/app/admin/movie/services/movieService';
import AddnewButton from '@/app/components/AddnewButton';
import AdminNavbar from '@/app/components/AdminNavbar';
import SearchInput from '@/app/components/SearchInput';
import Toast from '@/app/components/Toast';
import UtilityContainer from '@/app/components/UtilityContainer';
import { handleApiError } from '@/app/utils/errorHandler';
import { useEffect, useRef, useState } from 'react';

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
  const [selectedMovie, setSelectedMovie] = useState<UpdateMovieDto | null>(
    null
  );
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    isVisible: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const movieName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
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
    setTimeout(() => {
      console.log('movieName.current: ', movieName.current);
      movieName.current?.scrollIntoView({ behavior: 'smooth' });
      movieName.current?.classList.add('border-red-500');
    }, 10);
  };

  useEffect(() => {
    console.log('movieName.current: ', movieName.current);
  }, [movieName]);

  const handleEditMovie = (movie: Movie) => {
    // Transform movie data for form display
    const formData: UpdateMovieDto = {
      ...movie,
      // Convert arrays of objects to arrays of IDs for form
      actors: movie.actors?.map((actor: Actor) => actor.id) || [],
      gernes: movie.gernes?.map((genre: Genre) => genre.id) || [],
      versions: movie.versions?.map((version: Version) => version.id) || [],
    };
    setSelectedMovie(formData);
    setIsModalOpen(true);
  };

  const handleSubmitMovie = async (data: UpdateMovieDto) => {
    console.log(data);
    try {
      setIsLoading(true);

      // Transform data to match server expectations
      const transformedData: UpdateMovieDto = {
        name: data.name,
        content: data.content,
        director: data.director,
        duration: +data.duration,
        nation: data.nation,
        is_deleted: data.is_deleted,
        from_date: data.from_date,
        to_date: data.to_date,
        trailer: data.trailer,
        limited_age: data.limited_age,
        production_company: data.production_company,
        thumbnail: data.thumbnail,
        banner: data.banner,
        actors: data.actors,
        gernes: data.gernes,
        versions: data.versions,
        // Removed actors, gernes, versions as server doesn't expect them
      };

      if (selectedMovie && selectedMovie.id) {
        // Editing existing movie
        transformedData.id = selectedMovie.id;
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

  useEffect(() => {
    console.log('trang web load lại', searchQuery);
  }, [searchQuery]);

  return (
    <>
      <AdminNavbar />
      <section className='p-4'>
        <UtilityContainer>
          <AddnewButton onClick={handleAddNew} />
          <div className='flex-1 flex justify-end'>
            <SearchInput
              className='max-w-xs '
              value={searchQuery}
              onChange={handleSearch}
              placeholder='Tìm kiếm theo tên phim...'
            />
          </div>
        </UtilityContainer>

        <MovieTable movies={filteredMovies} onEdit={handleEditMovie} />

        <MovieForm
          testRef={movieName}
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
