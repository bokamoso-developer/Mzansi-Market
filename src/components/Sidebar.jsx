import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, LayoutDashboard } from 'lucide-react'

export default function Sidebar({ title = 'Management Portal', links = [] }) {
  const { logout, user } = useAuth()

  return (
    <aside className="sidebar" aria-label="Staff Navigation" style={{ width: '260px', height: '100vh', background: 'white', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, left: 0 }}>
      <div className="sidebar-header" style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="logo" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--green-dark)', marginBottom: '8px' }}>Mzansi Market</div>
        <div className="sidebar-role-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--soft)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', color: 'var(--green)', border: '1px solid var(--border)' }}>
          <LayoutDashboard size={14} />
          <span>{title}</span>
        </div>
      </div>

      <nav className="sidebar-nav" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto' }}>
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink 
              key={link.to} 
              to={link.to} 
              end={link.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                color: isActive ? 'var(--green-dark)' : 'var(--muted)',
                background: isActive ? 'var(--soft)' : 'transparent',
                transition: 'all 0.2s ease'
              })}
            >
              {Icon && <Icon size={18} />}
              <span>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer" style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: '#fafafa' }}>
        {user && (
          <div className="sidebar-user-info" style={{ marginBottom: '12px' }}>
            <span className="sidebar-user-name" style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--green-dark)' }}>{user.name || 'Staff Member'}</span>
            <span className="sidebar-user-email" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email || 'staff@mzansimarket.co.za'}</span>
          </div>
        )}
        <button 
          className="sidebar-logout-btn" 
          onClick={logout} 
          type="button"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 12px', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', color: '#dc2626', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s ease' }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}