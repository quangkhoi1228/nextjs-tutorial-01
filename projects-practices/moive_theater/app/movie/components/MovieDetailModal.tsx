'use client';
import React from 'react';
import { X, Calendar, Clock, MapPin, Users, Film, Play } from 'lucide-react';
import { Movie } from '../services/movieService';

interface MovieDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

export default function MovieDetailModal({ isOpen, onClose, movie }: MovieDetailModalProps) {
  if (!isOpen || !movie) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStatusColor = () => {
    if (movie.is_deleted) return 'bg-red-100 text-red-800';
    if (new Date(movie.to_date) < new Date()) return 'bg-gray-100 text-gray-800';
    if (new Date(movie.from_date) > new Date()) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = () => {
    if (movie.is_deleted) return 'Đã xóa';
    const now = new Date();
    if (new Date(movie.to_date) < now) return 'Đã kết thúc';
    if (new Date(movie.from_date) > now) return 'Sắp chiếu';
    return 'Đang chiếu';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết phim</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Thumbnail */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Thumbnail</h3>
                <img
                  src={movie.thumbnail}
                  alt={movie.name}
                  className="w-full h-64 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x400/cccccc/666666?text=No+Image';
                  }}
                />
              </div>

              {/* Banner */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Banner</h3>
                <img
                  src={movie.banner}
                  alt={`${movie.name} banner`}
                  className="w-full h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x200/cccccc/666666?text=No+Banner';
                  }}
                />
              </div>

              {/* Trailer */}
              {movie.trailer && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Trailer</h3>
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Xem trailer
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Title and Status */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{movie.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Film className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Đạo diễn</p>
                    <p className="font-medium">{movie.director}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Thời lượng</p>
                    <p className="font-medium">{formatDuration(movie.duration)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Độ tuổi</p>
                    <p className="font-medium">{movie.limited_age || 'Tất cả'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Quốc gia</p>
                    <p className="font-medium">{movie.nation || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Production Company */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Công ty sản xuất</h3>
                <p className="text-gray-700">{movie.production_company}</p>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nội dung</h3>
                <p className="text-gray-700 leading-relaxed">{movie.content}</p>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Lịch chiếu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Từ ngày</p>
                      <p className="font-medium">{formatDate(movie.from_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Đến ngày</p>
                      <p className="font-medium">{formatDate(movie.to_date)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Actors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Diễn viên</h3>
                  {movie.actors && movie.actors.length > 0 ? (
                    <div className="space-y-1">
                      {movie.actors.map((actor) => (
                        <span
                          key={actor.id}
                          className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-1 mb-1"
                        >
                          {actor.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Chưa có thông tin</p>
                  )}
                </div>

                {/* Genres */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Thể loại</h3>
                  {movie.gernes && movie.gernes.length > 0 ? (
                    <div className="space-y-1">
                      {movie.gernes.map((genre) => (
                        <span
                          key={genre.id}
                          className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs mr-1 mb-1"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Chưa có thông tin</p>
                  )}
                </div>

                {/* Versions */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Phiên bản</h3>
                  {movie.versions && movie.versions.length > 0 ? (
                    <div className="space-y-1">
                      {movie.versions.map((version) => (
                        <span
                          key={version.id}
                          className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs mr-1 mb-1"
                        >
                          {version.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Chưa có thông tin</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
} 