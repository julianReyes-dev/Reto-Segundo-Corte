import api from './api';

export const login = async (userId, password) => {
  try {
    const response = await api.post('/api/auth/login', { 
      userId, 
      password 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.token;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const validateToken = async (token) => {
  try {
    const response = await api.post('/api/auth/validate', null, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.valid;
  } catch (error) {
    return false;
  }
};

export const createUser = async (userId, password) => {
  try {
    const response = await api.post('/api/auth/create', { 
      userId, 
      password 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
