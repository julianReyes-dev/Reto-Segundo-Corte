import api from './api';

export const registerCheckIn = async (employeeId) => {
  try {
    const response = await api.post('/api/access/command/check-in', { employeeId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerCheckOut = async (employeeId) => {
  try {
    const response = await api.post('/api/access/command/check-out', { employeeId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAccessByDate = async (date) => {
  try {
    const response = await api.get('/api/access/query/date/' + date.toISOString().split('T')[0]);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAccessByEmployeeAndDateRange = async (employeeId, startDate, endDate) => {
  try {
    const response = await api.get(`/api/access/query/employee/${employeeId}/range`, {
      params: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};