import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ManufactureLoginContext from './components/manufacturer/LoginContext.jsx';
createRoot(document.getElementById('root')).render(
  <ManufactureLoginContext>
    <StrictMode>
      <App />
    </StrictMode>,
  </ManufactureLoginContext>
)
