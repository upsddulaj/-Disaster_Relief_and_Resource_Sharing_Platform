import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';

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
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
        <p className="mt-2 text-slate-600">Role: {user?.role}</p>
      </header>

      {(user?.role === 'admin' || user?.role === 'organization') && stats && (
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Active Disasters" value={stats.activeDisasters} />
          <StatCard label="Resources" value={stats.resourceCount} />
          <StatCard label="Requests" value={stats.requestCount} />
          <StatCard label="Volunteers" value={stats.volunteerCount} />
        </section>
      )}

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Role-based tools</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {user?.role === 'admin' && (
            <>
              <li>• Review analytics and system reports.</li>
              <li>• Manage organizations and access control.</li>
            </>
          )}
          {user?.role === 'organization' && (
            <>
              <li>• Create disaster events and broadcast alerts.</li>
              <li>• Match resources with incoming requests.</li>
            </>
          )}
          {user?.role === 'volunteer' && (
            <>
              <li>• Update your availability and skills.</li>
              <li>• View assignments and event details.</li>
            </>
          )}
          {user?.role === 'citizen' && (
            <>
              <li>• Submit resource requests.</li>
              <li>• Track nearby disaster updates.</li>
            </>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
