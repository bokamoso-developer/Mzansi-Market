import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">MZANSI MARKET ONLINE</p>

            <h1>
              Proudly Local.
              <br />
              Beautifully Made.
            </h1>

            <p className="hero-description">
              Discover quality products from South African sellers
              and support local businesses.
            </p>

            <button className="primary-button">
              Shop Local
            </button>
          </div>

          <div className="hero-placeholder">
            <span>Local products</span>
          </div>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;