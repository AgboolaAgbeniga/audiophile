'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { Id } from '../../convex/_generated/dataModel';

const Checkout = () => {
  const router = useRouter();

  // For guest users, we don't need a userId for checkout
  // The cart is handled locally and the order is created without a user association
  // In a real app with authentication, this would come from auth context
  const userId: Id<'users'> | undefined = undefined; // Guest checkout

  const handleOrderComplete = (orderId: Id<'orders'>) => {
    router.push(`/confirmation?orderId=${orderId}`);
  };

  return (
    <div className="bg-[#F1F1F1] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-[1110px] mx-auto">
          <h1 className="text-h3 font-bold mb-8">Checkout</h1>
          <CheckoutForm userId={userId} onOrderComplete={handleOrderComplete} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;