import React from 'react';
import Seat from './Seat';

interface SeatType {
  id: string;
  seat_row: string;
  seat_column: string;
  type?: string;
  is_reserved?: boolean;
}

interface SeatMapProps {
  seats: SeatType[];
  selectedSeats: string[];
  onSelect: (seat: SeatType) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, selectedSeats, onSelect }) => {
  // Group seats by row for display
  const rows = Array.from(new Set(seats.map((s: SeatType) => s.seat_row))).sort();
  const seatsByRow = rows.map(row => ({
    row,
    seats: seats.filter((s: SeatType) => s.seat_row === row).sort((a: SeatType, b: SeatType) => a.seat_column.localeCompare(b.seat_column)),
  }));

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-lg font-bold">Screen</div>
      <div className="w-full border-t-4 border-purple-500 mb-4" />
      <div>
        {seatsByRow.map(({ row, seats }) => (
          <div key={row as string} className="flex items-center mb-2">
            <span className="w-6 text-right mr-2">{row}</span>
            {seats.map((seat: SeatType) => (
              <Seat
                key={seat.id}
                seat={seat}
                selected={selectedSeats.includes(seat.id)}
                onSelect={() => onSelect(seat)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap; 