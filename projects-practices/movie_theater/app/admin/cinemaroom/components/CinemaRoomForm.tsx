import React, { useState, useEffect } from 'react';
import { CinemaRoom, CinemaRoomFormProps } from '../types';
import { formatRoomName } from '../utils';

const CinemaRoomForm: React.FC<CinemaRoomFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.cinema_room_name || '');

  useEffect(() => {
    setName(initialData?.cinema_room_name || '');
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ cinema_room_name: formatRoomName(name) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 dark:bg-[#23232a] p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{initialData ? 'Chỉnh sửa phòng chiếu' : 'Thêm phòng chiếu mới'}</h2>
      <div>
        <label htmlFor="cinema-room-name" className="block font-medium mb-2 text-gray-700 dark:text-gray-200">Tên phòng chiếu</label>
        <input
          id="cinema-room-name"
          className="border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full bg-gray-50 dark:bg-[#282836] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tên phòng chiếu"
          required
        />
      </div>
      <div className="flex space-x-2 justify-end">
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold transition">Lưu</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-5 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none font-semibold transition">Huỷ</button>
      </div>
    </form>
  );
};

export default CinemaRoomForm;