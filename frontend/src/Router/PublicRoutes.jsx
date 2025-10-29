import { Routes, Route } from 'react-router-dom'
import Home from '../pages/public/Home'
import Login from '../pages/public/Login'
import PropertyDetail from '../pages/public/PropertyDetail'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />

    </Routes>
  )
}

export default PublicRoutes