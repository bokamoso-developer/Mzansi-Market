import { useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../../utils'
import { PackageCheck, Search, Filter, ChevronRight, Clock, CheckCircle2 } from 'lucide-react'

const initialOrders = [
  {
    id: 'MM1001',
    customer: 'Naledi Mokoena',
    total: 1048,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Pending',
    items: 2,
  },
  {
    id: 'MM1002',
    customer: 'Thabo Molefe',
    total: 538,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Picking',
    items: 3,
  },
  {
    id: 'MM1003',
    customer: 'Lerato Dlamini',
    total: 699,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Packing',
    items: 1,
  },
  {
    id: 'MM1004',
    customer: 'Sipho Khumalo',
    total: 6299,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Shipped',
    items: 1,
  },
  {
    id: 'MM1005',
    customer: 'Zanele Van Der Merwe',
    total: 3198,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    items: 4,
  },
  {
    id: 'MM1006',
    customer: 'Kabelo Ndlovu',
    total: 7999,
    paymentStatus: 'Pending',
    fulfilmentStatus: 'Pending',
    items: 1,
  },
  {
    id: 'MM1007',
    customer: 'Amahle Zuma',
    total: 1398,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Picking',
    items: 2,
  },
  {
    id: 'MM1008',
    customer: 'Francois Du Plessis',
    total: 3999,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Shipped',
    items: 1,
  },
  {
    id: 'MM1009',
    customer: 'Precious Sithole',
    total: 448,
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    items: 2,
  },
  {
    id: 'MM1010',
    customer: 'Johan Botha',
    total: 14999,
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Packing',
    items: 1,
  }
]

export default function FulfilmentOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer && order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || (order.fulfilmentStatus && order.fulfilmentStatus.toLowerCase().includes(statusFilter.toLowerCase()))
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase() || ''
    if (lower.includes('deliver') || lower.includes('dispatch') || lower.includes('packed') || lower.includes('shipped')) {
      return <span className="status-badge success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', color: 'var(--green)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--border)' }}><CheckCircle2 size={12} /> {status}</span>
    }
    if (lower.includes('pick') || lower.includes('pack') || lower.includes('process')) {
      return <span className="status-badge info" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', color: '#0284c7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--border)' }}><Clock size={12} /> {status}</span>
    }
    return <span className="status-badge warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', color: 'var(--gold)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--border)' }}><Clock size={12} /> {status || 'Paid & Verified'}</span>
  }

  return (
    <div className="fulfilment-orders-management-page container" style={{ padding: '32px 0' }}>
      <div className="staff-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--green-dark)', fontWeight: '700' }}>Paid Orders Queue</h1>
          <p className="section-subtitle" style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>Manage verified transactions ready for warehouse picking and packing.</p>
        </div>
        <div className="queue-counter-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--soft)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border)', fontSize: '12px', fontWeight: '600', color: 'var(--green-dark)' }}>
          <PackageCheck size={18} style={{ color: 'var(--green)' }} />
          <span>{orders.length} Active Orders</span>
        </div>
      </div>

      <div className="catalog-controls-bar panel" style={{ background: 'white', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="control-search-wrapper" style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} className="control-search-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
          <input 
            type="search" 
            placeholder="Search by order ID or customer name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search catalog-filter-input"
            style={{ width: '100%', paddingLeft: '36px', padding: '8px 12px 8px 36px', fontSize: '13px' }}
            aria-label="Search orders queue"
          />
        </div>

        <div className="control-filter-wrapper" style={{ position: 'relative', width: '200px' }}>
          <Filter size={16} className="control-filter-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter status"
            className="search"
            style={{ width: '100%', paddingLeft: '36px', padding: '8px 12px 8px 36px', fontSize: '13px', cursor: 'pointer' }}
          >
            <option value="all">All Fulfilment Stages</option>
            <option value="processing">Processing</option>
            <option value="picking">Picking</option>
            <option value="packing">Packing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="table-card" style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)', background: 'var(--soft)' }}>
              <th style={{ padding: '12px 16px' }}>Order Reference</th>
              <th style={{ padding: '12px 16px' }}>Customer Name</th>
              <th style={{ padding: '12px 16px' }}>Items Manifest</th>
              <th style={{ padding: '12px 16px' }}>Total Amount</th>
              <th style={{ padding: '12px 16px' }}>Fulfilment Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="table-row-interactive" style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div className="order-id-cell" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-dark)' }}>
                      <PackageCheck size={16} className="text-primary" style={{ color: 'var(--green)' }} />
                      <strong>{order.id}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="customer-name-text" style={{ color: 'var(--green-dark)', fontWeight: '500' }}>{order.customer}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="items-summary-text" style={{ color: 'var(--muted)' }}>
                      {Array.isArray(order.items) ? `${order.items.length} item(s)` : (order.items || '1 item')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="order-total-price" style={{ color: 'var(--green-dark)', fontWeight: '600' }}>{money(order.total)}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {getStatusBadge(order.fulfilmentStatus)}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <Link to={`/fulfilment/order/${order.id}`} className="view-order-link" aria-label={`Open order ${order.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--green)', textDecoration: 'none', fontWeight: '600', fontSize: '12px' }}>
                      <span>Process Order</span>
                      <ChevronRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-table-state" style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
                  <p style={{ margin: 0 }}>No verified orders match your search criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}