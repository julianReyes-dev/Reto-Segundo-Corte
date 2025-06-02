import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:8085';

const api = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Importante para CORS con credenciales
});

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.startsWith('/api/auth') && 
      !config.url.startsWith('/prometheus') && 
      !config.url.startsWith('/grafana') &&
      !config.url.startsWith('/swagger-ui.html')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
