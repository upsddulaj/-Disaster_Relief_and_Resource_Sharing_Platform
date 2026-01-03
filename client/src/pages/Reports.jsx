import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

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
      <PageHeader title="Reports" subtitle="Incident and resource usage reports.">
        <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
          Export PDF
        </button>
      </PageHeader>
      <section className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <article key={report._id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
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
