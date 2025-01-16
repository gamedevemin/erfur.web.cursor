import { X, Heart } from 'lucide-react';
import { Image } from './ui/Image';
import type { Product } from '../types/product';

interface QuickViewModalProps {
  product: Product;
  isInCart: (id: number) => boolean;
  wishlist: number[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: number) => void;
}

export default function QuickViewModal({
  product,
  isInCart,
  wishlist,
  onClose,
  onAddToCart,
  onToggleWishlist,
}: QuickViewModalProps) {
  const calculateDiscountedPrice = (price: string, discount?: number) => {
    if (!discount) return price;
    const numericPrice = parseInt(price.replace('₺', ''));
    const discountedPrice = numericPrice - (numericPrice * discount) / 100;
    return `₺${discountedPrice}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              loadingStrategy="eager"
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-500 mb-4">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                {product.discount ? (
                  <>
                    <span className="text-2xl font-bold text-red-600">
                      {calculateDiscountedPrice(product.price, product.discount)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">{product.price}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                )}
              </div>
              <div className="text-sm text-gray-500 mb-6">
                Stok Durumu: {' '}
                <span className={`font-medium ${
                  product.stock > 5 ? 'text-green-600' : 
                  product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {product.stock > 5 ? 'Stokta' :
                   product.stock > 0 ? `Son ${product.stock} ürün` : 'Tükendi'}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={product.stock === 0}
                className={`flex-1 px-6 py-3 rounded-lg transition-colors ${
                  product.stock === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : isInCart(product.id)
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {product.stock === 0 
                  ? 'Tükendi' 
                  : isInCart(product.id)
                  ? 'Sepete Eklendi'
                  : 'Sepete Ekle'}
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-lg border ${
                  wishlist.includes(product.id)
                    ? 'bg-red-50 border-red-500 text-red-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Heart
                  className="h-6 w-6"
                  fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 