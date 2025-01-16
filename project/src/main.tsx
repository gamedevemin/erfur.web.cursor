import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Yükleme göstergesi kontrolü
const hideLoader = () => {
  const loader = document.getElementById('loading');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.3s ease';
    setTimeout(() => loader.remove(), 300);
  }
};

// React uygulamasını başlat
const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  try {
    // React uygulamasını render et
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Yükleme tamamlandığında
    window.requestAnimationFrame(() => {
      hideLoader();
    });
  } catch (error) {
    console.error('React render error:', error);
    hideLoader();
  }
};

// Sayfa yükleme kontrolü
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
