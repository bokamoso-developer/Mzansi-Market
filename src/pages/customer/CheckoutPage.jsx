export default function CheckoutPage() {
  return (
    <section className="container section">
      <h1>Checkout</h1>

      <div className="two-column">
        <div className="panel form">
          <h3>Delivery details</h3>
          <input placeholder="Full name" />
          <input placeholder="Phone number" />
          <input placeholder="Street address" />
          <input placeholder="City" />
          <input placeholder="Province" />
          <input placeholder="Postal code" />
        </div>

        <aside className="panel">
          <h3>Order summary</h3>
          <p>Payment will be connected later.</p>
          <button>Place order</button>
        </aside>
      </div>
    </section>
  )
}
