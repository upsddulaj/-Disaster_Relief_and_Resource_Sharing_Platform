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
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">Create an account</h2>
      <p className="mt-2 text-sm text-slate-500">Join the relief network.</p>
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-lg border border-slate-200 px-4 py-2"
          name="name"
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-lg border border-slate-200 px-4 py-2"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-lg border border-slate-200 px-4 py-2"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select
          className="w-full rounded-lg border border-slate-200 px-4 py-2"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="citizen">Affected Citizen</option>
          <option value="volunteer">Volunteer</option>
          <option value="organization">Relief Organization</option>
        </select>
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
