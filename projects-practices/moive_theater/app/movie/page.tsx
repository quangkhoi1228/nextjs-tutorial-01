"use client";
import React from 'react'
import AddnewButton from './components/AddnewButton'
import Tilte from './components/Tilte'
import UtilityContainer from './components/UtilityContainer'
import SearchInput from './components/SearchInput'
import TableMovie from './components/TableMovie'
import Pagination from './components/Pagination'
import TableMovie2 from './components/TableMovie2'
import usePagination from './components/usePagination'
function page() {
    const { currentPage, handlePrevious, handleNext } = usePagination()

   const data = [
    { id: 1, roomId: 1, name: 'Cinema room 1', seats: 60, detail:true},
    { id: 2, roomId: 2, name: 'Cinema room 2', seats: 60 , detail:true},
  ]

  const columns = [
    { key: 'id', label: '#' },
    { key: 'roomId', label: 'Cinema room ID' },
    { key: 'name', label: 'Cinema room' },
    { key: 'seats', label: 'Seat quantity' },
    { key: 'detail', label: 'Seat detail'}
  ]
  return (
    <section className="bg-white h-screen text-black">
      <Tilte />
      <UtilityContainer>
        <div className="self-start">
          <AddnewButton />
        </div>
        <div className="self-end">
          <SearchInput />
        </div>
      </UtilityContainer>
      <TableMovie2 data={data} columns={columns}/>
            <Pagination currentPage={currentPage} onPrevious={handlePrevious} onNext={handleNext} />

      
      </section>
  )
}
export default page