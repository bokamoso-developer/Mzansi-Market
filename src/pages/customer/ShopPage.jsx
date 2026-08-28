import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { products } from '../../data/products'
import { Sparkles, Tag, SlidersHorizontal, PackageSearch, ArrowUpDown, Flame, BadgePercent, Check, ChevronDown, LayoutGrid, List } from 'lucide-react'

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [onlyOnSale, setOnlyOnSale] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [inStockOnly, setInStockOnly] = useState(false)

  const categories = ['all', ...new Set(products.map((p) => p.category))]

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSale = onlyOnSale ? product.onSale : true
    const matchesStock = inStockOnly ? (product.stock > 0) : true

    return matchesSearch && matchesCategory && matchesSale && matchesStock
  })

  // Sorting logic
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0 // 'featured' order
  })

  return (
    <section className="container" style={{ padding: '32px 0' }}>
      {/* Top Banner / Breadcrumb / Header Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
          Home <span style={{ margin: '0 6px' }}>/</span> <strong>Shop Collection</strong>
        </div>
        
        {/* Main Search & Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>Shop Collection</h1>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px', margin: 0 }}>
              Showing {filteredProducts.length} results across all departments
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <input 
                className="search" 
                placeholder="Search products, brands and categories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: '36px', height: '40px', fontSize: '13px' }}
                aria-label="Search products"
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
                <PackageSearch size={16} />
              </span>
            </div>

            <div style={{ position: 'relative', width: '160px' }}>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="search"
                style={{ width: '100%', height: '40px', cursor: 'pointer', appearance: 'none', paddingRight: '32px', fontSize: '13px' }}
                aria-label="Sort products"
              >
                <option value="featured">Sort: Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none', display: 'grid', placeItems: 'center' }}>
                <ArrowUpDown size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid: Filters Sidebar on Left, Products on Right (Takealot Style) */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Sidebar Filters Facet Filter Panel */}
        <aside className="panel" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '700', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={16} /> Filter Results
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Narrow down your product search</div>
          </div>

          {/* Categories Facet */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '600', color: 'var(--green-dark)' }}>Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      background: 'transparent',
                      color: isActive ? 'var(--green)' : 'var(--green-dark)',
                      border: 'none',
                      padding: '4px 0',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: isActive ? '700' : '400',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'var(--transition)'
                    }}
                  >
                    <span>{cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                    {isActive && <Check size={14} />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick Filter Checkboxes (Takealot Style Sidebar Toggles) */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: '0', fontSize: '13px', fontWeight: '600', color: 'var(--green-dark)' }}>Offers & Availability</h4>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--green-dark)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={onlyOnSale} 
                onChange={(e) => setOnlyOnSale(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--green)', cursor: 'pointer' }}
              />
              <span>Special Offers / On Sale</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--green-dark)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={inStockOnly} 
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--green)', cursor: 'pointer' }}
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Reset Filters Button */}
          {(selectedCategory !== 'all' || onlyOnSale || inStockOnly || searchQuery !== '') && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setOnlyOnSale(false); setInStockOnly(false); setSortBy('featured'); }}
              style={{ background: 'var(--soft)', color: 'var(--green-dark)', border: '1px solid var(--border)', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', textAlign: 'center' }}
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Right Main Product Listing Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Active Filter Pills Bar & View Toggles */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              {selectedCategory !== 'all' && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', border: '1px solid var(--border)', color: 'var(--green-dark)' }}>
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>×</button>
                </span>
              )}
              {onlyOnSale && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--soft)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', border: '1px solid var(--border)', color: 'var(--green-dark)' }}>
                  On Sale
                  <button onClick={() => setOnlyOnSale(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>×</button>
                </span>
              )}
              {selectedCategory === 'all' && !onlyOnSale && (
                <span style={{ fontSize: '13px', color: 'var(--muted)' }}>All items displayed</span>
              )}
            </div>

            {/* View Mode Toggle (Grid / List) */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{ padding: '6px', background: viewMode === 'grid' ? 'var(--soft)' : 'transparent', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--green-dark)' }}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{ padding: '6px', background: viewMode === 'list' ? 'var(--soft)' : 'transparent', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--green-dark)' }}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Product Cards Container */}
          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? "product-grid" : ""} style={viewMode === 'grid' ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' } : { display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="panel" style={{ textAlign: 'center', padding: '64px 24px', background: 'white', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <PackageSearch size={40} style={{ color: 'var(--muted)' }} />
              <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '600' }}>No products found</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '380px', margin: 0 }}>
                We couldn't find anything matching your current filters or search query. Try clearing your search parameters.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setOnlyOnSale(false); setInStockOnly(false); setSortBy('featured'); }}
                style={{ marginTop: '8px', padding: '8px 16px', fontSize: '13px', background: 'var(--green)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}