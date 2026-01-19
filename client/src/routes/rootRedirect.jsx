import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../auth/authContext"

export default function RootRedirect() {
  const { user, loading } = useContext(AuthContext)

  if (loading) return null 

  return user
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />
}
