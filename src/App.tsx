import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ServiceDetail from './pages/services/ServiceDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        {/* Direct service routes without /services/ prefix */}
        <Route path="luxury-vinyl-flooring-installation-chicago-il" element={<ServiceDetail />} />
        <Route path="laminate-flooring-installation-chicago-il" element={<ServiceDetail />} />
        <Route path="hardwood-floor-installation-chicago-il" element={<ServiceDetail />} />
        <Route path="tile-installation-chicago-il" element={<ServiceDetail />} />
        <Route path="shower-tile-installation-chicago-il" element={<ServiceDetail />} />
        <Route path="carpet-tile-installation-chicago-il" element={<ServiceDetail />} />
        <Route path="backsplash-installation-chicago-il" element={<ServiceDetail />} />
        <Route path="stone-tile-installation-chicago-il" element={<ServiceDetail />} />
        {/* Keep the dynamic route as fallback */}
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path=":slug" element={<ServiceDetail />} />
      </Route>
    </Routes>
  )
}

export default App