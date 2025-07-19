import React from 'react';
import { CinemaRoom, CinemaRoomDetailModalProps } from '../../types';
import { CINEMA_ROOM_STATUS } from '../../constants';

const CinemaRoomDetailModal: React.FC<CinemaRoomDetailModalProps> = ({ room, isOpen, onClose }) => {
  if (!isOpen || !room) return null;
  return (
    <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Đóng"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Chi tiết phòng chiếu</h2>
        <div className="mb-2">
          <span className="font-semibold">Tên phòng:</span> {room.cinema_room_name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Trạng thái:</span>{' '}
          {room.is_deleted ? (
            <span className="text-red-600 font-semibold">{CINEMA_ROOM_STATUS.DELETED}</span>
          ) : (
            <span className="text-green-600 font-semibold">{CINEMA_ROOM_STATUS.ACTIVE}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaRoomDetailModal;
