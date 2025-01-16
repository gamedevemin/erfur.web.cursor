import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();

  return (
    <>
      {/* Sepet Butonu */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-accent rounded-full transition-colors"
        aria-label="Sepeti Aç"
      >
        <ShoppingBag className="h-6 w-6 text-foreground" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Sepet Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Sepetim ({totalItems})</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-accent rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Ürün Listesi */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Sepetiniz boş</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-accent/10 rounded-lg">
                    {/* Ürün Görseli */}
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Ürün Detayları */}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {item.discount ? (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              {item.price}
                            </span>
                            <span className="text-sm font-medium text-red-600">
                              {(() => {
                                const price = parseFloat(item.price.replace('₺', ''));
                                const discounted = price - (price * item.discount / 100);
                                return `₺${discounted}`;
                              })()}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-medium">{item.price}</span>
                        )}
                      </div>

                      {/* Miktar Kontrolü */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-accent rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-accent rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors ml-auto"
                          title="Ürünü Kaldır"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Toplam</span>
                  <span>{totalPrice}</span>
                </div>
                <div className="grid gap-2">
                  <button
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Ödemeye Geç
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 