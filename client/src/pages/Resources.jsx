import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

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
      <PageHeader title="Resources" subtitle="View available resources and distribution status.">
        <button className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
          Create resource
        </button>
      </PageHeader>
      <section className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <article key={resource._id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
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
