
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'
function ProtectedRoutes({ children }) {
    const {isAuthenticated}=useUserContext()
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}
export default ProtectedRoutes