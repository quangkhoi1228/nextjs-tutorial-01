import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
  totalPages?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  onPrevious,
  onNext,
  totalPages,
  className = '',
}: PaginationProps) {
  return (
    <div className={`flex justify-end mt-4 px-4 ${className}`}>
      <button
        onClick={onPrevious}
        className='px-4 py-2 border border-gray-300 rounded-l-md border-r-0 cursor-pointer text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent'
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className='px-4 py-2 bg-blue-500 text-white '>
        {currentPage}
        {typeof totalPages === 'number' ? ` / ${totalPages}` : ''}
      </span>
      <button
        onClick={onNext}
        className='px-4 py-2 border border-gray-300 border-l-0 rounded-r-md cursor-pointer text-gray-600 hover:bg-gray-100'
        disabled={typeof totalPages === 'number' && currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
} 