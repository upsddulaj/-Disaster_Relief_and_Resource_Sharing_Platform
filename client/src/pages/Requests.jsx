import { useEffect, useState } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

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
      <PageHeader title="Resource Requests" subtitle="Track requests and their fulfillment status.">
        <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700">
          New request
        </button>
      </PageHeader>
      <section className="grid gap-4 md:grid-cols-2">
        {requests.map((request) => (
          <article key={request._id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
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
