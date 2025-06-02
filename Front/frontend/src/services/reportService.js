import api from './api';

export const getEmployeesByDate = async (date) => {
  try {
    const response = await api.get('/api/reports/allemployeesbydate', {
      params: { date: date.toISOString().split('T')[0] }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getEmployeeByDateRange = async (employeeId, startDate, endDate) => {
  try {
    const response = await api.get('/api/reports/employeebydates', {
      params: {
        employeeId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};