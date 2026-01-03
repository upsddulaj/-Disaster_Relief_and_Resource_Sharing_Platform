import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

const typeIcons = {
  food: '🍞',
  shelter: '🏠',
  medical: '🏥',
  transport: '🚗',
  other: '📦'
};

const statusConfig = {
  open: { class: 'badge-warning', icon: '⏳' },
  matched: { class: 'badge-info', icon: '🔗' },
  fulfilled: { class: 'badge-success', icon: '✅' }
};

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const { data } = await api.get('/requests');
        setRequests(data);
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  const openCount = requests.filter(r => r.status === 'open').length;

  return (
    <div className="space-y-6 page-transition">
      <PageHeader 
        title="Resource Requests" 
        subtitle="Track requests and their fulfillment status"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
      >
        <div className="flex items-center gap-3">
          {openCount > 0 && (
            <span className="badge badge-warning">
              {openCount} pending
            </span>
          )}
          <button className="btn btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Request
          </button>
        </div>
      </PageHeader>

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
          {requests.map((request) => (
            <article key={request._id} className="card-interactive group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{typeIcons[request.resourceType] || '📦'}</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 capitalize group-hover:text-primary-600 transition">
                      {request.resourceType} Request
                    </h3>
                    <p className="text-sm text-slate-500">Quantity: {request.quantity}</p>
                  </div>
                </div>
                <span className={`badge ${statusConfig[request.status]?.class || 'badge-info'}`}>
                  {statusConfig[request.status]?.icon} {request.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600 line-clamp-2">{request.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {request.createdAt && new Date(request.createdAt).toLocaleDateString()}
                </span>
                {request.status === 'open' && (
                  <button className="text-xs font-semibold text-primary-600 hover:text-primary-500">
                    Match Resource →
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {!loading && requests.length === 0 && (
        <div className="card text-center py-12">
          <span className="text-4xl mb-4 block">🆘</span>
          <p className="text-slate-500">No requests found</p>
          <button className="btn btn-primary mt-4">Create First Request</button>
        </div>
      )}
    </div>
  );
};

export default Requests;
