import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/inventory', label: 'Inventory' },
  { to: '/admin/promotions', label: 'Promotions' },
]

export default function ProductAdminLayout() {
  return (
    <div className="staff-layout">
      <Sidebar title="Product Administrator" links={links} />
      <main className="staff-main"><Outlet /></main>
    </div>
  )
}
