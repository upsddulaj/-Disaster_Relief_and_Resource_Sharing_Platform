import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

const severityConfig = {
  low: { class: 'badge-info', icon: '🟢' },
  medium: { class: 'badge-warning', icon: '🟡' },
  high: { class: 'badge-danger', icon: '🟠' },
  critical: { class: 'bg-danger-600 text-white', icon: '🔴' }
};

const statusConfig = {
  active: { class: 'status-dot-danger', label: 'Active' },
  contained: { class: 'status-dot-warning', label: 'Contained' },
  resolved: { class: 'status-dot-active', label: 'Resolved' }
};

const DisasterMap = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  useEffect(() => {
    const loadDisasters = async () => {
      try {
        const { data } = await api.get('/disasters');
        setDisasters(data);
      } finally {
        setLoading(false);
      }
    };
    loadDisasters();
  }, []);

  const activeCount = disasters.filter(d => d.status === 'active').length;

  return (
    <div className="space-y-6 page-transition">
      <PageHeader 
        title="Disaster Map" 
        subtitle="Real-time view of active disasters and affected areas"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        }
      >
        <div className="flex items-center gap-3">
          <span className="badge badge-danger">
            <span className="status-dot status-dot-danger mr-1" />
            {activeCount} Active
          </span>
          <span className="badge bg-warning-50 text-warning-700">
            <svg className="h-3 w-3 animate-pulse mr-1" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            Live Updates
          </span>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="card p-0 overflow-hidden">
          <div className="relative">
            <iframe
              title="OpenStreetMap"
              className="h-[400px] lg:h-[500px] w-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-125.0%2C32.0%2C-113.0%2C42.0&layer=mapnik"
            />
            <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-2 shadow-lg">
              <p className="text-xs font-medium text-slate-600">Viewing: Western United States</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          <h3 className="text-sm font-bold text-slate-900 sticky top-0 bg-slate-50 py-2">
            Disaster Events ({disasters.length})
          </h3>
          
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton h-5 w-3/4 mb-2" />
                <div className="skeleton h-4 w-1/2 mb-3" />
                <div className="skeleton h-4 w-full" />
              </div>
            ))
          ) : (
            disasters.map((disaster) => {
              const severity = severityConfig[disaster.severity] || severityConfig.medium;
              const status = statusConfig[disaster.status] || statusConfig.active;
              
              return (
                <article 
                  key={disaster._id} 
                  className={`card-interactive cursor-pointer ${
                    selectedDisaster === disaster._id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setSelectedDisaster(disaster._id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`status-dot ${status.class}`} />
                        <span className="text-xs font-medium text-slate-500">{status.label}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 truncate">{disaster.title}</h3>
                      <p className="text-sm text-slate-500">{disaster.type}</p>
                    </div>
                    <span className={`badge ${severity.class} flex-shrink-0`}>
                      {severity.icon} {disaster.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 line-clamp-2">{disaster.description}</p>
                  {disaster.location?.address && (
                    <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {disaster.location.address}
                    </p>
                  )}
                </article>
              );
            })
          )}

          {!loading && disasters.length === 0 && (
            <div className="card text-center py-8">
              <span className="text-3xl mb-2 block">✅</span>
              <p className="text-sm text-slate-500">No disasters reported</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisasterMap;
