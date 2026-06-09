import { useEffect } from "react";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/cartContext";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  // Close drawer on Escape key — standard UX for modals/drawers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    if (isCartOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop — click outside to close */}
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer panel slides in from the right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            <p className="text-sm text-gray-500">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            aria-label="Close cart panel"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Cart items or empty state */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-6">
                Add some grains from the products section.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50/50"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Remove ${product.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="text-sm" />
                        </button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                      </div>

                      <p className="font-bold text-green-600">
                        ${(parseFloat(product.price) * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with total and actions */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeCart}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="px-4 py-2.5 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
