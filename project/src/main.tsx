import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Add preload class to prevent transitions during initial load
document.documentElement.classList.add('preload');

// Create a container for the app
const container = document.getElementById('root')!;

// Create root with options
const root = ReactDOM.createRoot(container, {
  onRecoverableError: (error) => {
    console.warn('Recoverable error:', error);
  },
});

// Initial render with strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove preload class after hydration is complete
window.requestAnimationFrame(() => {
  window.requestAnimationFrame(() => {
    document.documentElement.classList.remove('preload');
  });
});
