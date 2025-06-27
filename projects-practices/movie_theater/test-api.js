const axios = require('axios');

const API_BASE_URL = 'https://benestjs-production.up.railway.app';

async function testAPI() {
  try {
    console.log('Testing API...');
    
    // Test login
    console.log('\n1. Testing login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      sub: '7b258394-48be-11f0-923c-a2aacf1a4b8c',
      email: 'user01@example.com',
      name: 'user01',
      picture: 'string',
    });
    
    console.log('Login successful:', loginResponse.data);
    const token = loginResponse.data.token.access_token;
    
    // Test get movies
    console.log('\n2. Testing get movies...');
    const moviesResponse = await axios.get(`${API_BASE_URL}/movies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Get movies successful:', moviesResponse.data);
    
    // Test create movie
    console.log('\n3. Testing create movie...');
    const movieData = {
      name: 'Test Movie API',
      content: 'This is a test movie created via API',
      director: 'Test Director',
      duration: 120,
      limited_age: '13+',
      trailer: 'https://youtube.com/watch?v=test',
      nation: 'Vietnam',
      from_date: '2024-01-01',
      to_date: '2024-12-31',
      production_company: 'Test Company',
      thumbnail: 'https://example.com/thumbnail.jpg',
      banner: 'https://example.com/banner.jpg'
    };
    
    const createResponse = await axios.post(`${API_BASE_URL}/movies`, movieData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Create movie successful:', createResponse.data);
    
  } catch (error) {
    console.error('API Test Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });
  }
}

testAPI(); 