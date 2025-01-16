import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Menu, 
  Search, 
  User, 
  Sun, 
  Moon, 
  X,
  ChevronRight
} from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { useCartStore } from '../stores/cartStore';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const { theme, toggleTheme } = useThemeStore();
  const { items } = useCartStore();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              aria-label="Ana menüyü aç"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            
            <div className="hidden lg:flex lg:space-x-8">
              <a href="#collections" className="nav-link">Koleksiyonlar</a>
              <a href="#new" className="nav-link">Yeni Gelenler</a>
              <a href="#accessories" className="nav-link">Aksesuarlar</a>
              <a href="#jewelry" className="nav-link">Takılar</a>
            </div>
          </div>

          {/* Logo */}
          <div className="text-2xl font-serif text-foreground">ERFUR</div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent"
              aria-label="Tema değiştir"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-foreground" />
              )}
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-md hover:bg-accent"
              aria-label="Arama yap"
            >
              <Search className="h-5 w-5 text-foreground" />
            </button>

            <button
              className="p-2 rounded-md hover:bg-accent"
              aria-label="Hesabım"
            >
              <User className="h-5 w-5 text-foreground" />
            </button>

            <button
              className="p-2 rounded-md hover:bg-accent"
              aria-label="Favorilerim"
            >
              <Heart className="h-5 w-5 text-foreground" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-md hover:bg-accent relative"
              aria-label="Sepetim"
            >
              <ShoppingBag className="h-5 w-5 text-foreground" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-50 transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-serif">Menü</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-md hover:bg-accent"
            aria-label="Menüyü kapat"
          >
            <X className="h-6 w-6 text-foreground" />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <a href="#collections" className="block py-2 text-lg hover:text-primary">
              Koleksiyonlar <ChevronRight className="inline-block h-5 w-5 ml-2" />
            </a>
            <a href="#new" className="block py-2 text-lg hover:text-primary">
              Yeni Gelenler <ChevronRight className="inline-block h-5 w-5 ml-2" />
            </a>
            <a href="#accessories" className="block py-2 text-lg hover:text-primary">
              Aksesuarlar <ChevronRight className="inline-block h-5 w-5 ml-2" />
            </a>
            <a href="#jewelry" className="block py-2 text-lg hover:text-primary">
              Takılar <ChevronRight className="inline-block h-5 w-5 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 top-3.5"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-xl font-serif">Sepetim ({items.length})</span>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-md hover:bg-accent"
              aria-label="Sepeti kapat"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Sepetiniz boş
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart items will be rendered here */}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4">
              <button className="w-full btn-primary">
                Sepeti Onayla
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 