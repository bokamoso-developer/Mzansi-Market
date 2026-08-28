import { useState } from 'react'
import { orders as initialOrders } from '../../data/orders'
import { PackageCheck, ClipboardList, BoxSelect, Truck, TrendingUp, Clock, AlertCircle, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'

export default function DashboardPage() {
  const [orders, setOrders] = useState(initialOrders)

  const paidOrdersCount = orders.filter(o => o.fulfilmentStatus?.toLowerCase() === 'paid' || !o.fulfilmentStatus).length
  const pickingCount = orders.filter(o => o.fulfilmentStatus?.toLowerCase().includes('picking')).length
  const packingCount = orders.filter(o => o.fulfilmentStatus?.toLowerCase().includes('packing')).length
  const dispatchCount = orders.filter(o => o.fulfilmentStatus?.toLowerCase().includes('dispatch') || o.fulfilmentStatus?.toLowerCase().includes('ready')).length

  const advanceStatus = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id !== orderId) return order
        
        let current = order.fulfilmentStatus?.toLowerCase() || 'paid'
        let nextStatus = 'Picking'
        
        if (current.includes('paid')) nextStatus = 'Picking'
        else if (current.includes('picking')) nextStatus = 'Packing'
        else if (current.includes('packing')) nextStatus = 'Ready to Dispatch'
        else if (current.includes('dispatch') || current.includes('ready')) nextStatus = 'Fulfilled'
        else nextStatus = 'Fulfilled'

        return { ...order, fulfilmentStatus: nextStatus }
      })
    )
  }

  return (
    <div className="dashboard-page-container" style={{ padding: '32px 0' }}>
      <div className="dashboard-header-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--green-dark)', fontWeight: '700' }}>Fulfilment Operations Center</h1>
          <p className="dashboard-subtitle" style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>Real-time station tracking, order processing queues, and dispatch workflows.</p>
        </div>
        <div className="dashboard-action-badge live-pulse-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--soft)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border)', fontSize: '12px', fontWeight: '600', color: 'var(--green-dark)' }}>
          <span className="live-dot" style={{ width: '8px', height: '8px', backgroundColor: 'var(--green)', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>Station Active</span>
        </div>
      </div>

      <div className="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div className="stat-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '13px', fontWeight: '600' }}>
            <span>Paid Orders Queue</span>
            <PackageCheck size={18} style={{ color: 'var(--green)' }} />
          </div>
          <strong style={{ fontSize: '28px', color: 'var(--green-dark)', display: 'block', margin: '8px 0 4px' }}>{paidOrdersCount}</strong>
          <span className="stat-trend positive" style={{ fontSize: '12px', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12} /> Ready for picking</span>
        </div>

        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div className="stat-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '13px', fontWeight: '600' }}>
            <span>In Picking</span>
            <ClipboardList size={18} style={{ color: 'var(--gold)' }} />
          </div>
          <strong style={{ fontSize: '28px', color: 'var(--green-dark)', display: 'block', margin: '8px 0 4px' }}>{pickingCount}</strong>
          <span className="stat-trend warning" style={{ fontSize: '12px', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Active batch</span>
        </div>

        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div className="stat-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '13px', fontWeight: '600' }}>
            <span>In Packing</span>
            <BoxSelect size={18} style={{ color: '#0284c7' }} />
          </div>
          <strong style={{ fontSize: '28px', color: 'var(--green-dark)', display: 'block', margin: '8px 0 4px' }}>{packingCount}</strong>
          <span className="stat-trend neutral" style={{ fontSize: '12px', color: 'var(--muted)' }}>Wrapping & boxing</span>
        </div>

        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div className="stat-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '13px', fontWeight: '600' }}>
            <span>Ready to Dispatch</span>
            <Truck size={18} style={{ color: 'var(--green)' }} />
          </div>
          <strong style={{ fontSize: '28px', color: 'var(--green-dark)', display: 'block', margin: '8px 0 4px' }}>{dispatchCount}</strong>
          <span className="stat-trend neutral" style={{ fontSize: '12px', color: 'var(--muted)' }}>Courier handover pending</span>
        </div>
      </div>

      <div className="dashboard-secondary-section" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Interactive Order Workflow Table */}
        <div className="panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--green-dark)', fontWeight: '600' }}>Active Workflow Queue</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                  <th style={{ padding: '10px 8px' }}>Order ID</th>
                  <th style={{ padding: '10px 8px' }}>Customer</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '600', color: 'var(--green-dark)' }}>#{order.id}</td>
                    <td style={{ padding: '12px 8px', color: 'var(--muted)' }}>{order.customerName || 'Mzansi Patron'}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{ 
                        background: 'var(--soft)', 
                        color: 'var(--green-dark)', 
                        padding: '4px 10px', 
                        borderRadius: '12px', 
                        fontSize: '11px', 
                        fontWeight: '600',
                        border: '1px solid var(--border)'
                      }}>
                        {order.fulfilmentStatus || 'Paid'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                      <button 
                        onClick={() => advanceStatus(order.id)}
                        style={{ padding: '5px 12px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                      >
                        Advance <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Station Notice Panel */}
        <div className="panel station-announcement-panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--green-dark)', fontWeight: '600' }}>Station Notice</h3>
            <span className="badge-category" style={{ fontSize: '11px', background: 'var(--soft)', padding: '2px 8px', borderRadius: '6px', color: 'var(--muted)' }}>Warehouse Alpha</span>
          </div>
          <p className="panel-description" style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
            All morning courier pickups are scheduled for 14:00 SAST. Ensure express orders are cleared from the packing station before the cutoff time.
          </p>
        </div>
      </div>
    </div>
  )
}