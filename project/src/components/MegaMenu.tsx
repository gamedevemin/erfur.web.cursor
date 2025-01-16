import { useState } from 'react';
import { ChevronDown, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

interface MenuItem {
  id: number;
  title: string;
  items: {
    id: number;
    name: string;
    description?: string;
    image?: string;
    link: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: 'Kadın',
    items: [
      {
        id: 1,
        name: 'Yeni Gelenler',
        description: 'En yeni kadın koleksiyonu',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3',
        link: '/kadin/yeni-gelenler'
      },
      {
        id: 2,
        name: 'Üst Giyim',
        description: 'Bluz, gömlek, t-shirt ve dahası',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3',
        link: '/kadin/ust-giyim'
      },
      // ... diğer alt kategoriler
    ]
  },
  {
    id: 2,
    title: 'Erkek',
    items: [
      {
        id: 1,
        name: 'Yeni Gelenler',
        description: 'En yeni erkek koleksiyonu',
        image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3',
        link: '/erkek/yeni-gelenler'
      },
      {
        id: 2,
        name: 'Dış Giyim',
        description: 'Mont, ceket, trençkot ve dahası',
        image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3',
        link: '/erkek/dis-giyim'
      },
      // ... diğer alt kategoriler
    ]
  },
  // ... diğer ana kategoriler
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-primary dark:text-white">
              LOGO
            </a>
          </div>

          {/* Ana Menü */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                  <span>{item.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Mega Menü Dropdown */}
                {activeMenu === item.id && (
                  <div className="absolute top-full left-0 w-screen max-w-7xl bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.id}
                          href={subItem.link}
                          className="group"
                        >
                          {subItem.image && (
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4">
                              <img
                                src={subItem.image}
                                alt={subItem.name}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary">
                            {subItem.name}
                          </h3>
                          {subItem.description && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {subItem.description}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sağ Taraf */}
          <div className="flex items-center space-x-4">
            {/* Tema Değiştirme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Mobil Menü Butonu */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="sr-only">Menüyü aç</span>
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 