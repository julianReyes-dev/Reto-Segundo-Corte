import React from 'react';
import { useParams } from 'react-router-dom';
import { useEmployee } from '../../contexts/EmployeeContext';
import { Box, Typography, Paper, Container } from '@mui/material';

const EmployeeView = () => {
  const { documentId } = useParams();
  const { employees } = useEmployee();
  const employee = employees.find(e => e.document === documentId);

  if (!employee) return <Typography>Empleado no encontrado</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Detalles del Empleado
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography><strong>Documento:</strong> {employee.document}</Typography>
          <Typography><strong>Nombre:</strong> {employee.firstname} {employee.lastname}</Typography>
          <Typography><strong>Email:</strong> {employee.email}</Typography>
          <Typography><strong>Teléfono:</strong> {employee.phone}</Typography>
          <Typography>
            <strong>Estado:</strong> {employee.status ? 'Activo' : 'Inactivo'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeView;