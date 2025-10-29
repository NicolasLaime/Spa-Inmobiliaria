import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import AdminRoutes from './AdminRoutes'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Rutas de administración */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRouter