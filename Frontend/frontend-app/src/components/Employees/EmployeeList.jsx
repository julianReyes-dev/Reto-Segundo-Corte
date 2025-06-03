import React from 'react';
import EmployeeListItem from './EmployeeListItem';

const EmployeeList = ({ employees, onEmployeeDisabled }) => {
  if (!employees || employees.length === 0) {
    return <p>No hay empleados registrados.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Documento</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Email</th>
          <th>Celular</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <EmployeeListItem key={employee.document} employee={employee} onEmployeeDisabled={onEmployeeDisabled} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;