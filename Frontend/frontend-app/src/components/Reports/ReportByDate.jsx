import React, { useState } from 'react';
import { getReportAllEmployeesByDate } from '../../api/reportService';
import ReportTable from './ReportTable';

const ReportByDate = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Fecha actual por defecto
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReportData([]);
    try {
      const data = await getReportAllEmployeesByDate(date);
      setReportData(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al generar el reporte.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Reporte de Empleados por Fecha</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reportDate">Seleccione Fecha:</label>
          <input
            type="date"
            id="reportDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generando...' : 'Generar Reporte'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Cargando reporte...</p>}
      {!loading && reportData.length > 0 && <ReportTable reportData={reportData} />}
      {!loading && reportData.length === 0 && !error && <p>No se encontraron registros para la fecha seleccionada.</p>}
    </div>
  );
};

export default ReportByDate;