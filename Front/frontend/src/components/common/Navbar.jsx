import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Control de Acceso
        </Typography>
        {user && (
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;