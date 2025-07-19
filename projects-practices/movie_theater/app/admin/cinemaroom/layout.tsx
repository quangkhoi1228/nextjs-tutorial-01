import React from 'react';
import ReactQueryProvider from './ReactQueryProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
} 