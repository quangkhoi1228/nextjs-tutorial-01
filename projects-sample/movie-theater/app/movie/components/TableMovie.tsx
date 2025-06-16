import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import axios from 'axios';
import Pagination from './Pagination';
import usePagination from './usePagination';
import UtilityContainer from './UtilityContainer';
import SearchInput from './SearchInput';
import AddnewButton from './AddnewButton';

export type DataType = {
  id: number;
  roomId: number;
  name: string;
  seats: number;
};

export default function TableMovie() {
  const [data, setData] = useState<DataType[]>([]);
  const { currentPage, handlePrevious, handleNext } = usePagination();
  const [search, setSearch] = useState('');
  // // Khi mới vào trang, load trang thì call API từ server
  // useEffect(
  //   () => {
  //     // logic được chạy của useEffect
  //     axios
  //       .get('/api/movie', {
  //         params: {
  //           currentPage: currentPage,
  //         },
  //       })
  //       .then((res) => {
  //         setData(res.data.data);
  //       });
  //   },

  //   [] // dependency trường hợp khi trang vừa khởi tạo (chỉ chạy 1 lần khi trang vừa khởi tạo)
  // );

  // Khi mới vào trang, load trang thì call API từ server
  useEffect(
    () => {
      // logic được chạy của useEffect
      axios
        .get('/api/movie', {
          params: {
            currentPage: currentPage,
            search: search,
          },
        })
        .then((res) => {
          setData(res.data.data);
        });
    },

    [currentPage, search] // dependency trường hợp trang cập nhật một số biến nào đó
  );

  const columns = [
    { key: 'id', label: '#' },
    { key: 'roomId', label: 'Cinema room ID' },
    { key: 'name', label: 'Cinema room' },
    { key: 'seats', label: 'Seat quantity' },
    { key: 'detail', label: 'Seat detail' },
  ];

  console.log('search', search);
  console.log('currentPage', currentPage);

  return (
    <>
      <UtilityContainer>
        <div className='self-start'>
          <AddnewButton />
        </div>
        <div className='self-end'>
          <SearchInput search={search} setSearch={setSearch} />
        </div>
      </UtilityContainer>
      <div className='px-4 py-6'>
        <table className='table-auto w-full border-collapse'>
          <thead className='  border-b-4 border-gray-300'>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className='px-4 py-2 text-left font-bold '>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className='odd:bg-gray-100 even:bg-white border-b-2 border-gray-200'
              >
                <td className='px-4 py-2'>{item.id}</td>
                <td className='px-4 py-2'>{item.roomId}</td>
                <td className='px-4 py-2'>{item.name}</td>
                <td className='px-4 py-2'>{item.seats}</td>
                <td className='px-4 py-2'>
                  <button
                    className='text-[#146db5] cursor-pointer flex items-center gap-2'
                    onClick={() => {
                      console.log('Seat detail');
                    }}
                  >
                    <div className='w-4 h-4 bg-[#146db5] rounded-full flex items-center justify-center'>
                      <Info className='w-4 h-4 text-white' />
                    </div>
                    <span>Seat detail</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}
