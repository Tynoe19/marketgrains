import { createContext, useState, useContext, type ReactNode } from "react";
import type { Product } from "../types/products";

type CartContextType = {
    cart: Product[];
    addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        const exists = cart.find((item) => item.id === product.id);
        if (exists) {
            alert("Product is already in the cart!");
            return;
        }
        setCart((prev) => [...prev, product]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}