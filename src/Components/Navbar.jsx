import { Search, ShoppingBag, UserRound, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="brand-mark">M</div>

        <div className="brand-text">
          <span>Mzansi</span>
          <strong>MARKET</strong>
          <small>ONLINE</small>
        </div>
      </Link>

      <div className="search-wrapper">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search products, categories or sellers"
        />

        <button className="filter-button" aria-label="Open filters">
          <SlidersHorizontal size={19} />
        </button>
      </div>

      <nav className="nav-actions">
        <Link to="/cart" aria-label="Shopping cart">
          <ShoppingBag size={25} />
          <span className="cart-count">2</span>
        </Link>

        <Link to="/account" aria-label="Account">
          <UserRound size={25} />
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;