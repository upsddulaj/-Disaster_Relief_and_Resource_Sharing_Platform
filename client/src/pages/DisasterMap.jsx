import { useEffect, useState } from 'react';
import api from '../services/api';

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
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Disaster Map</h2>
        <p className="mt-2 text-sm text-slate-600">OpenStreetMap view of active disasters.</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <iframe
            title="OpenStreetMap"
            className="h-80 w-full"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-125.0%2C32.0%2C-113.0%2C42.0&layer=mapnik"
          ></iframe>
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {disasters.map((disaster) => (
          <article key={disaster._id} className="rounded-xl bg-white p-6 shadow-sm">
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
