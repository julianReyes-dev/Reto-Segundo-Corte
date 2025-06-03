import React, { useState } from 'react';
import { getReportEmployeeByDateRange } from '../../api/reportService';
import ReportTable from './ReportTable';

const ReportByEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReportData([]);
    if (!employeeId.trim()) {
        setError("El ID del empleado es requerido.");
        setLoading(false);
        return;
    }
    try {
      const data = await getReportEmployeeByDateRange(employeeId, startDate, endDate);
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
      <h4>Reporte de Accesos por Empleado y Rango de Fechas</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reportEmployeeId">ID del Empleado (Documento):</label>
          <input
            type="text"
            id="reportEmployeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reportStartDate">Fecha de Inicio:</label>
          <input
            type="date"
            id="reportStartDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reportEndDate">Fecha de Fin:</label>
          <input
            type="date"
            id="reportEndDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
      {!loading && reportData.length === 0 && !error && <p>No se encontraron registros para los criterios seleccionados.</p>}
    </div>
  );
};

export default ReportByEmployee;