'use client';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useMovieManagement } from './hooks/useMovieManagement';
import AddnewButton from './components/AddnewButton';
import MovieModal from './components/MovieModal';
import Pagination from './components/Pagination';
import SearchInput from './components/SearchInput';
import TableMovie from './components/TableMovie';
import Tilte from './components/Tilte';
import usePagination from './components/usePagination';
import UtilityContainer from './components/UtilityContainer';
import AuthDebug from '../components/AuthDebug';

function MoviePage() {
  const { currentPage, handlePrevious, handleNext } = usePagination();
  const {
    selectedMovie,
    isModalOpen,
    searchQuery,
    handleAddMovie,
    handleSearch,
    closeModal,
    refreshData,
  } = useMovieManagement();

  const { isAuthenticated, login, loading } = useAuth();

  useEffect(() => {
    console.log('Auth status:', { isAuthenticated, loading });
    if (!isAuthenticated && !loading) {
      login();
    }
  }, [isAuthenticated, login, loading]);

  return (
    <section className='bg-white h-screen text-black overflow-y-auto'>
      <AuthDebug />
      <Tilte />
      <UtilityContainer>
        <div className='self-start'>
          <AddnewButton onClick={handleAddMovie} />
        </div>
        <div className='self-end'>
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Tìm kiếm theo tên phim, đạo diễn, quốc gia...'
          />
        </div>
      </UtilityContainer>

      <TableMovie />

      <Pagination
        currentPage={currentPage}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* Movie Modal */}
      <MovieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        movie={selectedMovie}
        onSuccess={refreshData}
      />
    </section>
  );
}

export default MoviePage;
