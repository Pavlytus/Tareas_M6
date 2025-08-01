import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CounterGame from "./CounterGame";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CounterGame />
  </StrictMode>,
)
