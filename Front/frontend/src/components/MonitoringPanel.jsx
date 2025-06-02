import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import api from '../services/api';

const MonitoringPanel = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // En un entorno real, estas llamadas irían al API Gateway que redirige a Prometheus
        const response = await api.get('/prometheus/metrics');
        // Procesar métricas importantes
        const processedMetrics = {
          memoryUsage: parseMetric(response.data, 'jvm_memory_used_bytes'),
          cpuUsage: parseMetric(response.data, 'system_cpu_usage'),
          httpRequests: parseMetric(response.data, 'http_server_requests_seconds_count')
        };
        setMetrics(processedMetrics);
      } catch (err) {
        setError('Error al cargar métricas');
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Actualizar cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  const parseMetric = (data, metricName) => {
    // Implementación simplificada para parsear métricas de Prometheus
    const lines = data.split('\n');
    const metricLine = lines.find(line => line.startsWith(metricName));
    if (!metricLine) return 'N/A';
    
    const value = metricLine.split(' ')[1];
    return parseFloat(value);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Monitoreo del Sistema
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : metrics ? (
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box>
            <Typography variant="subtitle1">Uso de Memoria</Typography>
            <Typography variant="h5">
              {metrics.memoryUsage ? `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)} MB` : 'N/A'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Uso de CPU</Typography>
            <Typography variant="h5">
              {metrics.cpuUsage ? `${(metrics.cpuUsage * 100).toFixed(2)}%` : 'N/A'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Solicitudes HTTP</Typography>
            <Typography variant="h5">
              {metrics.httpRequests || 'N/A'}
            </Typography>
          </Box>
        </Box>
      ) : null}
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          <a href="/grafana" target="_blank" rel="noopener noreferrer">
            Ver panel completo en Grafana
          </a>
        </Typography>
      </Box>
    </Paper>
  );
};

export default MonitoringPanel;