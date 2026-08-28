import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { money } from '../../utils'
import { ShoppingBag, Trash2, ArrowRight, Plus, Minus, ShieldCheck, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  
  const subtotal = total
  const shippingFee = subtotal > 1000 ? 0 : 120 // Free shipping over R1,000 standard
  const finalTotal = subtotal + (items.length > 0 ? shippingFee : 0)

  return (
    <section className="container" style={{ padding: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '28px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>Shopping Cart</h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>Review your items and proceed safely to checkout.</p>
        </div>
        <Link to="/shop" className="link-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="panel" style={{ textAlign: 'center', padding: '64px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <ShoppingBag size={48} style={{ color: 'var(--muted)' }} />
          <h2 style={{ margin: 0, fontSize: '20px', color: 'var(--green-dark)' }}>Your cart is currently empty</h2>
          <p style={{ margin: 0, color: 'var(--muted)', maxWidth: '400px', fontSize: '14px' }}>Discover authentic local craftsmanship and independent creators at Mzansi Market.</p>
          <Link className="primary-link" to="/shop" style={{ marginTop: '8px' }}>Explore Catalog</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr', gap: '32px', alignItems: 'start' }}>
          <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '16px 24px', background: 'var(--soft)', borderBottom: '1px solid var(--border)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', fontWeight: '600' }}>
              <span>Item Description</span>
              <span style={{ textAlign: 'center' }}>Quantity</span>
              <span style={{ textAlign: 'right' }}>Subtotal</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '20px 24px', borderBottom: '1px solid var(--border)', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'var(--soft)', display: 'grid', placeItems: 'center', overflow: 'hidden', flexShrink: '0', border: '1px solid var(--border)' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontWeight: '600', color: 'var(--muted)' }}>{item.name.charAt(0)}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <Link to={`/product/${item.id}`} style={{ fontWeight: '600', fontSize: '14px', color: 'var(--green-dark)' }}>{item.name}</Link>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.category}</span>
                      <span style={{ fontSize: '12px', color: 'var(--green)', fontWeight: '500' }}>{money(item.price)} each</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => updateQuantity ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                      aria-label="Decrease quantity"
                      style={{ padding: '6px', background: 'var(--soft)', color: 'var(--green-dark)', borderRadius: '4px', display: 'grid', placeItems: 'center', boxShadow: 'none' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      style={{ padding: '6px', background: 'var(--soft)', color: 'var(--green-dark)', borderRadius: '4px', display: 'grid', placeItems: 'center', boxShadow: 'none' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--green-dark)' }}>{money(item.price * item.quantity)}</strong>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      style={{ background: 'transparent', color: 'var(--muted)', padding: '6px', boxShadow: 'none' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: 'var(--green-dark)' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--muted)' }}>
                <span>Subtotal</span>
                <span style={{ color: 'var(--green-dark)', fontWeight: '500' }}>{money(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--muted)' }}>
                <span>Estimated Shipping</span>
                <span style={{ color: 'var(--green-dark)', fontWeight: '500' }}>{shippingFee === 0 ? <strong style={{ color: '#137333' }}>FREE</strong> : money(shippingFee)}</span>
              </div>
              {shippingFee > 0 && (
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--gold)', fontWeight: '500' }}>Add {money(1000 - subtotal)} more for free nationwide delivery.</p>
              )}
            </div>

            <div style={{ height: '1px', background: 'var(--border)' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--green-dark)' }}>Total Due</span>
              <strong style={{ fontSize: '20px', color: 'var(--green)', fontWeight: '700' }}>{money(finalTotal)}</strong>
            </div>

            <Link className="primary-link full" to="/checkout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}>
              <span>Proceed to Secure Checkout</span>
              <ArrowRight size={18} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--soft)', padding: '12px', borderRadius: '8px', fontSize: '13px', color: 'var(--green-dark)', fontWeight: '500' }}>
              <ShieldCheck size={16} style={{ color: '#137333', flexShrink: 0 }} />
              <span>Secure South African Payment Gateway</span>
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}