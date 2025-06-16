import React from 'react'

export default function Pagination({
  currentPage,
  onPrevious,
  onNext,
}: {
  currentPage: number
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex justify-end mt-4 px-4">
      <button
        onClick={onPrevious}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
        disabled={currentPage === 1} // Disable "Previous" if on the first page
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-blue-500 text-white rounded-md">{currentPage}</span>
      <button
        onClick={onNext}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  )
}