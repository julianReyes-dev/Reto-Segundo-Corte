import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que buscas no existe o ha sido movida.</p>
      <Link to="/">Volver al Dashboard</Link>
    </div>
  );
};

export default NotFoundPage;