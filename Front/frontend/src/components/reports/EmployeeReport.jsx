import React, { useState, useEffect } from 'react';
import { useEmployee } from '../../contexts/EmployeeContext';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  CircularProgress,
  Alert,
  TextField,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, isValid } from 'date-fns';
import { getEmployeeByDateRange } from '../../services/reportService';
import Autocomplete from '@mui/material/Autocomplete';

const EmployeeReport = () => {
  const { employees } = useEmployee();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    if (!selectedEmployee) return;
    
    setLoading(true);
    try {
      const data = await getEmployeeByDateRange(
        selectedEmployee.document,
        startDate,
        endDate
      );
      setReportData(data || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Error al obtener el reporte');
      setReportData([]);
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

  const chartData = reportData.map(item => ({
    date: format(parseISO(item.accessdatetime), 'PP'),
    duration: item.duration ? parseFloat(item.duration.split(' ')[0]) || 0 : 0
  }));

  useEffect(() => {
    if (selectedEmployee) {
      fetchReport();
    }
  }, [selectedEmployee, startDate, endDate]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reporte por Empleado
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', flexWrap: 'wrap' }}>
        <Autocomplete
          options={employees}
          getOptionLabel={(option) => `${option.firstname} ${option.lastname} (${option.document})`}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Seleccionar Empleado" />}
          value={selectedEmployee}
          onChange={(_, newValue) => setSelectedEmployee(newValue)}
        />
        
        <DatePicker
          label="Fecha Inicio"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        
        <DatePicker
          label="Fecha Fin"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        
        <Button
          variant="contained"
          onClick={fetchReport}
          disabled={!selectedEmployee || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Generar Reporte'}
        </Button>
      </Box>

      {selectedEmployee && reportData.length > 0 ? (
        <>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Horas trabajadas por día
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Horas', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="#8884d8" 
                  name="Horas trabajadas" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Detalle de Accesos
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Fecha</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Hora Entrada</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Hora Salida</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((record, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        {safeFormatDate(record.accessdatetime)}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        {record.accessdatetime ? format(parseISO(record.accessdatetime), 'pp') : 'N/A'}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        {safeFormatDate(record.exitdatetime)}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        {record.duration || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        </>
      ) : selectedEmployee ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No hay datos disponibles para el empleado y rango de fechas seleccionado
        </Typography>
      ) : null}
    </Container>
  );
};

export default EmployeeReport;