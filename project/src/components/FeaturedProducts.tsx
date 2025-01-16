import { lazy, Suspense, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';
import type { Product } from '../types/product';

const QuickViewModal = lazy(() => import('./QuickViewModal'));

// Renkli arka planlar için yardımcı fonksiyon
const getColorByIndex = (index: number) => {
  const colors = [
    'bg-gradient-to-br from-pink-500 to-rose-500',
    'bg-gradient-to-br from-blue-500 to-indigo-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-purple-500 to-violet-500',
    'bg-gradient-to-br from-yellow-500 to-amber-500',
    'bg-gradient-to-br from-red-500 to-rose-500',
    'bg-gradient-to-br from-teal-500 to-cyan-500',
    'bg-gradient-to-br from-orange-500 to-red-500'
  ];
  return colors[index % colors.length];
};

export default function FeaturedProducts() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { addItem, isInCart } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      discount: product.discount,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Öne Çıkan Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden ${getColorByIndex(index)}`}>
                <div className="w-full h-full flex items-center justify-center p-6">
                  <div className="text-white text-xl font-bold text-center">
                    {product.name}
                  </div>
                </div>
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-white text-red-500 px-2 py-1 rounded-md text-sm font-medium">
                    -{product.discount}%
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 pointer-events-none" />
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto hover:pointer-events-auto"
                >
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200">
                    Hızlı Görünüm
                  </span>
                </button>
              </div>
              <div className="p-4 relative z-10">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {product.discount ? (
                      <>
                        <span className="text-lg font-bold text-red-600">
                          {(() => {
                            const price = parseInt(product.price.replace('₺', ''));
                            const discounted = price - (price * product.discount) / 100;
                            return `₺${discounted}`;
                          })()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">{product.price}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-lg ${
                      wishlist.includes(product.id)
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Stok Durumu:{' '}
                  <span
                    className={`font-medium ${
                      product.stock > 5
                        ? 'text-green-600'
                        : product.stock > 0
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {product.stock > 5
                      ? 'Stokta'
                      : product.stock > 0
                      ? `Son ${product.stock} ürün`
                      : 'Tükendi'}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : isInCart(product.id)
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.stock === 0
                    ? 'Tükendi'
                    : isInCart(product.id)
                    ? 'Sepete Eklendi'
                    : 'Sepete Ekle'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {quickViewProduct && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        }>
          <QuickViewModal
            product={quickViewProduct}
            isInCart={isInCart}
            wishlist={wishlist}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={toggleWishlist}
          />
        </Suspense>
      )}

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
          Ürün sepete eklendi!
        </div>
      )}
    </div>
  );
}