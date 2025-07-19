import React from 'react';
import { X } from 'lucide-react';
import { Actor } from '../services/actorService';

interface ActorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  actor: Actor | null;
}

export default function ActorDetailModal({ isOpen, onClose, actor }: ActorDetailModalProps) {
  if (!isOpen || !actor) return null;

  const getStatusColor = () => {
    if (actor.is_deleted) return 'bg-red-100 text-red-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = () => {
    if (actor.is_deleted) return 'Đã xóa';
    return 'Đang hoạt động';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#23232a] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chi tiết diễn viên</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Ảnh đại diện */}
          <div className="flex-shrink-0 flex flex-col items-center md:w-1/3">
            <img
              src={actor.profile_image}
              alt={actor.name || 'Ảnh diễn viên'}
              className="w-40 h-40 object-cover rounded-full border mb-4"
              onError={e => {
                const target = e.currentTarget;
                if (!target.src.includes('placeholder.com')) {
                  target.src = 'https://via.placeholder.com/200x200/cccccc/666666?text=No+Image';
                }
              }}
            />
            <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          {/* Right: Thông tin */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{actor.name}</h3>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Nghệ danh: <span className="text-gray-800 dark:text-white">{actor.stage_name || '-'}</span></div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Giới tính: <span className="text-gray-800 dark:text-white capitalize">{actor.gender}</span></div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Ngày sinh: <span className="text-gray-800 dark:text-white">{actor.date_of_birth}</span></div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Quốc tịch: <span className="text-gray-800 dark:text-white">{actor.nationality}</span></div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Tiểu sử</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{actor.biography || 'Chưa có thông tin'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
