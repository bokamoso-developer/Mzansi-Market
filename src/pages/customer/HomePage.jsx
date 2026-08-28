import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { products } from '../../data/products'

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <>
      <section className="hero container">
        <div>
 
          <h1>Elevate Your<br />Everyday</h1>
          <p>Discover thoughtfully curated products that combine quality, style, and functionality.</p>
          <Link className="primary-link" to="/shop">Shop Now &rarr;</Link>
        </div>
        <div className="hero-art" style={{ padding: '0', overflow: 'hidden' }}>
          <img 
            src="https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg" 
            alt="Elevate Your Everyday Collection" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <h2>Featured products</h2>
          </div>
          <Link to="/shop" className="link-button" style={{ fontWeight: '600' }}>View all products &rarr;</Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}