import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import "../src/styles/index.scss"
import { BrowserRouter } from 'react-router-dom'
import { LogoutProvider } from './hooks/LogoutContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LogoutProvider>
        <App />
      </LogoutProvider>
    </BrowserRouter>
  </StrictMode>,
)
