import React from 'react';
import ReportByDate from '../components/Reports/ReportByDate';
import ReportByEmployee from '../components/Reports/ReportByEmployee';

const ReportsPage = () => {
  return (
    <div className="container">
      <h2>Generación de Reportes del Sistema</h2>
      <hr style={{margin: "20px 0"}}/>
      <ReportByDate />
      <hr style={{margin: "30px 0"}}/>
      <ReportByEmployee />
    </div>
  );
};

export default ReportsPage;