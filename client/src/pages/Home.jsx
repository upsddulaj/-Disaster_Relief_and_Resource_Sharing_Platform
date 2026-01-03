import { Link } from 'react-router-dom';
import useAlerts from '../hooks/useAlerts';
import AlertBanner from '../components/AlertBanner';

const Home = () => {
  const alerts = useAlerts();

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-10 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Crisis coordination platform</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">
            Disaster Relief & Resource Sharing, streamlined.
          </h1>
          <p className="mt-4 text-blue-50">
            Coordinate response, match resources, and deliver updates with real-time visibility across agencies and
            volunteers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-blue-700" to="/dashboard">
              Go to Dashboard
            </Link>
            <Link
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white"
              to="/disasters"
            >
              View Disasters
            </Link>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Active Agencies', value: '48+', detail: 'Partner organizations onboarded' },
          { label: 'Volunteers Ready', value: '2,300+', detail: 'Verified responders on standby' },
          { label: 'Resources Tracked', value: '12k+', detail: 'Food, shelter, medical, transport' }
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold">Live Alerts</h2>
          <p className="mt-1 text-sm text-slate-500">Immediate broadcasts from relief coordinators.</p>
          <div className="mt-4 space-y-3">
            {alerts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                No new alerts. Stay safe!
              </div>
            ) : (
              alerts.map((alert) => <AlertBanner key={alert._id || alert.title} alert={alert} />)
            )}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold">Quick Access</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-lg bg-slate-50 px-4 py-3">Track active disasters on the map.</li>
            <li className="rounded-lg bg-slate-50 px-4 py-3">Match resources with urgent requests.</li>
            <li className="rounded-lg bg-slate-50 px-4 py-3">Coordinate volunteers and assignments.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
