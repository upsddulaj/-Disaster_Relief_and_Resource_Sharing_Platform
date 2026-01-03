import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const navLinkClass = ({ isActive }) =>
  `relative text-sm font-medium transition-all duration-200 py-2 ${
    isActive
      ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600 after:rounded-full'
      : 'text-slate-600 hover:text-slate-900'
  }`;

const MobileMenuIcon = ({ open }) => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/disasters', label: 'Disasters', icon: '🌊' },
    { to: '/resources', label: 'Resources', icon: '📦' },
    { to: '/requests', label: 'Requests', icon: '🆘' },
    { to: '/volunteers', label: 'Volunteers', icon: '🙋' },
    { to: '/reports', label: 'Reports', icon: '📊' }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 text-white font-bold shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
            RH
          </span>
          <span className="text-lg font-bold text-slate-900 hidden sm:block">ReliefHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 pl-3 pr-4 py-1.5">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-500 to-sky-400 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-700">{user.name?.split(' ')[0]}</p>
                  <p className="text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button onClick={logout} className="btn btn-secondary text-xs">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary text-xs">
                Get Started
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <MobileMenuIcon open={mobileOpen} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white animate-slide-up">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <span>{icon}</span>
                {label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-slate-100">
              {user ? (
                <button onClick={logout} className="w-full btn btn-secondary">
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <NavLink to="/login" className="block w-full btn btn-secondary" onClick={() => setMobileOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className="block w-full btn btn-primary" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
