import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Login from './components/auth/Login';
import EmployeeList from './components/employees/EmployeeList';
import EmployeeForm from './components/employees/EmployeeForm';
import EmployeeView from './components/employees/EmployeeView';
import AccessControl from './components/access/AccessControl';
import DailyReport from './components/reports/DailyReport';
import EmployeeReport from './components/reports/EmployeeReport';
import Dashboard from './components/Dashboard';
//import MonitoringPanel from './components/MonitoringPanel';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/employees" element={
                  <PrivateRoute>
                    <EmployeeList />
                  </PrivateRoute>
                } />
                <Route path="/employees/new" element={
                  <PrivateRoute>
                    <EmployeeForm />
                  </PrivateRoute>
                } />
                <Route path="/employees/edit/:document" element={
                  <PrivateRoute>
                    <EmployeeForm />
                  </PrivateRoute>
                } />
                <Route path="/employees/view/:document" element={
                  <PrivateRoute>
                    <EmployeeView />
                  </PrivateRoute>
                } />
                <Route path="/access" element={
                  <PrivateRoute>
                    <AccessControl />
                  </PrivateRoute>
                } />
                <Route path="/reports/daily" element={
                  <PrivateRoute>
                    <DailyReport />
                  </PrivateRoute>
                } />
                <Route path="/reports/employee" element={
                  <PrivateRoute>
                    <EmployeeReport />
                  </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Box>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;