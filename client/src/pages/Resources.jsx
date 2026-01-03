import { useEffect, useState } from 'react';
import api from '../services/api';

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const loadResources = async () => {
      const { data } = await api.get('/resources');
      setResources(data);
    };
    loadResources();
  }, []);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Resources</h2>
        <p className="mt-2 text-sm text-slate-600">View available resources and distribution status.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <article key={resource._id} className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{resource.title}</h3>
            <p className="text-sm text-slate-500">{resource.type} · {resource.quantity} {resource.unit}</p>
            <p className="mt-3 text-sm text-slate-600">{resource.description}</p>
            <p className="mt-3 text-xs text-slate-400">Status: {resource.status}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Resources;
