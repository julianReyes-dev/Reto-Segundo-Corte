import React, { useState } from 'react';
import { registerCheckIn, registerCheckOut } from '../../api/accessService';

const AccessRegistration = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAccess = async (type) => {
    setMessage('');
    setError('');
    if (!employeeId.trim()) {
      setError('Por favor, ingrese el ID del empleado.');
      return;
    }
    try {
      let responseMessage;
      if (type === 'check-in') {
        responseMessage = await registerCheckIn(employeeId);
      } else {
        responseMessage = await registerCheckOut(employeeId);
      }
      setMessage(responseMessage || `Registro de ${type === 'check-in' ? 'entrada' : 'salida'} exitoso.`);
      setEmployeeId(''); // Limpiar campo
    } catch (err) {
      setError(err.response?.data?.message || err.message || `Error al registrar ${type === 'check-in' ? 'entrada' : 'salida'}.`);
    }
  };

  return (
    <div>
      <h3>Registrar Acceso de Empleado</h3>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="employeeIdAccess">ID del Empleado (Documento):</label>
        <input
          type="text"
          id="employeeIdAccess"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Documento del empleado"
        />
      </div>
      <button onClick={() => handleAccess('check-in')} style={{ marginRight: '10px' }}>
        Registrar Entrada
      </button>
      <button onClick={() => handleAccess('check-out')} className="secondary">
        Registrar Salida
      </button>
    </div>
  );
};

export default AccessRegistration;