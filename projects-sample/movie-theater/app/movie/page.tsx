'use client';
import TableMovie from './components/TableMovie';
import Tilte from './components/Tilte';
function MoviePage() {
  return (
    <section className='bg-white h-screen text-black'>
      <Tilte />

      <TableMovie />
    </section>
  );
}
export default MoviePage;
