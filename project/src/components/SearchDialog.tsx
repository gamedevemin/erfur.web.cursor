import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../types/product';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = ['all', 'kadin', 'erkek', 'aksesuar'];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
                         product.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const price = parseInt(product.price.replace('₺', ''));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesQuery && matchesCategory && matchesPrice;
    });

    setResults(filtered);
  }, [query, selectedCategory, priceRange]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-lg shadow-xl">
        {/* Arama Başlığı */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün, kategori veya marka ara..."
            className="flex-1 ml-3 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Filtreler */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
          {/* Kategori Filtreleri */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-transparent text-gray-900 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Fiyat Aralığı */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Fiyat:</span>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-24"
            />
            <span className="text-sm text-gray-900 dark:text-white">₺{priceRange[0]}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-24"
            />
            <span className="text-sm text-gray-900 dark:text-white">₺{priceRange[1]}</span>
          </div>
        </div>

        {/* Sonuçlar */}
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 p-4">
              {results.map((product) => (
                <a
                  key={product.id}
                  href={`/urun/${product.id}`}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.price}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Sonuç bulunamadı
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Aramaya başlamak için bir şeyler yazın
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 