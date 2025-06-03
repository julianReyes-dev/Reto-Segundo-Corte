import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para añadir el token JWT a las cabeceras
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Para las rutas de employee, access-control y reporting
      if (
        config.url.startsWith('/employee') ||
        config.url.startsWith('/api/access') ||
        config.url.startsWith('/api/reports') ||
        config.url.startsWith('/prometheus') || // Si el acceso a Prometheus es a través del gateway y necesita token
        config.url.startsWith('/grafana') // Si el acceso a Grafana es a través del gateway y necesita token
      ) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;