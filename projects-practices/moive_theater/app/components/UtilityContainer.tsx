import React from 'react';

interface UtilityContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function UtilityContainer({ children, className = '' }: UtilityContainerProps) {
  return (
    <div className={`flex flex-col items-center px-4 py-2 ${className}`}>{children}</div>
  );
} 