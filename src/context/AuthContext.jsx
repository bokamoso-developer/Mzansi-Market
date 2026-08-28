import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const ROLES = {
  CUSTOMER: 'customer',
  PRODUCT_ADMIN: 'product_admin',
  FULFILMENT: 'fulfilment',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = ({ name, role }) => {
    setUser({
      id: Date.now(),
      name: name || 'Demo User',
      role,
    })
  }

  const register = ({ name, email }) => {
    setUser({
      id: Date.now(),
      name,
      email,
      role: ROLES.CUSTOMER,
    })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
