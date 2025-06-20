'use client';
import React from 'react';
import AddnewButton from './components/AddnewButton';
import Pagination from './components/Pagination';
import SearchInput from './components/SearchInput';
import TableMovie from './components/TableMovie';
import Tilte from './components/Tilte';
import usePagination from './components/usePagination';
import UtilityContainer from './components/UtilityContainer';
import MovieModal from './components/MovieModal';
import { useMovieManagement } from '../hooks/useMovieManagement';

function MoviePage() {
  const { currentPage, handlePrevious, handleNext } = usePagination();
  const {
    selectedMovie,
    isModalOpen,
    isDetailModalOpen,
    searchQuery,
    handleAddMovie,
    handleEditMovie,
    handleViewDetail,
    handleSearch,
    closeModal,
    closeDetailModal,
    refreshData,
  } = useMovieManagement();

  return (
    <section className='bg-white h-screen text-black overflow-y-auto'>
      <Tilte />
      <UtilityContainer>
        <div className='self-start'>
          <AddnewButton onClick={handleAddMovie} />
        </div>
        <div className='self-end'>
          <SearchInput 
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Tìm kiếm theo tên phim, đạo diễn, quốc gia..."
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
