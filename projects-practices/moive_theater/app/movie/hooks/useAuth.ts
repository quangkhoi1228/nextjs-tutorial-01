import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../services/movieService';
import axios from 'axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const storeToken = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuthenticated(true);
  };

  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    return storedToken;
  };

  const login = async () => {
    try {
      console.log('Attempting to login...');
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
          "sub": "12",
          "email": "abc@gmail.com",
          "name": "shu1",
          "picture": "string",
          "role_id":2
         
        });

      console.log('Login response:', response.data);
      storeToken(response.data.token.access_token);
      return response.data.token.access_token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAuthenticated(false);
  };

  
  useEffect(() => {
    const storedToken = getToken();
    console.log('Stored token:', storedToken ? `${storedToken.substring(0, 20)}...` : 'No token');
    setLoading(false);
  }, []);

  return { isAuthenticated, token, login, logout, loading };
};
