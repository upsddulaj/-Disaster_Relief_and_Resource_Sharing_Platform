import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleOptions = [
  { value: 'citizen', label: 'Affected Citizen', icon: '👤', description: 'Request help and receive updates' },
  { value: 'volunteer', label: 'Volunteer', icon: '🙋', description: 'Help with relief operations' },
  { value: 'organization', label: 'Relief Organization', icon: '🏢', description: 'Coordinate and provide resources' }
];

const Register = () => {
  const { register, setError, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'citizen'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center page-transition">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 text-white text-2xl font-bold shadow-lg mb-4">
            RH
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
          <p className="mt-2 text-sm text-slate-500">Join the relief network and make a difference</p>
        </div>

        <div className="card">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-danger-50 border border-danger-200 p-4 text-sm text-danger-700 animate-slide-up">
              <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="label">Full Name</label>
              <input
                className="input"
                name="name"
                type="text"
                placeholder="Alex Morgan"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                className="input"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                className="input"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <p className="mt-1.5 text-xs text-slate-400">Must be at least 8 characters</p>
            </div>

            <div>
              <label className="label">I am a...</label>
              <div className="grid gap-3 mt-2">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                      form.role === option.value
                        ? 'border-primary-500 bg-primary-50 ring-4 ring-primary-100'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={form.role === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{option.label}</p>
                      <p className="text-xs text-slate-500">{option.description}</p>
                    </div>
                    {form.role === option.value && (
                      <svg className="h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
