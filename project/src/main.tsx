import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Mobil cihaz kontrolü
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
    // Root element görünürlüğünü ayarla
    rootElement.style.opacity = '0';
    rootElement.style.transition = 'opacity 0.5s ease';

    // React uygulamasını render et
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Yükleme tamamlandığında
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        rootElement.style.opacity = '1';
        hideLoader();
      });
    });
  } catch (error) {
    console.error('React render error:', error);
    // Hata durumunda yükleme göstergesini kaldır
    hideLoader();
  }
};

// Mobil cihazlar için gecikmeli başlatma
if (isMobile) {
  // Mobil cihazlarda DOM'un hazır olmasını bekle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(startApp, 100);
    });
  } else {
    setTimeout(startApp, 100);
  }
} else {
  // Masaüstünde hemen başlat
  startApp();
}
