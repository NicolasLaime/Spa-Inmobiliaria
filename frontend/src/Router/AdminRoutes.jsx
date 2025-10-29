import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import Dashboard from '../pages/admin/Dashboard'
import Login from '../pages/public/Login'

// Componente para proteger rutas admin y envolverlas en DashboardLayout
import DashboardLayout from '../layouts/DashboardLayout'

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuthStore()
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return user ? <DashboardLayout>{children}</DashboardLayout> : <Login />
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } 
      />
    </Routes>
  )
}

export default AdminRoutes
