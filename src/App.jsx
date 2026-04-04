import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }  from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute    from './components/layout/ProtectedRoute';

// ── Public pages (imported from the full artifact or standalone pages)
import LoginPage    from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// ── Buyer
import BuyerDashboard from './pages/buyer/BuyerDashboard';

// ── Seller
import SellerDashboard  from './pages/seller/SellerDashboard';
import CreateProjectPage from './pages/seller/CreateProjectPage';

// ── Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import LandingPage from './pages/LandingPage';

/**
 * Lazy-loaded placeholders for pages not yet scaffolded.
 * Replace each with the real component as you build them.
 */
const Placeholder = ({ title }) => (
  <div style={{ padding: 40, fontFamily: 'sans-serif', color: '#374151' }}>
    <h2>🚧 {title}</h2>
    <p style={{ color: '#6b7280', marginTop: 8 }}>This page is coming soon.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* ── Public ──────────────────────────────────────── */}
            <Route path="/"          element={<LandingPage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/register"  element={<RegisterPage />} />

            {/* Public marketplace (read-only without auth) */}
            <Route path="/marketplace" element={<Placeholder title="Marketplace" />} />

            {/* ── Buyer ───────────────────────────────────────── */}
            <Route path="/dashboard"    element={<ProtectedRoute roles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/portfolio"    element={<ProtectedRoute roles={['buyer']}><Placeholder title="Portfolio" /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute roles={['buyer']}><Placeholder title="Transactions" /></ProtectedRoute>} />

            {/* ── Seller ──────────────────────────────────────── */}
            <Route path="/seller"          element={<ProtectedRoute roles={['seller']}><SellerDashboard /></ProtectedRoute>} />
            <Route path="/seller/projects" element={<ProtectedRoute roles={['seller']}><Placeholder title="My Projects" /></ProtectedRoute>} />
            <Route path="/seller/create"   element={<ProtectedRoute roles={['seller']}><CreateProjectPage /></ProtectedRoute>} />
            <Route path="/seller/sales"    element={<ProtectedRoute roles={['seller']}><Placeholder title="Sales" /></ProtectedRoute>} />

            {/* ── Admin ───────────────────────────────────────── */}
            <Route path="/admin"               element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/projects"      element={<ProtectedRoute roles={['admin']}><Placeholder title="Project Verification" /></ProtectedRoute>} />
            <Route path="/admin/users"         element={<ProtectedRoute roles={['admin']}><Placeholder title="User Management" /></ProtectedRoute>} />
            <Route path="/admin/transactions"  element={<ProtectedRoute roles={['admin']}><Placeholder title="All Transactions" /></ProtectedRoute>} />

            {/* ── 404 ─────────────────────────────────────────── */}
            <Route path="*" element={
              <div style={{ minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'4rem' }}>🌿</div>
                  <h1 style={{ fontSize:'2rem',fontWeight:800,margin:'12px 0' }}>404</h1>
                  <p style={{ color:'#6b7280' }}>Page not found.</p>
                  <a href="/" style={{ color:'#2E7D32',fontWeight:700 }}>Go Home →</a>
                </div>
              </div>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
