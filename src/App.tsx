import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ServiceDetail from './pages/services/ServiceDetail'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
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
          {/* 404 catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App