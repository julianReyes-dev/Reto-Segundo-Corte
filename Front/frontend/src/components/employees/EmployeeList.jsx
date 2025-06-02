import React, { useEffect } from 'react';
import { useEmployee } from '../../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { 
  DataGrid, 
  GridActionsCellItem, 
  GridToolbar 
} from '@mui/x-data-grid';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Chip,
  Alert
} from '@mui/material';
import { Edit, Visibility, Block } from '@mui/icons-material';

const EmployeeList = () => {
  const { 
    employees, 
    loading, 
    error, 
    fetchEmployees, 
    deactivateEmployee 
  } = useEmployee();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeactivate = async (document) => {
    try {
      await deactivateEmployee(document);
    } catch (err) {
      console.error('Error al desactivar empleado:', err);
    }
  };

  const columns = [
    { field: 'document', headerName: 'Documento', width: 150 },
    { field: 'firstname', headerName: 'Nombre', width: 150 },
    { field: 'lastname', headerName: 'Apellido', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Teléfono', width: 150 },
    { 
      field: 'status', 
      headerName: 'Estado', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value ? 'Activo' : 'Inactivo'} 
          color={params.value ? 'success' : 'error'} 
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="Ver"
          onClick={() => navigate(`/employees/view/${params.row.document}`)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Editar"
          onClick={() => navigate(`/employees/edit/${params.row.document}`)}
        />,
        params.row.status && (
          <GridActionsCellItem
            icon={<Block />}
            label="Desactivar"
            onClick={() => handleDeactivate(params.row.document)}
            showInMenu
          />
        )
      ].filter(Boolean)
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Gestión de Empleados</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/employees/new')}
        >
          Nuevo Empleado
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          getRowId={(row) => row.document}  // Esta línea soluciona el problema
        />
      </Box>
    </Container>
  );
};

export default EmployeeList;