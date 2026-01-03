import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

const typeConfig = {
  incident: { icon: '⚠️', class: 'bg-danger-50 text-danger-700' },
  resource: { icon: '📦', class: 'bg-primary-50 text-primary-700' }
};

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const { data } = await api.get('/reports');
        setReports(data);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.type === filter);

  return (
    <div className="space-y-6 page-transition">
      <PageHeader 
        title="Reports" 
        subtitle="Incident and resource usage reports"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      >
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
          <button className="btn btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Report
          </button>
        </div>
      </PageHeader>

      <div className="flex flex-wrap gap-2">
        {['all', 'incident', 'resource'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === type
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200'
            }`}
          >
            {type === 'all' ? '📊 All Reports' : type === 'incident' ? '⚠️ Incidents' : '📦 Resources'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton h-6 w-3/4 mb-3" />
              <div className="skeleton h-4 w-1/2 mb-2" />
              <div className="skeleton h-4 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {filteredReports.map((report) => {
            const config = typeConfig[report.type] || typeConfig.incident;
            return (
              <article key={report._id} className="card-interactive group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`h-10 w-10 rounded-xl flex items-center justify-center text-lg ${config.class}`}>
                      {config.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition">
                        {report.title}
                      </h3>
                      <p className="text-sm text-slate-500 capitalize">{report.type} Report</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 line-clamp-2">{report.description}</p>
                
                {report.data && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(report.data).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="text-sm font-semibold text-slate-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{report.createdAt && new Date(report.createdAt).toLocaleDateString()}</span>
                  <button className="font-semibold text-primary-600 hover:text-primary-500">
                    View Details →
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {!loading && filteredReports.length === 0 && (
        <div className="card text-center py-12">
          <span className="text-4xl mb-4 block">📊</span>
          <p className="text-slate-500">No reports found for this filter</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
