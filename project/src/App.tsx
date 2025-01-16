import React, { Suspense, lazy, useLayoutEffect } from 'react';
import { useThemeStore } from './stores/themeStore';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Collections from './components/Collections';
import FeaturedProducts from './components/FeaturedProducts';

// Lazy load components
const ValueProposition = lazy(() => import('./components/ValueProposition'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Chat = lazy(() => import('./components/Chat'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  // Theme effect
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Initial loading effect
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Increased timeout for better stability

    return () => clearTimeout(timer);
  }, []);

  // Hydration effect
  useLayoutEffect(() => {
    // Ensure DOM is fully ready
    requestAnimationFrame(() => {
      setIsHydrated(true);
    });
  }, []);

  // Mount effect
  React.useEffect(() => {
    setIsMounted(true);
    
    // Prevent scroll during initial load
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Early return for loading state
  if (!isHydrated || isLoading || !isMounted) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Bildirim izni isteğini kullanıcı etkileşimine bağlama
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return;
    
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Critical sections with controlled render */}
      <div style={{ 
        opacity: isHydrated && isMounted ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <Hero />
        <Collections />
        <FeaturedProducts />
      </div>
      
      {/* Non-critical sections lazy loaded */}
      <Suspense fallback={<LoadingFallback />}>
        <ValueProposition />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <SocialProof />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Newsletter onSubscribe={requestNotificationPermission} />
      </Suspense>
      
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </div>
  );
}

export default App;