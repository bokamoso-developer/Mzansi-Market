import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    register({ name, email })
    navigate('/')
  }

  return (
    <div 
      className="auth-page" 
      style={{
        backgroundImage: 'linear-gradient(rgba(23, 63, 59, 0.4), rgba(23, 63, 59, 0.6)), url("https://images.pexels.com/photos/36696496/pexels-photo-36696496.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <form className="auth-card" onSubmit={submit}>
        <h1>Create account</h1>
        <p>Register as a Mzansi Market customer.</p>

        <label>Full name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />

        <label>Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>Password</label>
        <input required type="password" placeholder="Create password" />

        <label>Confirm password</label>
        <input required type="password" placeholder="Confirm password" />

        <button type="submit">Create account</button>

        <p className="auth-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}