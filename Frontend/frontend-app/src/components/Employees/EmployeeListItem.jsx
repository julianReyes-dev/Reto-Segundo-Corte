import React from 'react';
import { useNavigate } from 'react-router-dom';
import { disableEmployee } from '../../api/employeeService'; // Asumiendo que la API devuelve algo o queremos manejar el éxito/error

const EmployeeListItem = ({ employee, onEmployeeDisabled }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/employees/edit/${employee.document}`);
  };

  const handleInactivate = async () => {
    if (window.confirm(`¿Está seguro de que desea inactivar al empleado ${employee.name} ${employee.apellidos}?`)) {
      try {
        await disableEmployee(employee.document);
        alert('Empleado inactivado con éxito.');
        onEmployeeDisabled(employee.document); // Callback para actualizar la lista en el padre
      } catch (error) {
        console.error('Error al inactivar empleado:', error);
        alert(`Error al inactivar empleado: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <tr>
      <td>{employee.document}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.status ? 'Activo' : 'Inactivo'}</td> {/* Asegúrate que el backend devuelva 'estado' como boolean */}
      <td className="actions">
        <button onClick={handleEdit} className="secondary">Editar</button>
        {employee.estado && ( // Solo mostrar si está activo
          <button onClick={handleInactivate} className="danger">Inactivar</button>
        )}
      </td>
    </tr>
  );
};

export default EmployeeListItem;