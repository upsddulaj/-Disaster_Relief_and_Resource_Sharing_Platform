import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user && (user.role === 'admin' || user.role === 'organization')) {
      loadStats();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <PageHeader title={`Welcome, ${user?.name || 'Responder'}`} subtitle={`Role: ${user?.role || ''}`}>
        <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
          Relief readiness score: 92%
        </div>
      </PageHeader>

      {(user?.role === 'admin' || user?.role === 'organization') && stats && (
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Active Disasters" value={stats.activeDisasters} />
          <StatCard label="Resources" value={stats.resourceCount} />
          <StatCard label="Requests" value={stats.requestCount} />
          <StatCard label="Volunteers" value={stats.volunteerCount} />
        </section>
      )}

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-lg font-semibold">Role-based tools</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {user?.role === 'admin' && (
            <>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Review analytics and system reports.</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Manage organizations and access control.</li>
            </>
          )}
          {user?.role === 'organization' && (
            <>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Create disaster events and broadcast alerts.</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Match resources with incoming requests.</li>
            </>
          )}
          {user?.role === 'volunteer' && (
            <>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Update your availability and skills.</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">View assignments and event details.</li>
            </>
          )}
          {user?.role === 'citizen' && (
            <>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Submit resource requests.</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Track nearby disaster updates.</li>
            </>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
