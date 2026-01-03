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

const statusColors = {
  available: 'badge-success',
  allocated: 'badge-warning',
  delivered: 'badge-info'
};

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadResources = async () => {
      try {
        const { data } = await api.get('/resources');
        setResources(data);
      } finally {
        setLoading(false);
      }
    };
    loadResources();
  }, []);

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(r => r.type === filter);

  return (
    <div className="space-y-6 page-transition">
      <PageHeader 
        title="Resources" 
        subtitle="View available resources and distribution status"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        }
      >
        <button className="btn btn-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Resource
        </button>
      </PageHeader>

      <div className="flex flex-wrap gap-2">
        {['all', 'food', 'shelter', 'medical', 'transport', 'other'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === type
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200'
            }`}
          >
            {type === 'all' ? '📋 All' : `${typeIcons[type]} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
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
          {filteredResources.map((resource) => (
            <article key={resource._id} className="card-interactive group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{typeIcons[resource.type] || '📦'}</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition">{resource.title}</h3>
                    <p className="text-sm text-slate-500 capitalize">{resource.type} · {resource.quantity} {resource.unit}</p>
                  </div>
                </div>
                <span className={`badge ${statusColors[resource.status] || 'badge-info'}`}>
                  {resource.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600 line-clamp-2">{resource.description}</p>
              {resource.location?.address && (
                <p className="mt-3 text-xs text-slate-400 flex items-center gap-1">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {resource.location.address}
                </p>
              )}
            </article>
          ))}
        </section>
      )}

      {!loading && filteredResources.length === 0 && (
        <div className="card text-center py-12">
          <span className="text-4xl mb-4 block">📦</span>
          <p className="text-slate-500">No resources found for this filter</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
