import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`;

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">RH</span>
          ReliefHub
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <NavLink to="/disasters" className={navLinkClass}>
            Disasters
          </NavLink>
          <NavLink to="/resources" className={navLinkClass}>
            Resources
          </NavLink>
          <NavLink to="/requests" className={navLinkClass}>
            Requests
          </NavLink>
          <NavLink to="/volunteers" className={navLinkClass}>
            Volunteers
          </NavLink>
          <NavLink to="/reports" className={navLinkClass}>
            Reports
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {user.role}
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
