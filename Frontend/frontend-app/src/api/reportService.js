import axiosInstance from './axiosInstance';

const API_URL = '/api/reports'; // Ruta base según API Gateway para reportes

export const getReportAllEmployeesByDate = async (date) => {
  // date debe ser YYYY-MM-DD
  const response = await axiosInstance.get(`${API_URL}/allemployeesbydate`, { params: { date } });
  return response.data;
};

export const getReportEmployeeByDateRange = async (employeeId, startDate, endDate) => {
  // startDate y endDate deben ser YYYY-MM-DD
  const response = await axiosInstance.get(`${API_URL}/employeebydates`, {
    params: { employeeId, startDate, endDate },
  });
  return response.data;
};