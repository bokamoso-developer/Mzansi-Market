import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PackagePlus, Image as ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react'

export default function ProductFormPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API request persistence
    setTimeout(() => {
      setLoading(false)
      navigate('/admin/products')
    }, 600)
  }

  return (
    <div className="product-form-container">
      <div className="form-header-row">
        <div>
          <button 
            type="button" 
            className="link-button back-btn" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} /> Back to Catalog
          </button>
          <h1>Add New Product</h1>
          <p className="form-subtitle">Create a new item listing for the Mzansi Market catalog.</p>
        </div>
        <div className="form-status-indicator">
          <PackagePlus size={20} />
          <span>Draft Mode</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="panel form product-form">
        <div className="form-group-grid">
          <div className="form-field">
            <label htmlFor="name">Product Name</label>
            <input 
              id="name"
              name="name" 
              type="text"
              placeholder="e.g., Shweshwe Print Scatter Cushion" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-field">
            <label htmlFor="sku">SKU Code</label>
            <input 
              id="sku"
              name="sku" 
              type="text"
              placeholder="e.g., MZ-SHW-001" 
              value={formData.sku}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-group-grid">
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select 
              id="category"
              name="category" 
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Arts & Crafts">Arts & Crafts</option>
              <option value="Food & Beverage">Food & Beverage</option>
            </select>
          </div>

          <div className="form-row-split">
            <div className="form-field">
              <label htmlFor="price">Price (ZAR)</label>
              <input 
                id="price"
                name="price" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={formData.price}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-field">
              <label htmlFor="stock">Initial Stock</label>
              <input 
                id="stock"
                name="stock" 
                type="number" 
                placeholder="0" 
                value={formData.stock}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="description">Product Description</label>
          <textarea 
            id="description"
            name="description" 
            rows="5" 
            placeholder="Describe the product details, artisan background, and specifications..." 
            value={formData.description}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-field file-upload-wrapper">
          <label htmlFor="image-file">Product Imagery</label>
          <div className="file-dropzone">
            <ImageIcon size={24} className="upload-placeholder-icon" />
            <span>Drag and drop high-resolution asset, or browse files</span>
            <input 
              id="image-file"
              name="image" 
              type="file" 
              accept="image/*"
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="form-actions-footer">
          <button type="submit" disabled={loading} className="primary-link full">
            <CheckCircle size={18} />
            {loading ? 'Saving Product...' : 'Publish Product Listing'}
          </button>
        </div>
      </form>
    </div>
  )
}