import React from 'react';
import { FaWheelchair } from 'react-icons/fa';

export default function Legend() {
  return (
    <div className="flex gap-4 mt-4">
      <div className="flex items-center"><span className="w-6 h-6 border bg-white mr-1" /> Available</div>
      <div className="flex items-center"><span className="w-6 h-6 border bg-gray-300 mr-1" /> Reserved</div>
      <div className="flex items-center"><span className="w-6 h-6 border bg-purple-600 mr-1" /> Selected</div>
      <div className="flex items-center"><span className="w-6 h-6 border bg-blue-200 mr-1 flex items-center justify-center"><FaWheelchair /></span> WheelChair</div>
      <div className="flex items-center"><span className="w-6 h-6 border bg-green-200 mr-1" /> Companion</div>
    </div>
  );
} 