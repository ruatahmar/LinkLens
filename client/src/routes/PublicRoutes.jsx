// src/routes/PublicRoute.jsx
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"

export default function PublicRoute() {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <div>Loading...</div>

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}
