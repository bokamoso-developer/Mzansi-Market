import { Link } from 'react-router-dom'
import { ShoppingBag, UserRound, ShieldCheck, LogOut, Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">Mzansi Market</Link>

        <nav className="header-nav">
          <Link to="/" className="link-button">Home</Link>
          <Link to="/shop" className="link-button">Shop</Link>
          {user?.role === 'customer' && (
            <Link to="/orders" className="link-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Package size={16} /> My Orders
            </Link>
          )}
          {user?.role === 'staff' && (
            <Link to="/staff" className="link-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> Staff Dashboard
            </Link>
          )}
        </nav>

        <div className="header-actions">
          <Link to="/cart" aria-label="View Cart" style={{ display: 'flex', alignItems: 'center', position: 'relative', color: 'var(--green)' }}>
            <ShoppingBag size={20} />
            {count > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--gold)',
                color: 'white',
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '10px',
                lineHeight: 1
              }}>{count}</span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--green-dark)' }}>
                <UserRound size={18} />
                <span>{user.name || 'My Account'}</span>
              </div>
              <button onClick={logout} type="button" aria-label="Sign out" style={{ padding: '8px 12px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="primary-link" style={{ margin: '0', padding: '8px 16px' }}>Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}