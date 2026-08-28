import { useState } from 'react'
import { orders as initialOrders } from '../../data/orders'
import { BoxSelect, CheckCircle, Package, ShieldCheck, ArrowRight, Clock, AlertCircle } from 'lucide-react'

export default function PackingPage() {
  const [orders, setOrders] = useState(initialOrders)

  // Filter orders that are in picking or packing stages
  const packingOrders = orders.filter(o => {
    const status = o.fulfilmentStatus?.toLowerCase() || ''
    return status.includes('pick') || status.includes('pack') || status.includes('processing')
  })

  const handleAdvanceToDispatch = (orderId) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order
        return {
          ...order,
          fulfilmentStatus: 'Ready to Dispatch'
        }
      })
    )
  }

  return (
    <section className="container" style={{ padding: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
            <BoxSelect size={14} /> Station Boxing & QA
          </div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>Packing Operations</h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '6px', maxWidth: '600px' }}>
            Verify items against manifests, package fragile goods securely, and advance orders to courier dispatch handover queues.
          </p>
        </div>
      </div>

      {packingOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {packingOrders.map((order) => {
            const status = order.fulfilmentStatus || 'Processing'
            const isPacked = status.toLowerCase().includes('pack') && !status.toLowerCase().includes('process')

            return (
              <div key={order.id} className="panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '260px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '700' }}>Order #{order.id}</h3>
                    <span style={{ 
                      background: 'var(--soft)', 
                      color: isPacked ? 'var(--green)' : '#0284c7', 
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
                    Customer: <strong style={{ color: 'var(--green-dark)' }}>{order.customer || 'Thabo Mokoena'}</strong> • {Array.isArray(order.items) ? `${order.items.length} item(s)` : '1 item'} in manifest
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '12px' }}>
                    <ShieldCheck size={14} style={{ color: 'var(--green)' }} /> Quality control check: Verified fragile handling & custom box required.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button 
                    onClick={() => handleAdvanceToDispatch(order.id)}
                    style={{ 
                      padding: '9px 18px', 
                      fontSize: '13px', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      background: isPacked ? 'var(--green)' : 'var(--soft)',
                      color: isPacked ? 'white' : 'var(--green-dark)',
                      border: isPacked ? 'none' : '1px solid var(--border)',
                      cursor: 'pointer',
                      fontWeight: '600',
                      borderRadius: '8px'
                    }}
                  >
                    <span>{isPacked ? 'Mark Ready for Dispatch' : 'Complete Packing'}</span>
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
          <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '600' }}>No active orders in packing queue</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '380px', margin: 0 }}>
            All items have been wrapped, boxed, and moved forward to the dispatch handover station.
          </p>
        </div>
      )}
    </section>
  )
}