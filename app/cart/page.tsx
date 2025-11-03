'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/Button';
import Category from '../components/layout/Category';
import InfoSection from '../components/layout/InfoSection';
import Footer from '../components/layout/Footer';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 50 : 0; // Only add shipping if there are items
  const tax = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Category />
        <InfoSection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Go Back Link */}
      <div className="container mx-auto px-6 py-8 max-w-[1110px]">
        <Link
          href="/"
          className="text-black/50 hover:text-primary transition-colors duration-200"
        >
          Go Back
        </Link>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-6 py-8 max-w-[1110px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Cart Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-black/50">${item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-black/20 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-black/5 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-black/5 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-black/50 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg h-fit">
            <h2 className="text-lg font-bold mb-6">SUMMARY</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-black/50">TOTAL</span>
                <span className="font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50">SHIPPING</span>
                <span className="font-bold">${shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50">VAT (INCLUDED)</span>
                <span className="font-bold">${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4 border-t">
                <span>GRAND TOTAL</span>
                <span className="text-primary">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full">
                CHECKOUT
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <Category />

      {/* Info Section */}
      <InfoSection />

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;