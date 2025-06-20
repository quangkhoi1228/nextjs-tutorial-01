import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../services/movieService';
import axios from 'axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const storeToken = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      storeToken(storedToken);
    }
    return storedToken;
  };

  const login = async () => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      sub: '7b258394-48be-11f0-923c-a2aacf1a4b8c',
      email: 'user01@example.com',
      name: 'user01',
      picture: 'string',
    });

    storeToken(response.data.token.access_token);
  };

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated, token, login };
};
