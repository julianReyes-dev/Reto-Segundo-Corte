import React, { useState, useEffect } from 'react';
import { useEmployee } from '../../contexts/EmployeeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  FormControlLabel, 
  Checkbox,
  CircularProgress,
  Alert
} from '@mui/material';

const EmployeeForm = () => {
  const { 
    addEmployee, 
    editEmployee, 
    fetchEmployeeById, 
    loading, 
    error 
  } = useEmployee();
  const navigate = useNavigate();
  const { documentId } = useParams();
  const [formLoading, setFormLoading] = useState(false);
  
  const [employee, setEmployee] = useState({
    document: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: true
  });

  useEffect(() => {
    if (documentId) {
      const loadEmployee = async () => {
        setFormLoading(true);
        try {
          const employeeData = await fetchEmployeeById(documentId);
          setEmployee(employeeData);
        } finally {
          setFormLoading(false);
        }
      };
      loadEmployee();
    }
  }, [documentId, fetchEmployeeById]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      if (documentId) {
        await editEmployee(employee);
      } else {
        await addEmployee(employee);
      }
      navigate('/employees');
    } catch (err) {
      // El error ya es manejado por el contexto
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {documentId ? 'Editar Empleado' : 'Nuevo Empleado'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {!documentId && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Documento"
              name="document"
              value={employee.document}
              onChange={handleChange}
              disabled={formLoading}
              autoFocus
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            disabled={formLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Apellido"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            disabled={formLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={employee.email}
            onChange={handleChange}
            disabled={formLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Teléfono"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            disabled={formLoading}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="status"
                checked={employee.status}
                onChange={handleChange}
                color="primary"
                disabled={formLoading}
              />
            }
            label="Activo"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="button"
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => navigate('/employees')}
              disabled={formLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formLoading}
            >
              {formLoading ? <CircularProgress size={24} /> : 'Guardar'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EmployeeForm;
