import React, { Suspense, lazy } from 'react';
import { useThemeStore } from './stores/themeStore';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Collections from './components/Collections';
import FeaturedProducts from './components/FeaturedProducts';

// Lazy load only non-critical components
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

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  React.useEffect(() => {
    // Simüle edilmiş minimum yükleme süresi
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Critical sections loaded immediately */}
      <Collections />
      <FeaturedProducts />
      
      {/* Non-critical sections lazy loaded */}
      <Suspense fallback={<LoadingFallback />}>
        <ValueProposition />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <SocialProof />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Newsletter />
      </Suspense>
      
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </div>
  );
}

export default App;