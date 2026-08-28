import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { orders } from '../../data/orders'
import { money } from '../../utils'
import { 
  Package, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  User, 
  MapPin, 
  Calendar,
  BoxSelect,
  ClipboardList,
  Check
} from 'lucide-react'

export default function OrderPage() {
  const { id } = useParams()
  const foundOrder = orders.find((item) => item.id === id)
  
  // Local state to simulate workflow progression interactively
  const [order, setOrder] = useState(foundOrder || {
    id: id || 'MZ-1049',
    customer: 'Thabo Mokoena',
    email: 'thabo@example.co.za',
    phone: '082 123 4567',
    address: '42 Vilakazi Street, Orlando West, Johannesburg, 2001',
    items: [
      { id: 1, name: 'Shweshwe Print Scatter Cushion', quantity: 2, price: 450 },
      { id: 2, name: 'Handcrafted Beaded Zulu Necklace', quantity: 1, price: 320 }
    ],
    total: 1220,
    paymentStatus: 'Paid (PayFast)',
    fulfilmentStatus: 'Processing'
  })

  const [actionLoading, setActionLoading] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  if (!foundOrder && !order) {
    return (
      <section className="container section" style={{ padding: '64px 0', textAlign: 'center' }}>
        <div className="panel empty-cart-panel" style={{ background: 'white', padding: '48px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2 style={{ color: 'var(--green-dark)', marginBottom: '8px' }}>Order Not Found</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>The requested order reference "{id}" could not be located in the fulfilment registry.</p>
          <Link className="primary-link" to="/fulfilment/orders" style={{ color: 'var(--green)', fontWeight: '600', textDecoration: 'none' }}>Return to Orders Queue</Link>
        </div>
      </section>
    )
  }

  const handleStatusUpdate = (newStatus) => {
    setActionLoading(newStatus)
    setTimeout(() => {
      setOrder(prev => ({ ...prev, fulfilmentStatus: newStatus }))
      setActionLoading(null)
      setSuccessMsg(`Order status updated to: ${newStatus}`)
      setTimeout(() => setSuccessMsg(''), 3500)
    }, 600)
  }

  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase() || ''
    if (lower.includes('deliver') || lower.includes('dispatch') || lower.includes('ready')) {
      return <span className="status-badge success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', color: 'var(--green)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--border)' }}><CheckCircle2 size={12} /> {status}</span>
    }
    if (lower.includes('pick') || lower.includes('pack')) {
      return <span className="status-badge info" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', color: '#0284c7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--border)' }}><Clock size={12} /> {status}</span>
    }
    return <span className="status-badge warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', color: 'var(--gold)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--border)' }}><Clock size={12} /> {status}</span>
  }

  return (
    <section className="container order-detail-page-section" style={{ padding: '48px 0' }}>
      <div className="order-detail-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <Link to="/fulfilment/orders" className="link-button back-to-orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '13px', textDecoration: 'none', marginBottom: '12px' }}>
            <ArrowLeft size={16} /> Back to Fulfilment Queue
          </Link>
          <div className="order-title-group" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--green-dark)', fontWeight: '700' }}>Order Reference: {order.id}</h1>
            {getStatusBadge(order.fulfilmentStatus)}
          </div>
        </div>
        <div className="order-header-meta">
          <span className="order-date-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--soft)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: 'var(--muted)', border: '1px solid var(--border)' }}>
            <Calendar size={14} /> 28 Aug 2026, 09:42 SAST
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="success-banner-alert" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#dcfce7', color: '#166534', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', marginBottom: '24px', border: '1px solid #bbf7d0' }}>
          <Check size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="two-column order-detail-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        <div className="order-main-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="panel order-info-panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--green-dark)', fontWeight: '600' }}>Customer & Delivery Details</h3>
            <div className="customer-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="detail-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <User size={18} className="text-primary" style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--green-dark)', fontSize: '14px' }}>{order.customer}</strong>
                  <span className="detail-subtext" style={{ color: 'var(--muted)', fontSize: '13px' }}>{order.email || 'customer@mzansimarket.co.za'} • {order.phone || '082 000 0000'}</span>
                </div>
              </div>
              <div className="detail-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} className="text-primary" style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--green-dark)', fontSize: '14px' }}>Shipping Destination</strong>
                  <span className="detail-subtext" style={{ color: 'var(--muted)', fontSize: '13px' }}>{order.address || '42 Vilakazi Street, Orlando West, Johannesburg, 2001'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel order-items-panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--green-dark)', fontWeight: '600' }}>Ordered Items Manifest</h3>
            <div className="table-card nested-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                    <th style={{ padding: '8px 4px' }}>Item Description</th>
                    <th style={{ padding: '8px 4px' }}>Qty</th>
                    <th style={{ padding: '8px 4px', textAlign: 'right' }}>Unit Price</th>
                    <th style={{ padding: '8px 4px', textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(order.items) ? (
                    order.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px 4px' }}>
                          <div className="order-item-name-cell" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-dark)', fontWeight: '500' }}>
                            <Package size={14} className="text-primary" style={{ color: 'var(--green)' }} />
                            <span>{item.name || item}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 4px', color: 'var(--muted)' }}>{item.quantity || 1}</td>
                        <td style={{ padding: '12px 4px', textAlign: 'right', color: 'var(--muted)' }}>{money(item.price || order.total)}</td>
                        <td style={{ padding: '12px 4px', textAlign: 'right', color: 'var(--green-dark)' }}><strong>{money((item.price || order.total) * (item.quantity || 1))}</strong></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: '12px 4px' }}>
                        <p style={{ margin: 0, color: 'var(--muted)' }}>{order.items}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="order-totals-footer" style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)' }}>
                <span>Payment Verification</span>
                <span className="payment-status-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--green)', fontWeight: '600' }}>
                  <ShieldCheck size={14} className="text-success" />
                  {order.paymentStatus}
                </span>
              </div>
              <div className="summary-row final-total-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: 'var(--green-dark)', fontWeight: '700' }}>
                <span>Total Amount Collected</span>
                <strong>{money(order.total)}</strong>
              </div>
            </div>
          </div>
        </div>

        <aside className="panel order-actions-sidebar" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: 'var(--green-dark)', fontWeight: '600' }}>Station Workflow Actions</h3>
          <p className="sidebar-instruction" style={{ color: 'var(--muted)', fontSize: '13px', margin: '0 0 20px 0' }}>Advance this order through the warehouse fulfilment pipeline.</p>

          <div className="actions fulfilment-action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              type="button"
              className={`workflow-action-btn ${actionLoading === 'Stock Reserved' ? 'loading' : ''}`}
              onClick={() => handleStatusUpdate('Stock Reserved')}
              disabled={actionLoading !== null}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--soft)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--green-dark)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <Package size={16} style={{ color: 'var(--green)' }} />
              <span>Reserve Stock</span>
            </button>

            <button 
              type="button"
              className={`workflow-action-btn ${actionLoading === 'Picking in Progress' ? 'loading' : ''}`}
              onClick={() => handleStatusUpdate('Picking in Progress')}
              disabled={actionLoading !== null}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--soft)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--green-dark)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <ClipboardList size={16} style={{ color: 'var(--gold)' }} />
              <span>Start Picking</span>
            </button>

            <button 
              type="button"
              className={`workflow-action-btn ${actionLoading === 'Picked' ? 'loading' : ''}`}
              onClick={() => handleStatusUpdate('Picked')}
              disabled={actionLoading !== null}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--soft)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--green-dark)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <CheckCircle2 size={16} className="text-success" style={{ color: 'var(--green)' }} />
              <span>Mark Picked</span>
            </button>

            <button 
              type="button"
              className={`workflow-action-btn ${actionLoading === 'Packing in Progress' ? 'loading' : ''}`}
              onClick={() => handleStatusUpdate('Packing in Progress')}
              disabled={actionLoading !== null}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--soft)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--green-dark)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <BoxSelect size={16} style={{ color: '#0284c7' }} />
              <span>Start Packing</span>
            </button>

            <button 
              type="button"
              className={`workflow-action-btn ${actionLoading === 'Packed' ? 'loading' : ''}`}
              onClick={() => handleStatusUpdate('Packed')}
              disabled={actionLoading !== null}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--soft)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--green-dark)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <CheckCircle2 size={16} className="text-success" style={{ color: 'var(--green)' }} />
              <span>Mark Packed</span>
            </button>

            <button 
              type="button"
              className={`workflow-action-btn primary-workflow-btn ${actionLoading === 'Ready for Dispatch' ? 'loading' : ''}`}
              onClick={() => handleStatusUpdate('Ready for Dispatch')}
              disabled={actionLoading !== null}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--green)', border: '1px solid var(--green)', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', textAlign: 'left', marginTop: '4px' }}
            >
              <Truck size={16} />
              <span>Ready for Dispatch</span>
            </button>
          </div>

          <div className="workflow-audit-note" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: '12px' }}>
            <ShieldCheck size={14} className="text-success" style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
            <span>All station actions are logged with employee timestamp for quality assurance.</span>
          </div>
        </aside>
      </div>
    </section>
  )
}