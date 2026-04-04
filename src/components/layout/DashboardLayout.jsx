import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const NAV = {
  buyer: [
    { to: '/marketplace',    icon: '🌍', label: 'Marketplace'    },
    { to: '/dashboard',      icon: '📊', label: 'Dashboard'      },
    { to: '/portfolio',      icon: '🌿', label: 'Portfolio'      },
    { to: '/transactions',   icon: '📋', label: 'Transactions'   },
  ],
  seller: [
    { to: '/seller',         icon: '📈', label: 'Dashboard'      },
    { to: '/seller/projects',icon: '🌿', label: 'My Projects'    },
    { to: '/seller/create',  icon: '➕', label: 'New Project'    },
    { to: '/seller/sales',   icon: '💰', label: 'Sales'          },
  ],
  admin: [
    { to: '/admin',              icon: '📈', label: 'Overview'        },
    { to: '/admin/projects',     icon: '✅', label: 'Verify Projects' },
    { to: '/admin/users',        icon: '👥', label: 'Users'           },
    { to: '/admin/transactions', icon: '🔄', label: 'Transactions'    },
  ],
};

const roleColor = { buyer: '#0288D1', seller: '#2E7D32', admin: '#d97706' };

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const toast            = useToast();
  const navigate         = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = NAV[user?.role] || [];

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#f9fafb' }}>

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside style={{
        width: 240, background: '#14451a', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        borderRight: '1px solid rgba(255,255,255,.08)',
      }}>
        {/* Logo */}
        <div style={{ padding: '22px 18px 16px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#4caf7d,#6ecf96)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🌱</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: '1rem' }}>CarbonMkt</span>
          </div>
          {/* User badge */}
          <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 9, padding: '10px 12px' }}>
            <div style={{ fontWeight: 600, fontSize: '.85rem', color: '#fff', marginBottom: 4 }}>{user?.name}</div>
            <span style={{
              fontFamily: 'monospace', fontSize: '.65rem', letterSpacing: '.08em', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: 99, border: `1px solid ${roleColor[user?.role]}44`,
              background: `${roleColor[user?.role]}22`, color: roleColor[user?.role],
            }}>{user?.role}</span>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
          {navItems.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} end={to === '/dashboard' || to === '/seller' || to === '/admin'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 8, marginBottom: 2,
                fontWeight: 600, fontSize: '.82rem', letterSpacing: '.02em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all .18s',
                background: isActive ? 'rgba(76,175,125,.22)' : 'transparent',
                color:      isActive ? '#6ecf96' : 'rgba(255,255,255,.55)',
              })}>
              <span style={{ width: 18, textAlign: 'center' }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <NavLink to="/marketplace" style={{ display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:8,color:'rgba(255,255,255,.45)',fontSize:'.82rem',fontWeight:600,textTransform:'uppercase',textDecoration:'none',marginBottom:2 }}>
            <span>🌍</span> Marketplace
          </NavLink>
          <button onClick={handleLogout} style={{
            display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:8,width:'100%',
            border:'none',background:'transparent',color:'rgba(239,68,68,.7)',cursor:'pointer',
            fontSize:'.82rem',fontWeight:600,textTransform:'uppercase',textAlign:'left',
          }}>
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ────────────────────────────────────── */}
      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 30 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: '1.1rem', color: '#1c2526' }}>Carbon Marketplace</div>
            <div style={{ fontFamily: 'monospace', fontSize: '.65rem', color: '#9ca3af', letterSpacing: '.06em', textTransform: 'uppercase' }}>{user?.role} portal</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <NavLink to="/marketplace" style={{ background: 'none', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '6px 14px', fontSize: '.8rem', fontWeight: 600, color: '#374151', textDecoration: 'none' }}>🌍 Marketplace</NavLink>
            <button onClick={handleLogout} style={{ background: '#2E7D32', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: '.8rem', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Sign Out</button>
          </div>
        </header>

        <main style={{ flex: 1, padding: '28px 28px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
