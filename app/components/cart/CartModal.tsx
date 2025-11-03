'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Counter } from '../ui/Counter';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveAll: () => void;
}

const CartModal = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveAll }: CartModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  const getShortName = (fullName: string) => {
    if (fullName.includes('XX99 Mark II')) return 'XX99 MK II';
    if (fullName.includes('XX99 Mark I')) return 'XX99 MK I';
    if (fullName.includes('XX59')) return 'XX59';
    if (fullName.includes('ZX9')) return 'ZX9';
    if (fullName.includes('ZX7')) return 'ZX7';
    if (fullName.includes('YX1')) return 'YX1';
    return fullName;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:items-start md:justify-end md:pt-26 max-w-[1110px] mx-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white z-70 rounded-lg shadow-lg w-[327px] md:w-full md:max-w-[377px]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 ">
          <h6 className="">CART ({totalItems})</h6>
          <button
            onClick={onRemoveAll}
            className="text-black/50 hover:text-primary transition-colors"
          >
            Remove all
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">

                  <div className='flex items-center gap-4'>
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="font-bold">{getShortName(item.name)}</p>
                      <span className="text-black/50 text-sm">${item.price.toLocaleString()}</span>
                    </div>

                  </div>

                  {/* Quantity Counter */}
                  <div className="">
                    <Counter
                      count={item.quantity}
                      onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      onDecrement={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      size="small"
                    />
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-black/50">TOTAL</span>
              <span className="text-lg font-bold">${totalPrice.toLocaleString()}</span>
            </div>
            <Button variant="primary" size="lg" className="w-full" onClick={handleCheckout}>
              CHECKOUT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;