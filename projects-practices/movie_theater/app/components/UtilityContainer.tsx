import React from 'react';

interface UtilityContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function UtilityContainer({ children, className = '' }: UtilityContainerProps) {
  return (
    <div className={`flex  items-center  gap-x-10 mb-6  ${className}`}>{children}</div>
  );
} 