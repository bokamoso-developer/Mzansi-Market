import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Truck, CheckCircle, PackageCheck, MapPin, Calendar, ExternalLink } from 'lucide-react'

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
    trackingNumber: 'WAYBILL-849201',
    courier: 'The Courier Guy',
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
    fulfilmentStatus: 'Dispatch Ready',
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
    fulfilmentStatus: 'Dispatch Ready',
    items: 1,
  }
]

export default function DispatchPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState(initialOrders)
  const [trackingInput, setTrackingInput] = useState({})
  const [carrierInput, setCarrierInput] = useState({})

  // Filter orders that are ready for dispatch or have been dispatched
  const dispatchableOrders = orders.filter(o => {
    const status = o.fulfilmentStatus?.toLowerCase() || ''
    return status.includes('dispatch') || status.includes('ready') || status.includes('fulfilled') || status.includes('shipped')
  })

  const handleDispatch = (orderId) => {
    const trackingNo = trackingInput[orderId] || 'WAYBILL-' + Math.floor(100000 + Math.random() * 900000)
    const carrier = carrierInput[orderId] || 'The Courier Guy'

    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order
        return {
          ...order,
          fulfilmentStatus: 'Fulfilled',
          trackingNumber: trackingNo,
          courier: carrier,
          dispatchedAt: new Date().toLocaleDateString('en-ZA')
        }
      })
    )
  }

  const handleTrackClick = (trackingNumber) => {
    navigate(`/fulfilment/track?waybill=${trackingNumber}`)
  }

  return (
    <section className="container" style={{ padding: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
            <Truck size={14} /> Logistics & Handover
          </div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>Dispatch Management</h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '6px', maxWidth: '600px' }}>
            Manage courier handovers, generate waybill numbers, and record dispatch confirmations across South African shipping routes.
          </p>
        </div>
      </div>

      {dispatchableOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {dispatchableOrders.map((order) => {
            const isFulfilled = order.fulfilmentStatus?.toLowerCase() === 'fulfilled' || order.fulfilmentStatus?.toLowerCase() === 'shipped'
            const currentTrackingNo = order.trackingNumber || 'WAYBILL-849201'
            return (
              <div key={order.id} className="panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '240px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '700' }}>Order #{order.id} ({order.customer})</h3>
                    <span style={{ 
                      background: isFulfilled ? 'var(--soft)' : 'var(--gold)', 
                      color: isFulfilled ? 'var(--green-dark)' : 'var(--green-dark)', 
                      padding: '3px 10px', 
                      borderRadius: '12px', 
                      fontSize: '11px', 
                      fontWeight: '600',
                      border: '1px solid var(--border)'
                    }}>
                      {order.fulfilmentStatus || 'Ready to Dispatch'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--muted)', fontSize: '13px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {order.shippingAddress || 'Johannesburg, Gauteng'}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {order.dispatchedAt || 'Scheduled Today'}
                    </span>
                  </div>

                  {isFulfilled && (
                    <div style={{ fontSize: '13px', color: 'var(--green)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <CheckCircle size={14} /> Dispatched via {order.courier || 'The Courier Guy'} | Waybill: <strong>{currentTrackingNo}</strong>
                    </div>
                  )}
                </div>

                {!isFulfilled ? (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select
                      value={carrierInput[order.id] || 'The Courier Guy'}
                      onChange={(e) => setCarrierInput({ ...carrierInput, [order.id]: e.target.value })}
                      className="search"
                      style={{ width: '150px', padding: '8px 12px', fontSize: '13px' }}
                    >
                      <option value="The Courier Guy">The Courier Guy</option>
                      <option value="Dawn Wing">Dawn Wing</option>
                      <option value="RAM Hand-to-Hand">RAM Hand-to-Hand</option>
                      <option value="SAPO Speed Services">SAPO Speed Services</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Enter Waybill No."
                      value={trackingInput[order.id] || ''}
                      onChange={(e) => setTrackingInput({ ...trackingInput, [order.id]: e.target.value })}
                      className="search"
                      style={{ width: '160px', padding: '8px 12px', fontSize: '13px' }}
                    />

                    <button 
                      onClick={() => handleDispatch(order.id)}
                      style={{ padding: '9px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Confirm Dispatch <Truck size={14} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleTrackClick(currentTrackingNo)}
                    style={{ background: 'var(--soft)', color: 'var(--green-dark)', border: '1px solid var(--border)', padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    Track Shipment <ExternalLink size={14} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="panel" style={{ textAlign: 'center', padding: '64px 24px', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <PackageCheck size={40} style={{ color: 'var(--muted)' }} />
          <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '600' }}>No orders awaiting dispatch</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '380px', margin: 0 }}>
            All packed orders have been successfully handed over to courier partners or are currently in transit.
          </p>
        </div>
      )}
    </section>
  )
}