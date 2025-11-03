'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

export interface CartItem {
  id: string;
  productId: Id<'products'>;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: { id: Id<'products'>; name: string; price: number; image: string; slug: string }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncWithConvex: (userId: Id<'users'>) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'audiophile_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Convex mutations
  const addToCartMutation = useMutation(api.mutations.addToCart);
  const updateCartItemMutation = useMutation(api.mutations.updateCartItem);
  const removeFromCartMutation = useMutation(api.mutations.removeFromCart);
  const clearUserCartMutation = useMutation(api.mutations.clearUserCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: { id: Id<'products'>; name: string; price: number; image: string; slug: string }) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${product.id}_${Date.now()}`, // Generate unique ID for local cart
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          slug: product.slug,
        };
        return [...prev, newItem];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const syncWithConvex = async (userId: Id<'users'>) => {
    setIsLoading(true);
    try {
      // Clear existing cart items for this user in Convex
      await clearUserCartMutation({ userId });

      // Add current local cart items to Convex
      for (const item of items) {
        await addToCartMutation({
          userId,
          productId: item.productId,
          quantity: item.quantity,
        });
      }
    } catch (error) {
      console.error('Failed to sync cart with Convex:', error);
      // For guest users, we don't need to sync with Convex
      // The cart remains local and functional
    } finally {
      setIsLoading(false);
    }
  };

  const value: CartContextType = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
    syncWithConvex,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};