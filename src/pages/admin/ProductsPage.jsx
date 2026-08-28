import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { money } from '../../utils'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="products-management-page">
      <div className="staff-heading">
        <div>
          <h1>Product Catalog</h1>
          <p className="section-subtitle">Manage inventory items, pricing, and catalog listings.</p>
        </div>
        <Link className="primary-link" to="/admin/products/new">
          <Plus size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="catalog-controls-bar panel">
        <div className="control-search-wrapper">
          <Search size={16} className="control-search-icon" />
          <input 
            type="search" 
            placeholder="Filter by product name or SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search catalog-filter-input"
            aria-label="Filter products"
          />
        </div>

        <div className="control-filter-wrapper">
          <Filter size={16} className="control-filter-icon" />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>Stock Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isLowStock = product.stock < 10
                return (
                  <tr key={product.id} className="table-row-interactive">
                    <td>
                      <div className="product-table-item">
                        <div className="product-table-thumb">
                          {product.image ? (
                            <img src={product.image} alt="" />
                          ) : (
                            <span>{product.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <span className="product-table-name">{product.name}</span>
                          <span className="product-table-sku">{product.sku || `SKU-${product.id}`}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge-category">{product.category}</span>
                    </td>
                    <td>
                      <span className="product-table-price">{money(product.price)}</span>
                    </td>
                    <td>
                      <span className={`stock-indicator ${isLowStock ? 'stock-low' : 'stock-normal'}`}>
                        <span className="stock-dot"></span>
                        {product.stock} units {isLowStock && '(Low)'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="table-action-buttons">
                        <Link to={`/product/${product.id}`} className="action-icon-btn" title="View product page" aria-label="View">
                          <Eye size={16} />
                        </Link>
                        <Link to={`/admin/products/${product.id}/edit`} className="action-icon-btn" title="Edit product" aria-label="Edit">
                          <Edit size={16} />
                        </Link>
                        <button className="action-icon-btn danger" title="Delete product" aria-label="Delete" onClick={() => alert(`Delete product ${product.id}`)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5" className="empty-table-state">
                  <p>No products match your current search criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}