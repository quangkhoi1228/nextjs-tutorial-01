'use client'
import React, { useState } from 'react';
import SeatMap from './components/SeatMap';
import Legend from './components/Legend';
import BookingSummary from './components/BookingSummary';

// Giả lập dữ liệu seats, thực tế lấy từ API
const mockSeats = [
  { id: 'A1', seat_row: 'A', seat_column: '1', type: 'normal', is_reserved: false },
  { id: 'A2', seat_row: 'A', seat_column: '2', type: 'normal', is_reserved: true },
  { id: 'A3', seat_row: 'A', seat_column: '3', type: 'wheelchair', is_reserved: false },
  { id: 'B1', seat_row: 'B', seat_column: '1', type: 'normal', is_reserved: false },
  { id: 'B2', seat_row: 'B', seat_column: '2', type: 'companion', is_reserved: false },
  { id: 'B3', seat_row: 'B', seat_column: '3', type: 'normal', is_reserved: false },
  // ... thêm các ghế khác nếu muốn
];

export default function SeatBookingPage() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSelect = (seat) => {
    if (seat.is_reserved) return;
    setSelectedSeats(prev =>
      prev.includes(seat.id)
        ? prev.filter(id => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const handleConfirm = () => {
    // Gửi selectedSeats lên BE để đặt vé
    alert('Đặt vé cho ghế: ' + selectedSeats.join(', '));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <SeatMap seats={mockSeats} selectedSeats={selectedSeats} onSelect={handleSelect} />
      <Legend />
      <BookingSummary selectedSeats={selectedSeats} price={70} onConfirm={handleConfirm} />
    </div>
  );
}
