import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RequireOnboarding({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user?.onboardingCompleted) {
    return <Navigate to="/e2" replace state={{ from: location.pathname }} />
  }

  return children
}

