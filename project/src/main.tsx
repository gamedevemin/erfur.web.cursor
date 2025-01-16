import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Mobil cihaz kontrolü
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Sayfa yükleme durumu yönetimi
const pageLoadManager = {
  timeoutId: null as NodeJS.Timeout | null,
  
  init() {
    // Sayfa yüklenme başlangıcında görünürlüğü ayarla
    document.documentElement.style.opacity = '0';
    document.documentElement.style.visibility = 'visible';
    
    // Mobil cihazlar için daha uzun bekleme süresi
    const waitTime = isMobile ? 800 : 300;
    
    // Tüm kaynakların yüklenmesini bekle
    window.addEventListener('load', () => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      
      this.timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          document.documentElement.style.transition = 'opacity 0.3s ease-in';
          document.documentElement.style.opacity = '1';
        });
      }, waitTime);
    });
    
    // Hata durumunda kurtarma
    this.setupErrorRecovery();
  },
  
  setupErrorRecovery() {
    // 5 saniye içinde sayfa hala görünmez ise zorla göster
    setTimeout(() => {
      if (document.documentElement.style.opacity === '0') {
        console.warn('Forcing visibility after timeout');
        document.documentElement.style.opacity = '1';
      }
    }, 5000);
    
    // Sayfa görünmez durumdayken kapatılırsa state'i sıfırla
    window.addEventListener('beforeunload', () => {
      document.documentElement.style.opacity = '1';
      document.documentElement.style.visibility = 'visible';
    });
  }
};

// Sayfa yükleme yöneticisini başlat
pageLoadManager.init();

// React uygulamasını başlat
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

// Hydration için özel kontrol
const renderApp = () => {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Render error:', error);
    // Hata durumunda sayfayı görünür yap
    document.documentElement.style.opacity = '1';
  }
};

// Mobil cihazlar için gecikmeli render
if (isMobile) {
  setTimeout(renderApp, 100);
} else {
  renderApp();
}
