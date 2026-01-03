import { useEffect, useState } from 'react';
import api from '../services/api';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      const { data } = await api.get('/requests');
      setRequests(data);
    };
    loadRequests();
  }, []);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Resource Requests</h2>
        <p className="mt-2 text-sm text-slate-600">Track requests and their fulfillment status.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {requests.map((request) => (
          <article key={request._id} className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{request.resourceType}</h3>
            <p className="text-sm text-slate-500">Quantity: {request.quantity}</p>
            <p className="mt-3 text-sm text-slate-600">{request.description}</p>
            <p className="mt-3 text-xs text-slate-400">Status: {request.status}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Requests;
