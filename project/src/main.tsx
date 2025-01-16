import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Add preload class to prevent transitions during initial load
document.documentElement.classList.add('preload');

// Remove preload class after initial render
window.addEventListener('load', () => {
  document.documentElement.classList.remove('preload');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
