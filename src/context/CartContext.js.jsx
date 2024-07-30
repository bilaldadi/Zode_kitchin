import { createContext, useState, useMemo, useEffect } from 'react';

export const CartContext = createContext();

const cartFromLocalStorage =JSON.parse(localStorage.getItem('cartItems') || '[]');

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(cartFromLocalStorage);

    // Save cart items to local storage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart items to local storage:", error);
        }
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                cartItem => cartItem.id === item.id && cartItem.preferences === item.preferences
            );
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id && cartItem.preferences === item.preferences
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (itemId, preference, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map(cartItem =>
                cartItem.id === itemId && cartItem.preferences === preference
                    ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + quantity) }
                    : cartItem
            )
        );
    };

    const removeFromCart = (itemId, preference) => {
        setCartItems((prevItems) =>
            prevItems.filter(cartItem => !(cartItem.id === itemId && cartItem.preferences === preference))
        );
    };

    
    const totalItems = useMemo(() => {
      return (cartItems ?? []).reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
}

