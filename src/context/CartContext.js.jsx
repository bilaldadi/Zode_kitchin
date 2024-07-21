// CartContext.js
import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id && cartItem.preference === item.preference);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id && cartItem.preference === item.preference
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
                cartItem.id === itemId && cartItem.preference === preference
                    ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + quantity) }
                    : cartItem
            )
        );
    };

    const removeFromCart = (itemId, preference) => {
        setCartItems((prevItems) =>
            prevItems.filter(cartItem => !(cartItem.id === itemId && cartItem.preference === preference))
        );
    };

    const totalItems = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}
