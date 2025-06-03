import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {isAuthenticated && (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/employees">Gestión Empleados</Link></li>
            <li><Link to="/access">Gestión Accesos</Link></li>
            <li><Link to="/reports">Reportes</Link></li>
            <li><a href={`${import.meta.env.VITE_API_BASE_URL}/swagger-ui.html`} target="_blank" rel="noopener noreferrer">Swagger API Docs</a></li>
            <li><a href={`http://localhost:9090`} target="_blank" rel="noopener noreferrer">Prometheus</a></li>
            <li><a href={`http://localhost:3005`} target="_blank" rel="noopener noreferrer">Grafana</a></li>
            <li><button onClick={handleLogout} className="secondary">Logout</button></li>
          </>
        )}
        {!isAuthenticated && (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;