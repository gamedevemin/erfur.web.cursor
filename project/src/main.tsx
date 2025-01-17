import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Mobil cihaz kontrolü
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Performans izleme
const reportPerformance = () => {
  if ('performance' in window) {
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
    if (fcp) {
      console.log('First Contentful Paint:', fcp.startTime);
    }
  }
};

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
    // Mobil cihazlar için ek optimizasyonlar
    if (isMobile) {
      // Touch olaylarını optimize et
      document.addEventListener('touchstart', () => {}, { passive: true });
      
      // Scroll performansını artır
      (rootElement.style as any)['-webkit-overflow-scrolling'] = 'touch';
    }

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
      reportPerformance();
    });

    // Service Worker kayıt
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
          console.error('SW registration failed:', error);
        });
      });
    }
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
