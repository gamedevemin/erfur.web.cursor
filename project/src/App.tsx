import React, { Suspense, lazy } from 'react';
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
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Mount control
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Critical content */}
      <div className="critical-content">
        <Hero />
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
    </div>
  );
}

export default App;