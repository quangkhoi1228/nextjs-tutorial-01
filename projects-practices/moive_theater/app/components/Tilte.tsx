import React from 'react';

interface TilteProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tilte({ children, className = '' }: TilteProps) {
  return (
    <div className={`text-xl font-bold text-center py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
} 