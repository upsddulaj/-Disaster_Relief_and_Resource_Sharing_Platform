import { useEffect, useState } from 'react';
import api from '../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      const { data } = await api.get('/reports');
      setReports(data);
    };
    loadReports();
  }, []);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Reports</h2>
        <p className="mt-2 text-sm text-slate-600">Incident and resource usage reports.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <article key={report._id} className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{report.title}</h3>
            <p className="text-sm text-slate-500">Type: {report.type}</p>
            <p className="mt-3 text-sm text-slate-600">{report.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Reports;
