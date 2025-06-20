'use client';
import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { Movie, CreateMovieDto, MovieService } from '../../services/movieService';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie?: Movie | null;
  onSuccess: () => void;
}

export default function MovieModal({ isOpen, onClose, movie, onSuccess }: MovieModalProps) {
  const [formData, setFormData] = useState<CreateMovieDto>({
    name: '',
    content: '',
    director: '',
    duration: 0,
    limited_age: '',
    trailer: '',
    nation: '',
    from_date: new Date(),
    to_date: new Date(),
    production_company: '',
    thumbnail: '',
    banner: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (movie) {
      setFormData({
        name: movie.name,
        content: movie.content,
        director: movie.director,
        duration: movie.duration,
        limited_age: movie.limited_age,
        trailer: movie.trailer || '',
        nation: movie.nation || '',
        from_date: new Date(movie.from_date),
        to_date: new Date(movie.to_date),
        production_company: movie.production_company,
        thumbnail: movie.thumbnail,
        banner: movie.banner,
      });
    } else {
      setFormData({
        name: '',
        content: '',
        director: '',
        duration: 0,
        limited_age: '',
        trailer: '',
        nation: '',
        from_date: new Date(),
        to_date: new Date(),
        production_company: '',
        thumbnail: '',
        banner: '',
      });
    }
    setErrors({});
  }, [movie, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Tên phim là bắt buộc';
    if (!formData.content.trim()) newErrors.content = 'Nội dung là bắt buộc';
    if (!formData.director.trim()) newErrors.director = 'Đạo diễn là bắt buộc';
    if (formData.duration <= 0) newErrors.duration = 'Thời lượng phải lớn hơn 0';
    if (!formData.production_company.trim()) newErrors.production_company = 'Công ty sản xuất là bắt buộc';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail là bắt buộc';
    if (!formData.banner.trim()) newErrors.banner = 'Banner là bắt buộc';
    if (formData.from_date >= formData.to_date) {
      newErrors.to_date = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (movie) {
        await MovieService.updateMovie(movie.id, formData);
      } else {
        await MovieService.createMovie(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving movie:', error);
      alert('Có lỗi xảy ra khi lưu phim');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateMovieDto, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {movie ? 'Chỉnh sửa phim' : 'Thêm phim mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên phim */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên phim *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập tên phim"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Đạo diễn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đạo diễn *
              </label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => handleInputChange('director', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.director ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập tên đạo diễn"
              />
              {errors.director && <p className="text-red-500 text-sm mt-1">{errors.director}</p>}
            </div>

            {/* Thời lượng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời lượng (phút) *
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập thời lượng"
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            {/* Độ tuổi giới hạn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Độ tuổi giới hạn
              </label>
              <input
                type="text"
                value={formData.limited_age}
                onChange={(e) => handleInputChange('limited_age', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="VD: 13+, 18+, T13"
              />
            </div>

            {/* Quốc gia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quốc gia
              </label>
              <input
                type="text"
                value={formData.nation}
                onChange={(e) => handleInputChange('nation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập quốc gia"
              />
            </div>

            {/* Công ty sản xuất */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Công ty sản xuất *
              </label>
              <input
                type="text"
                value={formData.production_company}
                onChange={(e) => handleInputChange('production_company', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.production_company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập công ty sản xuất"
              />
              {errors.production_company && <p className="text-red-500 text-sm mt-1">{errors.production_company}</p>}
            </div>

            {/* Ngày bắt đầu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày bắt đầu *
              </label>
              <input
                type="date"
                value={formData.from_date.toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('from_date', new Date(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Ngày kết thúc */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày kết thúc *
              </label>
              <input
                type="date"
                value={formData.to_date.toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('to_date', new Date(e.target.value))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.to_date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.to_date && <p className="text-red-500 text-sm mt-1">{errors.to_date}</p>}
            </div>

            {/* Trailer URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trailer URL
              </label>
              <input
                type="url"
                value={formData.trailer}
                onChange={(e) => handleInputChange('trailer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/..."
              />
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL *
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/thumbnail.jpg"
              />
              {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
            </div>

            {/* Banner URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner URL *
              </label>
              <input
                type="url"
                value={formData.banner}
                onChange={(e) => handleInputChange('banner', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.banner ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/banner.jpg"
              />
              {errors.banner && <p className="text-red-500 text-sm mt-1">{errors.banner}</p>}
            </div>
          </div>

          {/* Nội dung */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung phim *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập nội dung tóm tắt phim"
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          {/* Preview Images */}
          {(formData.thumbnail || formData.banner) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.thumbnail && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Thumbnail
                  </label>
                  <img
                    src={formData.thumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-32 object-cover rounded-md border"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
              )}
              {formData.banner && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Banner
                  </label>
                  <img
                    src={formData.banner}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded-md border"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {movie ? 'Cập nhật' : 'Thêm mới'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 