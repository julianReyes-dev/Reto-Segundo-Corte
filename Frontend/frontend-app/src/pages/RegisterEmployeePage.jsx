import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/Employees/EmployeeForm';
import { createEmployee } from '../api/employeeService';

const RegisterEmployeePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (employeeData) => {
    // La lógica de manejo de error y éxito ya está en EmployeeForm
    // EmployeeForm ya llama a createEmployee con los datos
    await createEmployee(employeeData); // Puede que quieras manejar la redirección aquí después del éxito
    // Opcional: el EmployeeForm muestra mensaje de éxito. Si quieres redirigir:
    // setTimeout(() => navigate('/employees'), 1500); // Redirige después de un tiempo
  };

  return (
    <div className="container">
      <h2>Registrar Nuevo Empleado</h2>
      <EmployeeForm onSubmit={handleSubmit} isEditMode={false} />
      <button onClick={() => navigate('/employees')} className="secondary" style={{marginTop: '10px'}}>Volver a la Lista</button>
    </div>
  );
};

export default RegisterEmployeePage;