import { useState } from 'react'
import { orders as initialOrders } from '../../data/orders'
import { ClipboardList, CheckCircle2, Package, ArrowRight, MapPin, Clock } from 'lucide-react'

export default function PickingPage() {
  const [orders, setOrders] = useState(initialOrders)

  // Filter orders that are in paid or picking stage
  const pickingOrders = orders.filter(o => {
    const status = o.fulfilmentStatus?.toLowerCase() || ''
    return status.includes('paid') || status.includes('pick') || !o.fulfilmentStatus
  })

  const handleAdvanceToPacking = (orderId) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order
        return {
          ...order,
          fulfilmentStatus: 'Packing in Progress'
        }
      })
    )
  }

  return (
    <section className="container" style={{ padding: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
            <ClipboardList size={14} /> Warehouse Picking List
          </div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>Picking Operations</h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '6px', maxWidth: '600px' }}>
            Generate digital picking slips, locate items across warehouse aisles, and mark batches ready for packaging.
          </p>
        </div>
      </div>

      {pickingOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {pickingOrders.map((order) => {
            const status = order.fulfilmentStatus || 'Paid'
            const isPicking = status.toLowerCase().includes('pick')

            return (
              <div key={order.id} className="panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '260px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '700' }}>Order #{order.id}</h3>
                    <span style={{ 
                      background: 'var(--soft)', 
                      color: 'var(--gold)', 
                      padding: '3px 10px', 
                      borderRadius: '12px', 
                      fontSize: '11px', 
                      fontWeight: '600',
                      border: '1px solid var(--border)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={12} /> {status}
                    </span>
                  </div>

                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>
                    Customer: <strong style={{ color: 'var(--green-dark)' }}>{order.customer || 'Thabo Mokoena'}</strong> • {Array.isArray(order.items) ? `${order.items.length} item(s)` : '1 item'} to collect
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '12px' }}>
                    <MapPin size={14} style={{ color: 'var(--green)' }} /> Aisle 3, Shelf B • Standard Warehouse Zone
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button 
                    onClick={() => handleAdvanceToPacking(order.id)}
                    style={{ 
                      padding: '9px 18px', 
                      fontSize: '13px', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      background: 'var(--green)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      borderRadius: '8px'
                    }}
                  >
                    <span>Mark Picked & Send to Packing</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="panel" style={{ textAlign: 'center', padding: '64px 24px', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Package size={40} style={{ color: 'var(--muted)' }} />
          <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '600' }}>All active orders have been picked</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '380px', margin: 0 }}>
            There are currently no items remaining in the active picking queue.
          </p>
        </div>
      )}
    </section>
  )
}