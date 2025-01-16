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

// Improved loading fallback component
const LoadingFallback = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center bg-background">
    <div className="space-y-4 w-full max-w-7xl mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded-md animate-pulse w-1/3" />
      <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2" />
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse mt-8" />
    </div>
  </div>
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
      
      <main>
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
      </main>
      
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </div>
  );
}

export default App;