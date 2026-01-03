import { Link } from 'react-router-dom';
import useAlerts from '../hooks/useAlerts';
import AlertBanner from '../components/AlertBanner';

const Home = () => {
  const alerts = useAlerts();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Disaster Relief & Resource Sharing Platform</h1>
        <p className="mt-3 text-slate-600">
          Coordinate disaster response, manage resources, and deliver relief faster with real-time insights.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white" to="/dashboard">
            Go to Dashboard
          </Link>
          <Link className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700" to="/disasters">
            View Disasters
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Live Alerts</h2>
          <div className="mt-4 space-y-3">
            {alerts.length === 0 ? (
              <p className="text-sm text-slate-500">No new alerts. Stay safe!</p>
            ) : (
              alerts.map((alert) => <AlertBanner key={alert._id || alert.title} alert={alert} />)
            )}
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Quick Access</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>• Track active disasters on the map.</li>
            <li>• Match resources with urgent requests.</li>
            <li>• Coordinate volunteers and assignments.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
