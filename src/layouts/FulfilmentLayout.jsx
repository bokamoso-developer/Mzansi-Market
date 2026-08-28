import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { 
  LayoutDashboard, 
  PackageCheck, 
  ClipboardList, 
  BoxSelect, 
  Truck, 
  CheckCircle2, 
  Search, 
  Radio 
} from 'lucide-react'

const links = [
  { to: '/fulfilment', label: 'Dashboard', end: true, icon: LayoutDashboard },
  { to: '/fulfilment/orders', label: 'Paid Orders', icon: PackageCheck },
  { to: '/fulfilment/picking', label: 'Picking', icon: ClipboardList },
  { to: '/fulfilment/packing', label: 'Packing', icon: BoxSelect },
  { to: '/fulfilment/dispatch', label: 'Dispatch', icon: Truck },
  { to: '/fulfilment/completed', label: 'Completed', icon: CheckCircle2 },
]

export default function FulfilmentLayout() {
  return (
    <div className="staff-layout fulfilment-dashboard-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--soft)' }}>
      <Sidebar title="Fulfilment Station" links={links} />
      
      <main className="staff-main fulfilment-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header className="fulfilment-topbar" style={{ background: 'white', padding: '16px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', position: 'sticky', top: 0, zIndex: 10 }}>
          <div className="fulfilment-search-bar" style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
            <Search size={18} className="search-icon-inline" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
            <input 
              type="search" 
              placeholder="Search by order ID, SKU, or tracking reference..." 
              className="search" 
              style={{ width: '100%', paddingLeft: '40px', padding: '8px 12px 8px 40px', fontSize: '13px' }}
              aria-label="Search orders"
            />
          </div>
          
          <div className="fulfilment-profile-widget" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="avatar-chip" title="Fulfilment Employee" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--soft)', border: '1px solid var(--border)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>FE</div>
          </div>
        </header>

        <div className="fulfilment-content-wrapper" style={{ padding: '0 32px', flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}