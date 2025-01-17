import React, { Suspense, lazy, useLayoutEffect } from 'react';
import { useThemeStore } from './stores/themeStore';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Collections from './components/Collections';
import FeaturedProducts from './components/FeaturedProducts';

// Lazy components
const ValueProposition = lazy(() => import('./components/ValueProposition'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Chat = lazy(() => import('./components/Chat'));

// Fallback component
const LoadingFallback = () => null;

function App() {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  // Theme setup
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Viewport ve mount kontrolü
  useLayoutEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // İlk yükleme için viewport'u ayarla
    updateViewportHeight();

    // Resize ve orientation değişikliklerini dinle
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateViewportHeight, 100);
    });

    // Component'i mount et
    setMounted(true);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  // App Shell
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      {/* App Shell - Critical Content */}
      <div className="app-shell">
        <Navigation />
        <Hero />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="critical-content">
          <Collections />
          <FeaturedProducts />
        </div>

        {/* Non-critical content */}
        <div className="non-critical-content">
          <Suspense fallback={<LoadingFallback />}>
            <ValueProposition />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <SocialProof />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Newsletter 
              onSubscribe={async () => {
                if (!('Notification' in window)) return;
                try {
                  await Notification.requestPermission();
                } catch (error) {
                  console.error('Notification error:', error);
                }
              }} 
            />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Chat />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;