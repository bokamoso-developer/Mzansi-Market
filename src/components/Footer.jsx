export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <strong>Mzansi Market</strong>
          <p>Connecting you with authentic local craftsmanship and independent creators across South Africa.</p>
        </div>
        
        <div className="footer-col">
          <h4>Explore</h4>
          <a href="/shop">All Products</a>
          <a href="/categories">Categories</a>
          <a href="/artisans">Our Artisans</a>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <a href="/shipping">Shipping & Returns</a>
          <a href="/track">Track Order</a>
          <a href="/contact">Support</a>
        </div>

        <div className="footer-col">
          <h4>Stay Connected</h4>
          <p>Get updates on new collections and local makers.</p>
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mzansi Market. All rights reserved.</p>
        <div className="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}