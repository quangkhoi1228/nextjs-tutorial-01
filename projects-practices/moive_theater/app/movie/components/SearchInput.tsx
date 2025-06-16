import React from 'react';

export default function SearchInput() {
  return (
    <div className='m-4'>
      <span className='text-gray-500  px-4'>Search:</span>

      <input
        type='text'
        className='border border-gray-300 rounded-md p-2 w-2xs'
      />
    </div>
  );
}
