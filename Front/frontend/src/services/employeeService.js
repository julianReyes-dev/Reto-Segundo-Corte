import api from './api';

export const getEmployees = async () => {
  try {
    const response = await api.get('/employee/findallemployees');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getEmployeeById = async (document) => {
  try {
    const response = await api.get('/employee/findbyid', { params: { document } });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/employee/createemployee', employeeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateEmployee = async (employeeData) => {
  try {
    const response = await api.post('/employee/updateemployee', employeeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const disableEmployee = async (document) => {
  try {
    const response = await api.post('/employee/disableemployee', null, { 
      params: { document } 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};