import React from 'react';
import AccessRegistration from '../components/Access/AccessRegistration';

const AccessManagementPage = () => {
  return (
    <div className="container">
      <h2>Gestión de Accesos a Instalaciones</h2>
      <AccessRegistration />
      {/* Aquí podríamo añadir en el futuro una lista de los últimos accesos, si es necesario */}
    </div>
  );
};

export default AccessManagementPage;