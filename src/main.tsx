import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import ScrollToTop from './components/common/ScrollToTop'
import { initWebVitals } from './utils/webVitals'
import './styles/index.css'
import './styles/components.css'
import './styles/responsive.css'

// Initialize Web Vitals monitoring
initWebVitals();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)