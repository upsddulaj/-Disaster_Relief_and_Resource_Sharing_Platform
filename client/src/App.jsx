import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DisasterMap from './pages/DisasterMap';
import Resources from './pages/Resources';
import Requests from './pages/Requests';
import Volunteers from './pages/Volunteers';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <Navbar />
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/disasters"
          element={
            <ProtectedRoute>
              <DisasterMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteers"
          element={
            <ProtectedRoute roles={['admin', 'organization']}>
              <Volunteers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute roles={['admin', 'organization']}>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-lg py-8 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 text-white font-bold shadow-md">
              RH
            </span>
            <div>
              <p className="font-semibold text-slate-900">ReliefHub</p>
              <p className="text-xs text-slate-500">Coordinated response, faster</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900 transition">About</a>
            <a href="#" className="hover:text-slate-900 transition">Contact</a>
            <a href="#" className="hover:text-slate-900 transition">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition">Terms</a>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-danger-50 px-4 py-2 text-sm font-medium text-danger-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Emergency: +1 (800) 555-0199
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 ReliefHub. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
);

export default App;
