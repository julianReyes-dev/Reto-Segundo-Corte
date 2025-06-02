import React, { useState, useEffect } from 'react';
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, isValid } from 'date-fns';
import { getEmployeesByDate } from '../../services/reportService';

const DailyReport = () => {
  const [date, setDate] = useState(new Date());
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    setLoading(true);
    try {
      const data = await getEmployeesByDate(date);
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
    name: item.employeeID,
    duration: item.duration ? parseFloat(item.duration.split(' ')[0]) || 0 : 0
  }));

  useEffect(() => {
    fetchReport();
  }, [date]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reporte Diario de Accesos
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
        <DatePicker
          label="Seleccionar Fecha"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        
        <Button
          variant="contained"
          onClick={fetchReport}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Generar Reporte'}
        </Button>
      </Box>

      {reportData.length > 0 ? (
        <>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Horas por Empleado
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Horas', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#8884d8" name="Horas trabajadas" />
              </BarChart>
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
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Documento</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Hora Entrada</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Hora Salida</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((record, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{record.employeeID}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        {safeFormatDate(record.accessdatetime)}
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
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No hay datos disponibles para la fecha seleccionada
        </Typography>
      )}
    </Container>
  );
};

export default DailyReport;