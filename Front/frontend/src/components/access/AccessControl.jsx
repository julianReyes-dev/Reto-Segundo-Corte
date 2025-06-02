import React, { useState, useEffect } from 'react';
import { useEmployee } from '../../contexts/EmployeeContext';
import { 
  registerCheckIn, 
  registerCheckOut,
  getAccessByDate
} from '../../services/accessService';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Autocomplete,
  Alert,
  CircularProgress
} from '@mui/material';
import { Login as CheckIn, Logout as CheckOut } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO, isValid } from 'date-fns';

const AccessControl = () => {
  const { employees } = useEmployee();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [date, setDate] = useState(new Date());
  const [accessRecords, setAccessRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAccessRecords = async () => {
    setLoading(true);
    try {
      const records = await getAccessByDate(date);
      setAccessRecords(records || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Error al cargar registros');
      setAccessRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedEmployee) return;
    
    setLoading(true);
    try {
      await registerCheckIn(selectedEmployee.document);
      await fetchAccessRecords();
    } catch (err) {
      setError(err.message || 'Error al registrar entrada');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!selectedEmployee) return;
    
    setLoading(true);
    try {
      await registerCheckOut(selectedEmployee.document);
      await fetchAccessRecords();
    } catch (err) {
      setError(err.message || 'Error al registrar salida');
    } finally {
      setLoading(false);
    }
  };

  const safeFormatDate = (dateString) => {
    if (!dateString) return 'No registrada';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'PPpp') : 'Formato inválido';
    } catch {
      return 'Formato inválido';
    }
  };

  useEffect(() => {
    fetchAccessRecords();
  }, [date]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Control de Accesos
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
        <Autocomplete
          options={employees.filter(e => e.status)}
          getOptionLabel={(option) => `${option.firstname} ${option.lastname} (${option.document})`}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Seleccionar Empleado" />}
          value={selectedEmployee}
          onChange={(_, newValue) => setSelectedEmployee(newValue)}
        />
        
        <DatePicker
          label="Fecha"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIn />}
          onClick={handleCheckIn}
          disabled={!selectedEmployee || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Registrar Entrada'}
        </Button>
        
        <Button
          variant="contained"
          color="error"
          startIcon={<CheckOut />}
          onClick={handleCheckOut}
          disabled={!selectedEmployee || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Registrar Salida'}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Registros de Acceso
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Hora Entrada</TableCell>
              <TableCell>Hora Salida</TableCell>
              <TableCell>Duración</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accessRecords.map((record, index) => {
              const employee = employees.find(e => e.document === record.employeeID);
              return (
                <TableRow key={`${record.employeeID}-${index}`}>
                  <TableCell>{record.employeeID}</TableCell>
                  <TableCell>
                    {employee ? `${employee.firstname} ${employee.lastname}` : 'N/A'}
                  </TableCell>
                  <TableCell>{safeFormatDate(record.accessdatetime)}</TableCell>
                  <TableCell>{safeFormatDate(record.exitdatetime)}</TableCell>
                  <TableCell>{record.duration || 'N/A'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AccessControl;