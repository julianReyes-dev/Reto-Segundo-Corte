import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { 
  People as PeopleIcon, 
  DirectionsWalk as AccessIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon
} from '@mui/icons-material';
import api from '../services/api';
import { useEmployee } from '../contexts/EmployeeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { employees } = useEmployee();
  const [accessStats, setAccessStats] = useState({ today: 0, week: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const todayResponse = await api.get('/api/reports/allemployeesbydate', {
          params: { date: new Date().toISOString().split('T')[0] }
        });
        setAccessStats(prev => ({ ...prev, today: todayResponse.data.length }));
        
        // Obtener datos de la semana para el gráfico
        // (Implementación simplificada)
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const activeEmployees = employees.filter(e => e.status).length;
  const inactiveEmployees = employees.filter(e => !e.status).length;

  // Datos de ejemplo para el gráfico
  const chartData = [
    { name: 'Lun', accesses: 12 },
    { name: 'Mar', accesses: 19 },
    { name: 'Mié', accesses: 15 },
    { name: 'Jue', accesses: 8 },
    { name: 'Vie', accesses: 11 },
    { name: 'Sáb', accesses: 3 },
    { name: 'Dom', accesses: 0 }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Tarjeta de Empleados */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PeopleIcon color="primary" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6">
                Empleados
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {employees.length}
            </Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <ActiveIcon color="success" sx={{ mr: 0.5 }} />
                <Typography variant="body2">{activeEmployees} activos</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InactiveIcon color="error" sx={{ mr: 0.5 }} />
                <Typography variant="body2">{inactiveEmployees} inactivos</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Tarjeta de Accesos Hoy */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessIcon color="secondary" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6">
                Accesos Hoy
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {accessStats.today}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1 }}>
              Última actualización: {new Date().toLocaleTimeString()}
            </Typography>
          </Paper>
        </Grid>
        
        {/* Gráfico de accesos semanales */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Accesos esta semana
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accesses" fill="#8884d8" name="Accesos" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Últimos accesos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Últimos accesos registrados
            </Typography>
            <Box sx={{ height: 300, overflow: 'auto' }}>
              {/* Implementar tabla de últimos accesos */}
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 10 }}>
                (Implementación de tabla de últimos accesos)
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;