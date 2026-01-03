import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

const DisasterMap = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    const loadDisasters = async () => {
      const { data } = await api.get('/disasters');
      setDisasters(data);
    };
    loadDisasters();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Disaster Map" subtitle="OpenStreetMap view of active disasters.">
        <span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
          Live updates every 60s
        </span>
      </PageHeader>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <iframe
          title="OpenStreetMap"
          className="h-80 w-full"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-125.0%2C32.0%2C-113.0%2C42.0&layer=mapnik"
        ></iframe>
      </div>
      <section className="grid gap-4 md:grid-cols-2">
        {disasters.map((disaster) => (
          <article key={disaster._id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h3 className="text-lg font-semibold">{disaster.title}</h3>
            <p className="text-sm text-slate-500">{disaster.type} · {disaster.severity}</p>
            <p className="mt-3 text-sm text-slate-600">{disaster.description}</p>
            <p className="mt-3 text-xs text-slate-400">Status: {disaster.status}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DisasterMap;
