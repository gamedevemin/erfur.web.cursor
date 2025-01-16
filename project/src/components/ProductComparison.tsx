import { useState } from 'react';
import { X, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import type { Product } from '../types/product';
import { products } from '../data/products';

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductComparison({ isOpen, onClose }: ProductComparisonProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const { addItem } = useCartStore();

  const addToComparison = (product: Product) => {
    if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const getAvailableProducts = () => {
    return products.filter(p => !selectedProducts.some(sp => sp.id === p.id));
  };

  const calculateDiscountedPrice = (price: string, discount?: number) => {
    if (!discount) return price;
    const numericPrice = parseInt(price.replace('₺', ''));
    const discountedPrice = numericPrice - (numericPrice * discount) / 100;
    return `₺${discountedPrice}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-6xl rounded-lg shadow-xl">
        {/* Başlık */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Ürün Karşılaştırma
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Karşılaştırma Alanı */}
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ürün Slotları */}
            {Array.from({ length: 4 }).map((_, index) => {
              const product = selectedProducts[index];
              
              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  {product ? (
                    <div className="space-y-4">
                      {/* Ürün Görseli */}
                      <div className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-center object-cover"
                        />
                        <button
                          onClick={() => removeFromComparison(product.id)}
                          className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Ürün Bilgileri */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          {product.discount ? (
                            <>
                              <span className="text-sm font-bold text-red-600">
                                {calculateDiscountedPrice(product.price, product.discount)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {product.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Özellikler */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Stok</span>
                          <span className={`font-medium ${
                            product.stock > 5
                              ? 'text-green-600'
                              : product.stock > 0
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}>
                            {product.stock > 5
                              ? 'Stokta'
                              : product.stock > 0
                              ? `Son ${product.stock} ürün`
                              : 'Tükendi'}
                          </span>
                        </div>
                        {product.discount && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">İndirim</span>
                            <span className="text-red-600">%{product.discount}</span>
                          </div>
                        )}
                      </div>

                      {/* Sepete Ekle */}
                      <button
                        onClick={() => addItem(product)}
                        disabled={product.stock === 0}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          product.stock === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Sepete Ekle</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const availableProducts = getAvailableProducts();
                        if (availableProducts.length > 0) {
                          addToComparison(availableProducts[0]);
                        }
                      }}
                      className="w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary transition-colors"
                    >
                      <Plus className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Ürün Ekle
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ürün Seçimi */}
          {selectedProducts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Karşılaştırılabilir Ürünler
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {getAvailableProducts().slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToComparison(product)}
                    className="group relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                        <Plus className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 