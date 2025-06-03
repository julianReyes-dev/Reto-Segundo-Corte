import axiosInstance from './axiosInstance';

const API_URL_COMMAND = '/api/access/command'; // Ruta base según API Gateway para comandos de acceso
// const API_URL_QUERY = '/api/access/query'; // Si necesitaras queries de acceso directas, no usadas para registro

export const registerCheckIn = async (employeeId) => {
  const response = await axiosInstance.post(`${API_URL_COMMAND}/check-in`, { employeeId });
  return response.data;
};

export const registerCheckOut = async (employeeId) => {
  const response = await axiosInstance.post(`${API_URL_COMMAND}/check-out`, { employeeId });
  return response.data;
};