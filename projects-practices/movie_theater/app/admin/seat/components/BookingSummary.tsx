import React from 'react';

interface BookingSummaryProps {
  selectedSeats: string[];
  price: number;
  onConfirm: () => void;
}

export default function BookingSummary({ selectedSeats, price, onConfirm }: BookingSummaryProps) {
  return (
    <div className="flex justify-between items-center mt-4 p-4 border-t">
      <div>
        <span className="font-bold">Subtotal: </span>
        <span>{selectedSeats.length * price} SAR</span>
      </div>
      <button
        className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={selectedSeats.length === 0}
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  );
} 