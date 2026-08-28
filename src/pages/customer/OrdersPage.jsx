import { orders } from '../../data/orders'
import { money } from '../../utils'

export default function OrdersPage() {
  return (
    <section className="container" style={{ padding: '48px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '28px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>My orders</h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>Track your past purchases and fulfillment status.</p>
      </div>

      <div className="table-card" style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Fulfilment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: '600', color: 'var(--green-dark)' }}>{order.id}</td>
                <td>{money(order.total)}</td>
                <td>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: '500',
                    background: order.paymentStatus === 'Paid' ? '#e6f4ea' : 'var(--soft)',
                    color: order.paymentStatus === 'Paid' ? '#137333' : 'var(--muted)'
                  }}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: '500',
                    background: order.fulfilmentStatus === 'Fulfilled' ? '#e6f4ea' : 'var(--soft)',
                    color: order.fulfilmentStatus === 'Fulfilled' ? '#137333' : 'var(--muted)'
                  }}>
                    {order.fulfilmentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}