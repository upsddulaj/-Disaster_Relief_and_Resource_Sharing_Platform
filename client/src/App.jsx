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
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 py-8">
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
  </div>
);

export default App;
