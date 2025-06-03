import React from 'react';

const ReportTable = ({ reportData }) => {
  if (!reportData || reportData.length === 0) {
    return <p>No hay datos para mostrar en el reporte.</p>;
  }

  // Función para calcular duración y formatearla
  const calculateDuration = (entryTime, exitTime) => {
    if (!entryTime || !exitTime) return 'N/A';
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    if (isNaN(entry.getTime()) || isNaN(exit.getTime()) || exit < entry) return 'N/A';

    let diff = exit.getTime() - entry.getTime(); // Diferencia en milisegundos

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  // Función para formatear solo la hora
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      const date = new Date(dateTimeString);
      if (isNaN(date.getTime())) return 'N/A'; // Verifica si la fecha es válida
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'N/A'; // En caso de error al parsear
    }
  };


  return (
    <table>
      <thead>
        <tr>
          <th>Documento Empleado</th>
          <th>Hora Entrada</th>
          <th>Hora Salida</th>
          <th>Duración</th>
          {/* Puedes añadir más columnas si tu DTO 'AccessReportDTO' las tiene */}
        </tr>
      </thead>
      <tbody>
        {reportData.map((record, index) => (
          <tr key={record.id || index}> {/* Usa un ID único si está disponible */}
            <td>{record.employeeId || record.documentoIdentidad || 'N/A'}</td>
            <td>{formatTime(record.entryTime || record.horaEntrada)}</td>
            <td>{formatTime(record.exitTime || record.horaSalida)}</td>
            <td>{calculateDuration(record.entryTime || record.horaEntrada, record.exitTime || record.horaSalida)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;