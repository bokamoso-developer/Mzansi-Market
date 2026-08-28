import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { money } from '../utils'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <span>{product.name}</span>
        )}
      </Link>

      <div className="product-info">
        <div className="product-meta-top">
          <small>{product.category}</small>
          {product.rating && (
            <span className="product-rating" aria-label={`${product.rating} out of 5 stars`}>
              ★ {product.rating}
            </span>
          )}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        {product.artisan && (
          <p className="product-artisan">By {product.artisan}</p>
        )}

        <div className="product-footer">
          <strong>{money(product.price)}</strong>
          <button onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}