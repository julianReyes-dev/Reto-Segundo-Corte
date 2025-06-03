import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/Employees/EmployeeForm';
import { getEmployeeById, updateEmployee } from '../api/employeeService';

const EditEmployeePage = () => {
  const { employeeId } = useParams(); // 'employeeId' es el documento
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployeeData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getEmployeeById(employeeId);
      // Mapeo de datos del DTO del backend al formato esperado por EmployeeForm
      const formData = {
        document: data.document,
        name: data.name,
        lastName: data.apellidos, // Asumiendo que el backend envía 'apellidos'
        email: data.email,
        phoneNumber: data.numeroCelular, // Asumiendo que el backend envía 'numeroCelular'
        active: data.estado, // Asumiendo que el backend envía 'estado'
        id: data.id // Si el DTO de empleado tiene un 'id' numérico además del 'document'
      };
      setEmployee(formData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || `Error al cargar datos del empleado ${employeeId}.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]);

  const handleSubmit = async (employeeData) => {
    // employeeData ya viene mapeado desde EmployeeForm
    // Asegurarse de que 'document' esté presente si el backend lo necesita para identificar,
    // aunque el endpoint de updateEmployee podría usar un ID interno.
    // El DTO de updateEmployee en el backend determinará los campos exactos.
    // El payload en EmployeeForm ya se encarga de enviar 'apellidos', 'numeroCelular', 'estado'.
    await updateEmployee(employeeData);
    // El mensaje de éxito ya lo maneja EmployeeForm.
    // Opcional: redirigir después de un tiempo
    // setTimeout(() => navigate('/employees'), 1500);
  };

  if (loading) return <div className="container"><p>Cargando datos del empleado...</p></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;
  if (!employee) return <div className="container"><p>Empleado no encontrado.</p></div>;

  return (
    <div className="container">
      <h2>Editar Empleado</h2>
      <EmployeeForm onSubmit={handleSubmit} initialData={employee} isEditMode={true} />
      <button onClick={() => navigate('/employees')} className="secondary" style={{marginTop: '10px'}}>Volver a la Lista</button>
    </div>
  );
};

export default EditEmployeePage;