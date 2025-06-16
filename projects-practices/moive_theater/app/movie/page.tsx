'use client';
import AddnewButton from './components/AddnewButton';
import Pagination from './components/Pagination';
import SearchInput from './components/SearchInput';
import TableMovie from './components/TableMovie';
import Tilte from './components/Tilte';
import usePagination from './components/usePagination';
import UtilityContainer from './components/UtilityContainer';
function MoviePage() {
  const { currentPage, handlePrevious, handleNext } = usePagination();

  return (
    <section className='bg-white h-screen text-black'>
      <Tilte />
      <UtilityContainer>
        <div className='self-start'>
          <AddnewButton />
        </div>
        <div className='self-end'>
          <SearchInput />
        </div>
      </UtilityContainer>
      <TableMovie />
      <Pagination
        currentPage={currentPage}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </section>
  );
}
export default MoviePage;
