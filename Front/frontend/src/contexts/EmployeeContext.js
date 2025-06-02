import { createContext, useContext, useState } from 'react';
import { 
  getEmployees, 
  getEmployeeById, 
  createEmployee, 
  updateEmployee, 
  disableEmployee 
} from '../services/employeeService';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar empleados');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeById = async (document) => {
    setLoading(true);
    try {
      const data = await getEmployeeById(document);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message || 'Error al cargar empleado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData) => {
    setLoading(true);
    try {
      const data = await createEmployee(employeeData);
      await fetchEmployees();
      return data;
    } catch (err) {
      setError(err.message || 'Error al crear empleado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editEmployee = async (employeeData) => {
    setLoading(true);
    try {
      const data = await updateEmployee(employeeData);
      await fetchEmployees();
      return data;
    } catch (err) {
      setError(err.message || 'Error al actualizar empleado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deactivateEmployee = async (document) => {
    setLoading(true);
    try {
      await disableEmployee(document);
      await fetchEmployees();
    } catch (err) {
      setError(err.message || 'Error al desactivar empleado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      loading,
      error,
      fetchEmployees,
      fetchEmployeeById,
      addEmployee,
      editEmployee,
      deactivateEmployee
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);