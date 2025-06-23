'use client';
import React from 'react';
import { useAuth } from '../movie/hooks/useAuth';

export default function AuthDebug() {
  const { isAuthenticated, token, login, logout, loading } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-2 text-sm">
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
        <div>Token: {token ? `${token.substring(0, 20)}...` : 'None'}</div>
        <div className="space-x-2">
          <button
            onClick={handleLogin}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            Login
          </button>
          <button
            onClick={logout}
            className="px-2 py-1 bg-red-500 text-white rounded text-xs"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 