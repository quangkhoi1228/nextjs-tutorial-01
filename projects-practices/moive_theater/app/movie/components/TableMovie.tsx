'use client';
import React from 'react';
import { Edit, Trash2, Eye, Calendar, Clock, Users, Info } from 'lucide-react';
import { Movie } from '../../services/movieService';
import MovieModal from './MovieModal';
import MovieDetailModal from './MovieDetailModal';
import { useMovieManagement } from '../../hooks/useMovieManagement';

export default function TableMovie() {
  const {
    movies,
    loading,
    error,
    selectedMovie,
    isModalOpen,
    isDetailModalOpen,
    searchQuery,
    currentPage,
    totalPages,
    totalMovies,
    handleAddMovie,
    handleEditMovie,
    handleViewDetail,
    handleDeleteMovie,
    handleSearch,
    handlePageChange,
    closeModal,
    closeDetailModal,
    refreshData,
  } = useMovieManagement();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="px-4 py-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">Lỗi: {error}</p>
          <button 
            onClick={refreshData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='px-4 py-6'>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên phim, đạo diễn, quốc gia..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Tổng số phim</p>
                <p className="text-2xl font-bold text-blue-600">{totalMovies}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Đang chiếu</p>
                <p className="text-2xl font-bold text-green-600">
                  {Array.isArray(movies) ? movies.filter(m => new Date(m.to_date) >= new Date()).length : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Sắp chiếu</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Array.isArray(movies) ? movies.filter(m => new Date(m.from_date) > new Date()).length : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Trash2 className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Đã xóa</p>
                <p className="text-2xl font-bold text-red-600">
                  {Array.isArray(movies) ? movies.filter(m => m.is_deleted).length : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className='table-auto w-full border-collapse'>
            <thead className='border-b-4 border-gray-300'>
              <tr>
                <th className='px-4 py-2 text-left font-bold'>Thumbnail</th>
                <th className='px-4 py-2 text-left font-bold'>Tên phim</th>
                <th className='px-4 py-2 text-left font-bold'>Đạo diễn</th>
                <th className='px-4 py-2 text-left font-bold'>Thời lượng</th>
                <th className='px-4 py-2 text-left font-bold'>Độ tuổi</th>
                <th className='px-4 py-2 text-left font-bold'>Quốc gia</th>
                <th className='px-4 py-2 text-left font-bold'>Ngày chiếu</th>
                <th className='px-4 py-2 text-left font-bold'>Trạng thái</th>
                <th className='px-4 py-2 text-left font-bold'>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(movies) && movies.map((movie) => (
                <tr
                  key={movie.id}
                  className='odd:bg-gray-100 even:bg-white border-b-2 border-gray-200 hover:bg-gray-50'
                >
                  <td className='px-4 py-2'>
                    <img
                      src={movie.thumbnail}
                      alt={movie.name}
                      className="w-16 h-20 object-cover rounded-md cursor-pointer"
                      onClick={() => handleViewDetail(movie)}
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64x80/cccccc/666666?text=No+Image';
                      }}
                    />
                  </td>
                  <td className='px-4 py-2'>
                    <div>
                      <div className="font-semibold text-gray-800">{movie.name}</div>
                      <div className="text-sm text-gray-600 truncate max-w-xs">
                        {movie.content}
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-2 text-gray-700'>{movie.director}</td>
                  <td className='px-4 py-2 text-gray-700'>{formatDuration(movie.duration)}</td>
                  <td className='px-4 py-2'>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {movie.limited_age || 'Tất cả'}
                    </span>
                  </td>
                  <td className='px-4 py-2 text-gray-700'>{movie.nation || 'N/A'}</td>
                  <td className='px-4 py-2'>
                    <div className="text-sm">
                      <div>Từ: {formatDate(movie.from_date)}</div>
                      <div>Đến: {formatDate(movie.to_date)}</div>
                    </div>
                  </td>
                  <td className='px-4 py-2'>
                    {movie.is_deleted ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        Đã xóa
                      </span>
                    ) : new Date(movie.to_date) < new Date() ? (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        Đã kết thúc
                      </span>
                    ) : new Date(movie.from_date) > new Date() ? (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        Sắp chiếu
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Đang chiếu
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-2'>
                    <div className="flex space-x-2">
                      <button
                        className='text-blue-600 hover:text-blue-800 cursor-pointer'
                        onClick={() => handleViewDetail(movie)}
                        title="Xem chi tiết"
                      >
                        <Info className='w-4 h-4' />
                      </button>
                      <button
                        className='text-blue-600 hover:text-blue-800 cursor-pointer'
                        onClick={() => handleEditMovie(movie)}
                        title="Chỉnh sửa"
                      >
                        <Edit className='w-4 h-4' />
                      </button>
                      <button
                        className='text-red-600 hover:text-red-800 cursor-pointer'
                        onClick={() => handleDeleteMovie(movie.id)}
                        title="Xóa"
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                      {movie.trailer && (
                        <a
                          href={movie.trailer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className='text-green-600 hover:text-green-800 cursor-pointer'
                          title="Xem trailer"
                        >
                          <Eye className='w-4 h-4' />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(!Array.isArray(movies) || movies.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? 'Không tìm thấy phim nào phù hợp' : 'Chưa có phim nào'}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Trước
              </button>
              <span className="px-3 py-2">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Movie Modal */}
      <MovieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        movie={selectedMovie}
        onSuccess={refreshData}
      />

      {/* Movie Detail Modal */}
      <MovieDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        movie={selectedMovie}
      />
    </>
  );
}
