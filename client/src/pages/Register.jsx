import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, setError, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'citizen'
  });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-2xl font-semibold text-slate-900">Create an account</h2>
      <p className="mt-2 text-sm text-slate-500">Join the relief network.</p>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-xs font-medium text-slate-500">
          Full name
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
            name="name"
            type="text"
            placeholder="Alex Morgan"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block text-xs font-medium text-slate-500">
          Email
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block text-xs font-medium text-slate-500">
          Password
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block text-xs font-medium text-slate-500">
          Role
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="citizen">Affected Citizen</option>
            <option value="volunteer">Volunteer</option>
            <option value="organization">Relief Organization</option>
          </select>
        </label>
        <button
          className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
