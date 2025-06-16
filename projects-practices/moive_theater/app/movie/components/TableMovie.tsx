import React from 'react';
import { Info } from 'lucide-react';

export default function TableMovie() {
  const data = [
    { id: 1, roomId: 1, name: 'Cinema room 1', seats: 60 },
    { id: 2, roomId: 2, name: 'Cinema room 2', seats: 60 },
    { id: 3, roomId: 3, name: 'Cinema room 3', seats: 60 },
    { id: 4, roomId: 4, name: 'Cinema room 4', seats: 60 },
    { id: 5, roomId: 5, name: 'Cinema room 5', seats: 60 },
    { id: 6, roomId: 6, name: 'Cinema room 6', seats: 60 },
  ];

  const columns = [
    { key: 'id', label: '#' },
    { key: 'roomId', label: 'Cinema room ID' },
    { key: 'name', label: 'Cinema room' },
    { key: 'seats', label: 'Seat quantity' },
    { key: 'detail', label: 'Seat detail' },
  ];

  return (
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
  );
}
