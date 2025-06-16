import React from 'react';

export default function SearchInput({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <div className='m-4'>
      <span className='text-gray-500  px-4'>Search:</span>

      <input
        type='text'
        className='border border-gray-300 rounded-md p-2 w-2xs'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
