import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const loadVolunteers = async () => {
      const { data } = await api.get('/volunteers');
      setVolunteers(data);
    };
    loadVolunteers();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Volunteer Management" subtitle="Review volunteer availability and skills.">
        <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700">
          Add volunteer
        </button>
      </PageHeader>
      <section className="grid gap-4 md:grid-cols-2">
        {volunteers.map((volunteer) => (
          <article key={volunteer._id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h3 className="text-lg font-semibold">{volunteer.user?.name}</h3>
            <p className="text-sm text-slate-500">Status: {volunteer.availabilityStatus}</p>
            <p className="mt-3 text-sm text-slate-600">Skills: {volunteer.skills?.join(', ') || 'N/A'}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Volunteers;
