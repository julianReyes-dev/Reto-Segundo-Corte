import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Common/Navbar';
import ProtectedRoute from './components/Common/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import RegisterEmployeePage from './pages/RegisterEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import AccessManagementPage from './pages/AccessManagementPage';
import ReportsPage from './pages/ReportsPage';
import NotFoundPage from './pages/NotFoundPage';

// Componente para redirigir si ya está autenticado
const RedirectIfAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};


function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<RedirectIfAuth><LoginPage /></RedirectIfAuth>} />

        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeeManagementPage />} />
          <Route path="/employees/register" element={<RegisterEmployeePage />} />
          <Route path="/employees/edit/:employeeId" element={<EditEmployeePage />} />
          <Route path="/access" element={<AccessManagementPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        {/* Ruta para página no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;