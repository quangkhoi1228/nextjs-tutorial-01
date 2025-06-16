"use client"
import { useState } from 'react'

export default function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }

  return { currentPage, handlePrevious, handleNext }
}