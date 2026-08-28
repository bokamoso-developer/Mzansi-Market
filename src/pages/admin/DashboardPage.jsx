import { products } from '../../data/products'
import { Package, AlertTriangle, Layers, Percent, TrendingUp, ArrowUpRight } from 'lucide-react'

export default function DashboardPage() {
  const lowStock = products.filter((p) => p.stock < 10).length
  const uniqueCategories = [...new Set(products.map(p => p.category))].length
  const totalValue = products.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount)
  }

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header-block">
        <div>
          <h1>Catalog Overview</h1>
          <p className="dashboard-subtitle">Real-time inventory metrics and stock health indicators.</p>
        </div>
        <div className="dashboard-action-badge">
          <TrendingUp size={16} />
          <span>Catalog Live</span>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-card-header">
            <span>Total Products</span>
            <Package size={18} className="stat-icon text-primary" />
          </div>
          <strong>{products.length}</strong>
          <span className="stat-trend positive"><ArrowUpRight size={12} /> Active SKUs</span>
        </div>

        <div className="stat-card alert-card">
          <div className="stat-card-header">
            <span>Low Stock Items</span>
            <AlertTriangle size={18} className="stat-icon text-warning" />
          </div>
          <strong>{lowStock}</strong>
          <span className="stat-trend warning">Requires restocking</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span>Categories</span>
            <Layers size={18} className="stat-icon text-info" />
          </div>
          <strong>{uniqueCategories}</strong>
          <span className="stat-trend neutral">Active departments</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span>Promotions</span>
            <Percent size={18} className="stat-icon text-success" />
          </div>
          <strong>0</strong>
          <span className="stat-trend neutral">No active campaigns</span>
        </div>
      </div>

      <div className="dashboard-secondary-section">
        <div className="panel catalog-valuation-panel">
          <div className="panel-header">
            <h3>Inventory Valuation</h3>
            <span className="valuation-amount">{formatCurrency(totalValue)}</span>
          </div>
          <p className="panel-description">Total combined market value of current on-hand inventory across all active categories.</p>
        </div>
      </div>
    </div>
  )
}