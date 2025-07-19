import React from 'react';
import { CinemaRoom, TableCinemaRoomProps } from '../types';

const TableCinemaRoom: React.FC<TableCinemaRoomProps> = ({ rooms, onEdit, onDetail, onSoftDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-[#23232a]">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-[#2d2d39]">
          <tr>
            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">Tên phòng</th>
            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">Trạng thái</th>
            <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-200">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-gray-400 dark:text-gray-500">Không có phòng chiếu nào.</td>
            </tr>
          ) : (
            rooms.map((room, idx) => (
              <tr
                key={room.id}
                className={`transition-colors ${idx % 2 === 0 ? 'bg-white dark:bg-[#23232a]' : 'bg-gray-50 dark:bg-[#282836]'} hover:bg-blue-50 dark:hover:bg-[#35354a]`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{room.cinema_room_name}</td>
                <td className="px-6 py-4">
                  {room.is_deleted ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 text-xs font-semibold">Đã xóa</span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 text-xs font-semibold">Đang hoạt động</span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2 flex flex-wrap items-center">
                  <button onClick={() => onDetail(room)} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Chi tiết</button>
                  <button onClick={() => onEdit(room)} className="text-yellow-600 dark:text-yellow-400 hover:underline font-semibold">Sửa</button>
                  {!room.is_deleted && (
                    <button onClick={() => onSoftDelete(room)} className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">Xóa mềm</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCinemaRoom;