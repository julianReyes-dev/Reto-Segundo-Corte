import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, initialData = null, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    document: '',
    name: '',
    lastName: '', // Asegúrate que el DTO del backend espera 'lastName' o 'apellidos'
    email: '',
    phoneNumber: '', // Asegúrate que el DTO del backend espera 'phoneNumber' o 'numeroCelular'
    active: true, // El DTO del backend espera 'active' o 'estado'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        document: initialData.document || '',
        name: initialData.name || '',
        lastName: initialData.lastName || initialData.apellidos || '', // Adaptar al nombre del campo en DTO
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || initialData.numeroCelular || '', // Adaptar
        active: initialData.active !== undefined ? initialData.active : (initialData.estado !== undefined ? initialData.estado : true), // Adaptar
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Mapeo de campos si es necesario para el backend DTO
      const payload = {
        document: formData.document,
        firstName: formData.name,      // <--- CAMBIO AQUÍ (era name)
        lastName: formData.lastName,   // <--- CAMBIO AQUÍ (era apellidos, y asumiendo que formData.lastName es correcto)
        email: formData.email,
        phone: formData.phoneNumber, // <--- CAMBIO AQUÍ (era numeroCelular)
        status: formData.active,     // <--- CAMBIO AQUÍ (era estado)
      };
      if (isEditMode && initialData && initialData.id) { // Si el DTO de update necesita el ID del empleado
          payload.id = initialData.id; // O si el ID es el mismo 'document'
      }

      await onSubmit(payload); // Usar payload mapeado
      setSuccess(isEditMode ? 'Empleado actualizado con éxito.' : 'Empleado registrado con éxito.');
      if (!isEditMode) { // Limpiar formulario solo si no es edición
        setFormData({
          document: '', name: '', lastName: '', email: '', phoneNumber: '', active: true,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al procesar la solicitud.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div>
        <label htmlFor="document">Documento de Identidad:</label>
        <input
          type="text"
          id="document"
          name="document"
          value={formData.document}
          onChange={handleChange}
          required
          disabled={isEditMode} // Documento no editable
        />
      </div>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Apellidos:</label>
        <input
          type="text"
          id="lastName"
          name="lastName" // Frontend usa 'lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Número de Celular:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber" // Frontend usa 'phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="active">Estado Activo:</label>
        <input
          type="checkbox"
          id="active"
          name="active" // Frontend usa 'active'
          checked={formData.active}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{isEditMode ? 'Actualizar Empleado' : 'Registrar Empleado'}</button>
    </form>
  );
};

export default EmployeeForm;