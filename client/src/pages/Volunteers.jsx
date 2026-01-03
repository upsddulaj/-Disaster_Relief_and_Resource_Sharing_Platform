import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

const statusConfig = {
  available: { class: 'badge-success', dot: 'status-dot-active', label: 'Available' },
  busy: { class: 'badge-warning', dot: 'status-dot-warning', label: 'On Assignment' },
  offline: { class: 'badge-info', dot: '', label: 'Offline' }
};

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVolunteers = async () => {
      try {
        const { data } = await api.get('/volunteers');
        setVolunteers(data);
      } finally {
        setLoading(false);
      }
    };
    loadVolunteers();
  }, []);

  const availableCount = volunteers.filter(v => v.availabilityStatus === 'available').length;

  return (
    <div className="space-y-6 page-transition">
      <PageHeader 
        title="Volunteer Management" 
        subtitle="Review volunteer availability and skills"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
      >
        <div className="flex items-center gap-3">
          <span className="badge badge-success">
            <span className="status-dot status-dot-active mr-1" />
            {availableCount} available
          </span>
          <button className="btn btn-secondary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add Volunteer
          </button>
        </div>
      </PageHeader>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <div className="skeleton h-5 w-3/4 mb-2" />
                  <div className="skeleton h-4 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {volunteers.map((volunteer) => {
            const status = statusConfig[volunteer.availabilityStatus] || statusConfig.offline;
            return (
              <article key={volunteer._id} className="card-interactive group">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-sky-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
                      {volunteer.user?.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    {status.dot && (
                      <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${status.dot === 'status-dot-active' ? 'bg-success-500' : 'bg-warning-500'}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-primary-600 transition">
                      {volunteer.user?.name || 'Unknown'}
                    </h3>
                    <span className={`badge ${status.class} mt-1`}>
                      {status.label}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {volunteer.skills?.length > 0 ? (
                      volunteer.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">No skills listed</span>
                    )}
                  </div>
                </div>

                {volunteer.assignedDisasters?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      Assigned to {volunteer.assignedDisasters.length} disaster(s)
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}

      {!loading && volunteers.length === 0 && (
        <div className="card text-center py-12">
          <span className="text-4xl mb-4 block">🙋</span>
          <p className="text-slate-500">No volunteers registered yet</p>
        </div>
      )}
    </div>
  );
};

export default Volunteers;
