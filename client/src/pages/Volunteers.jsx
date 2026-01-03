import { useEffect, useState } from 'react';
import api from '../services/api';

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
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Volunteer Management</h2>
        <p className="mt-2 text-sm text-slate-600">Review volunteer availability and skills.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {volunteers.map((volunteer) => (
          <article key={volunteer._id} className="rounded-xl bg-white p-6 shadow-sm">
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
