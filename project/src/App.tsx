import React from 'react';
import { useThemeStore } from './stores/themeStore';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Collections from './components/Collections';
import FeaturedProducts from './components/FeaturedProducts';
import SocialProof from './components/SocialProof';
import Newsletter from './components/Newsletter';
import Chat from './components/Chat';

function App() {
  const { theme } = useThemeStore();

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ValueProposition />
      <Collections />
      <FeaturedProducts />
      <SocialProof />
      <Newsletter />
      <Chat />
    </div>
  );
}

export default App;