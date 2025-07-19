import React from 'react';
import { FaWheelchair } from 'react-icons/fa';

interface SeatProps {
  seat: {
    id: string;
    seat_row: string;
    seat_column: string;
    type?: string;
    is_reserved?: boolean;
  };
  selected: boolean;
  onSelect: () => void;
}

export default function Seat({ seat, selected, onSelect }: SeatProps) {
  let color = 'bg-white border-gray-400';
  if (seat.is_reserved) color = 'bg-gray-300 border-gray-400';
  if (selected) color = 'bg-purple-600 border-purple-700 text-white';
  if (seat.type === 'wheelchair') color = 'bg-blue-200 border-blue-400';
  if (seat.type === 'companion') color = 'bg-green-200 border-green-400';

  return (
    <button
      className={`w-8 h-8 border rounded flex items-center justify-center mx-1 my-1 ${color}`}
      disabled={seat.is_reserved}
      onClick={onSelect}
      title={seat.id}
    >
      {seat.type === 'wheelchair' ? <FaWheelchair /> : seat.seat_column}
    </button>
  );
} 