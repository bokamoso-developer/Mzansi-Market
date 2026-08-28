import { useParams, Link } from 'react-router-dom'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { money } from '../../utils'
import { Check, ShieldCheck, Truck, RotateCcw, Star, ShoppingCart, Heart, Share2, Award, Zap } from 'lucide-react'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="container" style={{ padding: '64px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ color: 'var(--muted)', marginTop: '8px' }}>The product you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to="/shop" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--green)', fontWeight: '600' }}>← Back to Shop</Link>
      </div>
    )
  }

  const isAvailable = product.stock > 0

  return (
    <section className="container" style={{ padding: '32px 0' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
        <Link to="/" style={{ color: 'var(--muted)' }}>Home</Link> <span style={{ margin: '0 6px' }}>/</span> 
        <Link to="/shop" style={{ color: 'var(--muted)' }}>{product.category}</Link> <span style={{ margin: '0 6px' }}>/</span> 
        <strong style={{ color: 'var(--green-dark)' }}>{product.name}</strong>
      </div>

      {/* Main Product Layout (Takealot Detail Style: Image, Info, Buy Box) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start', '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } }}>
        
        {/* Left Column: Image Showcase & Overview Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Large Image Container */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--soft)', color: 'var(--green-dark)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--border)' }}>
              {product.category}
            </span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--green-dark)', textAlign: 'center', maxWidth: '400px' }}>
              {product.name}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>Official Branded Stock Item</div>
          </div>

          {/* Product Specifications / Description Card */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--green-dark)' }}>Product Details & Features</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Genuine {product.name} sourced directly from verified manufacturers and distributors. Built for quality performance, reliability, and everyday convenience. Fully backed by standard supplier warranties.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px', fontSize: '13px' }}>
              <div><strong style={{ color: 'var(--green-dark)' }}>Brand/Item:</strong> {product.name.split(' ')[0]}</div>
              <div><strong style={{ color: 'var(--green-dark)' }}>Category:</strong> {product.category}</div>
              <div><strong style={{ color: 'var(--green-dark)' }}>SKU Reference:</strong> MZ-{product.id}-ZAR</div>
              <div><strong style={{ color: 'var(--green-dark)' }}>Condition:</strong> Brand New</div>
            </div>
          </div>
        </div>

        {/* Right Column: Takealot Style Buy Box Sidebar */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>{product.category}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }} title="Add to Wishlist"><Heart size={18} /></button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }} title="Share Product"><Share2 size={18} /></button>
              </div>
            </div>
            
            <h1 style={{ margin: '8px 0 12px 0', fontSize: '20px', fontWeight: '700', color: 'var(--green-dark)', lineHeight: '1.3' }}>
              {product.name}
            </h1>

            {/* Rating Stars Mock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />
              ))}
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: '6px' }}>(4.8 / 38 reviews)</span>
            </div>

            {/* Price Box */}
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--green-dark)', marginBottom: '8px' }}>
              {money(product.price)}
            </div>

            {/* Stock Status Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: isAvailable ? 'var(--green)' : '#d9534f', fontWeight: '600', background: isAvailable ? 'var(--soft)' : '#fdf2f2', padding: '4px 10px', borderRadius: '8px', border: `1px solid ${isAvailable ? 'var(--border)' : '#f5c6cb'}` }}>
              {isAvailable ? <Check size={14} /> : null}
              {isAvailable ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <button 
              onClick={() => addToCart(product)}
              disabled={!isAvailable}
              style={{
                background: isAvailable ? 'var(--green)' : 'var(--muted)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: isAvailable ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'var(--transition)'
              }}
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>

          {/* Delivery & Trust Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px', fontSize: '13px', color: 'var(--muted)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Truck size={18} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Door Delivery:</strong> Available across South Africa. Standard & express shipping options at checkout.</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <RotateCcw size={18} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Easy Returns:</strong> 7-Day hassle-free return policy if you change your mind.</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
              <div><strong>Secure Warranty:</strong> Verified authentic manufacturer warranty included.</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}