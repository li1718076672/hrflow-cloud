import { Navigate } from 'react-router-dom'
import { getUser } from '../store/auth'

export const PrivateRoute = ({ children }) => {
  const user = getUser()
  return user ? children : <Navigate to="/login" />
}