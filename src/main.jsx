import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'
import { ConfigProvider } from './config/ConfigContext'

const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      {isAdmin ? <Admin /> : <App />}
    </ConfigProvider>
  </StrictMode>,
)
