import axiosInstance from './axiosInstance';

const API_URL = '/employee'; // Ruta base según API Gateway para empleados

export const getAllEmployees = async () => {
  const response = await axiosInstance.get(`${API_URL}/findallemployees`);
  return response.data;
};

export const getEmployeeById = async (document) => {
  const response = await axiosInstance.get(`${API_URL}/findbyid`, { params: { document } });
  return response.data;
};

export const createEmployee = async (employeeData) => {
  // El endpoint es /employee/createemployee
  const response = await axiosInstance.post(`${API_URL}/createemployee`, employeeData);
  return response.data;
};

export const updateEmployee = async (employeeData) => {
  // El endpoint es /employee/updateemployee
  const response = await axiosInstance.post(`${API_URL}/updateemployee`, employeeData);
  return response.data;
};

export const disableEmployee = async (document) => {
  // El endpoint es /employee/disableemployee
  // El backend espera 'document' como @RequestParam
  const response = await axiosInstance.post(`${API_URL}/disableemployee`, null, { params: { document } });
  return response.data; // O response.status si no devuelve cuerpo
};