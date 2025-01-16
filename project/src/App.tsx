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

// Simple loading component
const Loading = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const { theme } = useThemeStore();
  const [ready, setReady] = React.useState(false);
  const [contentVisible, setContentVisible] = React.useState(false);

  // Theme setup
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Initial setup
  React.useEffect(() => {
    // Prevent FOUC
    document.documentElement.style.visibility = 'hidden';
    
    // Ensure all critical resources are loaded
    Promise.all([
      // Add any critical resource loading here
      new Promise(resolve => setTimeout(resolve, 100))
    ]).then(() => {
      document.documentElement.style.visibility = 'visible';
      setReady(true);
      
      // Delay showing content for smooth transition
      requestAnimationFrame(() => {
        setTimeout(() => {
          setContentVisible(true);
        }, 50);
      });
    });

    return () => {
      document.documentElement.style.visibility = 'visible';
    };
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div
        className="transition-opacity duration-300 ease-in-out"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        <Navigation />
        
        {/* Critical content */}
        <div className="critical-content">
          <Hero />
          <Collections />
          <FeaturedProducts />
        </div>

        {/* Non-critical content */}
        <div className="non-critical-content">
          <Suspense fallback={null}>
            <ValueProposition />
          </Suspense>
          
          <Suspense fallback={null}>
            <SocialProof />
          </Suspense>
          
          <Suspense fallback={null}>
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
          
          <Suspense fallback={null}>
            <Chat />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;