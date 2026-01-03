import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';

const LoadingSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="card">
        <div className="skeleton h-4 w-24 mb-3" />
        <div className="skeleton h-8 w-16" />
      </div>
    ))}
  </div>
);

const RoleToolItem = ({ icon, text }) => (
  <li className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-all hover:bg-primary-50 hover:text-primary-700 cursor-pointer group">
    <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
    {text}
    <svg className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </li>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user && (user.role === 'admin' || user.role === 'organization')) {
      loadStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const roleTools = {
    admin: [
      { icon: '📊', text: 'Review analytics and system reports' },
      { icon: '🏢', text: 'Manage organizations and access control' },
      { icon: '⚙️', text: 'Configure system settings and alerts' },
      { icon: '👥', text: 'User management and permissions' }
    ],
    organization: [
      { icon: '🌊', text: 'Create disaster events and broadcast alerts' },
      { icon: '🔗', text: 'Match resources with incoming requests' },
      { icon: '📋', text: 'Assign volunteers to active disasters' },
      { icon: '📈', text: 'Generate response reports' }
    ],
    volunteer: [
      { icon: '✅', text: 'Update your availability and skills' },
      { icon: '📍', text: 'View assignments and event details' },
      { icon: '📱', text: 'Receive real-time notifications' },
      { icon: '🎓', text: 'Access training resources' }
    ],
    citizen: [
      { icon: '🆘', text: 'Submit resource requests' },
      { icon: '📍', text: 'Track nearby disaster updates' },
      { icon: '🔔', text: 'Subscribe to area alerts' },
      { icon: '📞', text: 'Emergency contact directory' }
    ]
  };

  return (
    <div className="space-y-6 page-transition">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Responder'}`}
        subtitle={`Logged in as ${user?.role || 'user'}`}
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        }
      >
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-success-50 to-emerald-50 px-4 py-2 text-xs font-semibold text-success-700 shadow-sm">
          <span className="status-dot status-dot-active" />
          System Operational
        </div>
      </PageHeader>

      {(user?.role === 'admin' || user?.role === 'organization') && (
        loading ? <LoadingSkeleton /> : stats && (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active Disasters" value={stats.activeDisasters} type="disasters" trend="+2 this week" trendUp={false} />
            <StatCard label="Resources" value={stats.resourceCount} type="resources" trend="+15%" trendUp={true} />
            <StatCard label="Requests" value={stats.requestCount} type="requests" trend="12 pending" />
            <StatCard label="Volunteers" value={stats.volunteerCount} type="volunteers" trend="+8 new" trendUp={true} />
          </section>
        )
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-sky-400 flex items-center justify-center text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Role-based Tools</h3>
              <p className="text-sm text-slate-500">Quick access to your capabilities</p>
            </div>
          </div>
          <ul className="space-y-2">
            {(roleTools[user?.role] || roleTools.citizen).map((tool) => (
              <RoleToolItem key={tool.text} {...tool} />
            ))}
          </ul>
        </section>

        <section className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-warning-500 to-orange-400 flex items-center justify-center text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
              <p className="text-sm text-slate-500">Latest updates in the system</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { time: '2 min ago', text: 'New resource request submitted', type: 'request' },
              { time: '15 min ago', text: 'Volunteer assigned to Coastal Flood', type: 'volunteer' },
              { time: '1 hour ago', text: 'Medical supplies delivered', type: 'resource' },
              { time: '3 hours ago', text: 'New alert broadcast sent', type: 'alert' }
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <span className={`status-dot ${activity.type === 'alert' ? 'status-dot-danger' : activity.type === 'volunteer' ? 'status-dot-active' : 'status-dot-warning'}`} />
                <span className="flex-1 text-slate-600">{activity.text}</span>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
