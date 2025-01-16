import React, { Suspense, lazy } from 'react';
import { useThemeStore } from './stores/themeStore';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

// Lazy load non-critical components
const ValueProposition = lazy(() => import('./components/ValueProposition'));
const Collections = lazy(() => import('./components/Collections'));
const FeaturedProducts = lazy(() => import('./components/FeaturedProducts'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Chat = lazy(() => import('./components/Chat'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-32 animate-pulse bg-gray-100 dark:bg-gray-800" role="presentation" />
);

function App() {
  const { theme } = useThemeStore();

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <Suspense fallback={<LoadingFallback />}>
        <ValueProposition />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Collections />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <FeaturedProducts />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <SocialProof />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Newsletter />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Chat />
      </Suspense>
    </div>
  );
}

export default App;