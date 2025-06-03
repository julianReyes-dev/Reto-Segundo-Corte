import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/Employees/EmployeeList';
import { getAllEmployees } from '../api/employeeService';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllEmployees();
      // Asegurarse que los datos del backend coinciden con lo esperado por EmployeeListItem
      // Por ejemplo, si el backend devuelve 'nombreCompleto' en vez de 'name' y 'apellidos'
      // o 'status' en vez de 'estado', necesitarás mapearlos aquí o en el servicio.
      // Para este ejemplo, se asume que los nombres de campo son:
      // document, name, apellidos, email, numeroCelular, estado (boolean)
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al cargar empleados.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleEmployeeDisabled = (disabledEmployeeDocument) => {
    // Actualiza el estado del empleado en la lista o vuelve a cargarla
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.document === disabledEmployeeDocument ? { ...emp, estado: false } : emp
      )
    );
    // Opcionalmente, podrías llamar a fetchEmployees() de nuevo, pero actualizar localmente es más eficiente.
  };


  if (loading) return <div className="container"><p>Cargando empleados...</p></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;

  return (
    <div className="container">
      <div className="page-header">
        <h2>Gestión de Empleados</h2>
        <button onClick={() => navigate('/employees/register')}>Registrar Nuevo Empleado</button>
      </div>
      <EmployeeList employees={employees} onEmployeeDisabled={handleEmployeeDisabled} />
    </div>
  );
};

export default EmployeeManagementPage;