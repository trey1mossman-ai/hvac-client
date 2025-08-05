import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import TileInstallation from './pages/services/TileInstallation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services">
          <Route path="tile-installation-chicago-il" element={<TileInstallation />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App