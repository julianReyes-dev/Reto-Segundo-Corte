import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  //const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(credentials);
    if (!result.success) {
      setError(result.error || 'Credenciales incorrectas');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        marginTop: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <Typography component="h1" variant="h5">
          Sistema de Control de Acceso
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="ID de Usuario"
            name="userId"
            value={credentials.userId}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;