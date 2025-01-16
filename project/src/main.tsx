import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// React uygulamasını başlat
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

// Uygulamayı render et
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
