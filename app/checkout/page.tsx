'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from '../components/checkout/CheckoutForm';
import Footer from '../components/layout/Footer';
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
    <div className="flex flex-col min-h-screen bg-[#F1F1F1]">
      <div className="flex-1 h-full">
        {/* Go Back Link */}
        <div className="container mx-auto py-8 max-w-[1110px]">
          <button
            onClick={() => router.back()}
            className="text-black/50 hover:text-primary transition-colors duration-200"
          >
            Go Back
          </button>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-[1110px] mx-auto">
            {/* <h1 className="text-h3 font-bold mb-8">Checkout</h1> */}
            <CheckoutForm userId={userId} onOrderComplete={handleOrderComplete} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Checkout;