import { Link } from 'react-router-dom';
import useAlerts from '../hooks/useAlerts';
import AlertBanner from '../components/AlertBanner';

const FeatureCard = ({ icon, title, description }) => (
  <div className="card-interactive text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-sky-400 text-white text-2xl shadow-lg">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm text-slate-500">{description}</p>
  </div>
);

const Home = () => {
  const alerts = useAlerts();

  return (
    <div className="space-y-12 page-transition">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-sky-500 p-8 md:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="badge bg-white/20 text-white backdrop-blur-sm">
            <span className="status-dot status-dot-active mr-1" />
            Live Crisis Platform
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">
            Disaster Relief & <span className="text-sky-200">Resource Sharing</span>
          </h1>
          <p className="mt-4 text-lg text-primary-100 leading-relaxed">
            Coordinate response efforts, match critical resources with urgent needs, and deliver real-time updates across agencies and volunteers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="btn bg-white text-primary-700 hover:bg-primary-50 shadow-lg" to="/dashboard">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Go to Dashboard
            </Link>
            <Link className="btn border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" to="/disasters">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              View Map
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 right-20 h-60 w-60 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute top-1/2 right-10 hidden lg:block">
          <div className="relative">
            <div className="h-64 w-64 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="h-4 w-20 bg-white/30 rounded mb-4" />
              <div className="h-3 w-full bg-white/20 rounded mb-2" />
              <div className="h-3 w-3/4 bg-white/20 rounded mb-4" />
              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="h-16 bg-white/20 rounded-lg" />
                <div className="h-16 bg-white/20 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Active Agencies', value: '48+', detail: 'Partner organizations onboarded', icon: '🏛️', color: 'from-primary-500 to-primary-600' },
          { label: 'Volunteers Ready', value: '2,300+', detail: 'Verified responders on standby', icon: '🙋', color: 'from-success-500 to-emerald-500' },
          { label: 'Resources Tracked', value: '12k+', detail: 'Food, shelter, medical, transport', icon: '📦', color: 'from-warning-500 to-orange-500' }
        ].map((item) => (
          <div key={item.label} className="card-interactive group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-2 text-4xl font-bold text-gradient">{item.value}</p>
                <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
              </div>
              <span className="text-3xl group-hover:scale-110 group-hover:animate-bounce-subtle transition-transform">
                {item.icon}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Alerts & Quick Access */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="status-dot status-dot-danger" />
                Live Alerts
              </h2>
              <p className="mt-1 text-sm text-slate-500">Immediate broadcasts from coordinators</p>
            </div>
            <span className="badge badge-danger">
              {alerts.length} Active
            </span>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {alerts.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-success-50 flex items-center justify-center text-success-500 mb-3">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-slate-500">No active alerts. All clear!</p>
              </div>
            ) : (
              alerts.map((alert) => <AlertBanner key={alert._id || alert.title} alert={alert} />)
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Access</h2>
          <ul className="space-y-3">
            {[
              { icon: '🗺️', text: 'Track active disasters on the map', to: '/disasters' },
              { icon: '🔗', text: 'Match resources with urgent requests', to: '/resources' },
              { icon: '👥', text: 'Coordinate volunteers and assignments', to: '/volunteers' }
            ].map((item) => (
              <li key={item.text}>
                <Link
                  to={item.to}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-all hover:bg-primary-50 hover:text-primary-700 hover:translate-x-1"
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.text}
                  <svg className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Built for Crisis Response</h2>
          <p className="mt-2 text-slate-500">Everything you need to coordinate disaster relief effectively</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon="📍" title="Real-time Mapping" description="Track disasters and resources on interactive maps" />
          <FeatureCard icon="🔔" title="Instant Alerts" description="Broadcast critical updates to all stakeholders" />
          <FeatureCard icon="🤝" title="Resource Matching" description="Connect supplies with those in need automatically" />
          <FeatureCard icon="📊" title="Analytics" description="Generate reports and track response metrics" />
        </div>
      </section>
    </div>
  );
};

export default Home;
