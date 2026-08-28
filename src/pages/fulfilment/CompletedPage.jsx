import { useState } from 'react'
import { orders as initialOrders } from '../../data/orders'
import { CheckCircle2, PackageCheck, MapPin, Calendar, ExternalLink, ShieldCheck } from 'lucide-react'

export default function CompletedPage() {
  const [orders, setOrders] = useState(initialOrders)

  // Filter orders that have reached fulfilled or delivered status
  const completedOrders = orders.filter(o => {
    const status = o.fulfilmentStatus?.toLowerCase() || ''
    return status.includes('fulfilled') || status.includes('deliver')
  })

  return (
    <section className="container" style={{ padding: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
            <CheckCircle2 size={14} /> Archive & History
          </div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>Completed Fulfilment Orders</h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '6px', maxWidth: '600px' }}>
            Review fully dispatched and delivered transaction records maintained for auditing, reporting, and customer support.
          </p>
        </div>
      </div>

      {completedOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {completedOrders.map((order) => (
            <div key={order.id} className="panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '240px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '700' }}>Order #{order.id}</h3>
                  <span style={{ 
                    background: 'var(--soft)', 
                    color: 'var(--green)', 
                    padding: '3px 10px', 
                    borderRadius: '12px', 
                    fontSize: '11px', 
                    fontWeight: '600',
                    border: '1px solid var(--border)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <CheckCircle2 size={12} /> {order.fulfilmentStatus || 'Fulfilled'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--muted)', fontSize: '13px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {order.shippingAddress || 'Johannesburg, Gauteng'}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> Delivered Successfully
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--green)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <ShieldCheck size={14} /> Verified audit trail archived | Waybill: <strong>{order.trackingNumber || 'WAYBILL-982412'}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button 
                  onClick={() => alert(`Viewing complete details and invoice archive for Order #${order.id}`)}
                  style={{ background: 'var(--soft)', color: 'var(--green-dark)', border: '1px solid var(--border)', padding: '9px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', borderRadius: '8px', fontWeight: '600' }}
                >
                  <span>View Archive Record</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel" style={{ textAlign: 'center', padding: '64px 24px', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <PackageCheck size={40} style={{ color: 'var(--muted)' }} />
          <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '600' }}>No completed orders found in archive</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '380px', margin: 0 }}>
            Once active orders complete the dispatch handover and reach final destination, they will appear in this history log.
          </p>
        </div>
      )}
    </section>
  )
}