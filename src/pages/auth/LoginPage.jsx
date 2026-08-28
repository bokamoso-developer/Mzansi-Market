import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROLES, useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [role, setRole] = useState(ROLES.CUSTOMER)
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    login({ name, role })

    if (role === ROLES.PRODUCT_ADMIN) navigate('/admin')
    else if (role === ROLES.FULFILMENT) navigate('/fulfilment')
    else navigate('/')
  }

  return (
    <div 
      className="auth-page" 
      style={{
        backgroundImage: 'linear-gradient(rgba(23, 63, 59, 0.4), rgba(23, 63, 59, 0.6)), url("https://images.pexels.com/photos/2475261/pexels-photo-2475261.jpeg")',
       
        backgroundPosition: 'center'
      }}
    >
      <form className="auth-card" onSubmit={submit}>
        <h1>Welcome back</h1>
        <p>Sign in to Mzansi Market.</p>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <label>Email</label>
        <input type="email" placeholder="you@example.com" required />

        <label>Password</label>
        <input type="password" placeholder="Password" required />

        <label>Demo role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value={ROLES.CUSTOMER}>Customer</option>
          <option value={ROLES.PRODUCT_ADMIN}>Product Administrator</option>
          <option value={ROLES.FULFILMENT}>Fulfilment Employee</option>
        </select>

        <button type="submit">Login</button>

        <p className="auth-link">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}