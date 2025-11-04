'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Radio } from '../ui/Radio';
import {
  validateEmail,
  validateRequired,
  validateName,
  validatePhone,
  validateAddress,
  validateCity,
  validateZip,
  validateCountry,
  validateEMoneyNumber,
  validateEMoneyPin
} from '../../lib/validation';
import { Id } from '../../../convex/_generated/dataModel';

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  paymentMethod: 'e-money' | 'cash';
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

interface CheckoutFormProps {
  userId?: Id<'users'>;
  onOrderComplete: (orderId: Id<'orders'>) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ userId, onOrderComplete }) => {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCart();
  const createOrderMutation = useMutation(api.mutations.createOrder);
  const clearUserCartMutation = useMutation(api.mutations.clearUserCart);
  const sendOrderConfirmationEmailMutation = useMutation(api.mutations.sendOrderConfirmationEmail);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    paymentMethod: 'e-money',
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<Id<'orders'> | null>(null);
  const [showAllItems, setShowAllItems] = useState(false);

  const confirmedOrder = useQuery(api.queries.getOrder, completedOrderId ? { id: completedOrderId as any } : 'skip');

  const handleInputChange = (field: keyof CheckoutFormData, value: string | React.ChangeEvent<HTMLInputElement>) => {
    const actualValue = typeof value === 'string' ? value : value.target.value;
    setFormData(prev => ({ ...prev, [field]: actualValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!validateName(formData.name)) newErrors.name = 'Required';
    if (!validateEmail(formData.email)) newErrors.email = 'Wrong format';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Wrong Format';
    if (!validateAddress(formData.address)) newErrors.address = 'Required';
    if (!validateCity(formData.city)) newErrors.city = 'Required';
    if (!validateZip(formData.zip)) newErrors.zip = 'Wrong format';
    // if (!validateCountry(formData.country)) newErrors.country = 'Country must contain only letters and be at least 2 characters';

    if (formData.paymentMethod === 'e-money') {
      if (!validateEMoneyNumber(formData.eMoneyNumber || '')) newErrors.eMoneyNumber = 'Must be 9 digits';
      if (!validateEMoneyPin(formData.eMoneyPin || '')) newErrors.eMoneyPin = 'Must be 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const subtotal = getTotalPrice();
      const shipping = 50; // Fixed shipping cost
      const tax = Math.round(subtotal * 0.2); // 20% tax
      const grandTotal = subtotal + shipping + tax;

      const orderItems = items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const orderData = {
        ...(userId && { userId }), // Only include userId if user is logged in
        items: orderItems,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
        },
        totals: {
          subtotal,
          shipping,
          tax,
          grandTotal,
        },
        status: 'pending' as const,
      };

      const orderId = await createOrderMutation(orderData);

      // Clear the cart in Convex if user is logged in
      if (userId) {
        await clearUserCartMutation({ userId });
      }

      // Clear local cart
      clearCart();

      // Send order confirmation email via API route
      try {
        const orderNumber = typeof orderId === 'string' && orderId.includes('_') ? orderId.split('_')[1] : orderId.toString(); // Extract order number from ID

        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            customerEmail: formData.email,
            customerName: formData.name,
            orderNumber,
            items: orderItems.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            totals: {
              subtotal,
              shipping,
              tax,
              grandTotal,
            },
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              zip: formData.zip,
              country: formData.country,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send email');
        }

        console.log('Order confirmation email sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the order if email fails
      }

      setCompletedOrderId(orderId);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getTotalPrice();
  const shipping = 50;
  const tax = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping + tax;

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
    <>
      {showConfirmation && completedOrderId && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto px-10 py-10">
            <div className="p-8">
              {/* Success Message */}
              <div className=" mb-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center  mb-8">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-6">THANK YOU <br />FOR YOUR ORDER</h3>
                <p className="text-black/50">
                  You will receive an email confirmation shortly.
                </p>
              </div>

              {/* Order Summary Row */}
              <div className="flex flex-col lg:flex-row  mb-8">
                {/* Products Column */}
                <div className="flex-2 bg-light rounded-l-xl p-6">
                  <div className="space-y-4">
                    {confirmedOrder?.items && (showAllItems ? confirmedOrder.items : confirmedOrder.items.slice(0, 1)).map((item: any) => (
                      <div key={item.productId} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-bold">{getShortName(item.name)}</p>
                            <p className="text-sm text-black/50">${item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-sm text-black/50">x{item.quantity}</p>
                      </div>
                    ))}
                    {confirmedOrder?.items && confirmedOrder.items.length > 1 && !showAllItems && (
                      <button
                        onClick={() => setShowAllItems(true)}
                        className="text-[12px] font-bold text-black/50 hover:text-primary transition-colors text-center w-full border-t border-black/8 pt-4"
                      >
                        and {confirmedOrder.items.length - 1} other item(s)
                      </button>
                    )}
                    {confirmedOrder?.items && confirmedOrder.items.length > 1 && showAllItems && (
                      <button
                        onClick={() => setShowAllItems(false)}
                        className="text-[12px] font-bold text-black/50 hover:text-primary transition-colors text-center w-full"
                      >
                        View less
                      </button>
                    )}
                  </div>
                </div>

                {/* Grand Total Column */}
                <div className="bg-black p-6 rounded-r-lg lg:w-80 flex-1 i ">
                  <div className='flex flex-col justify-end h-full'>
                    <span className="text-lg font-bold mb-2 text-white/50">GRAND TOTAL</span>
                    <h6 className="text-2xl font-bold text-white mt-2">
                      ${confirmedOrder?.totals?.grandTotal?.toLocaleString() || grandTotal.toLocaleString()}
                    </h6>
                  </div>

                </div>
              </div>

              {/* Back to Home Button */}
              <div className="text-center">
                <Button
                  onClick={() => {
                    setShowConfirmation(false);
                    router.push('/');
                  }}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  BACK TO HOME
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-[730px_350px] gap-8">
          <div className="space-y-8 bg-white px-12 py-14  rounded-lg">
            <h3>Checkout</h3>
            {/* Billing Details */}
            <div className="">
              <span className="text-[13px] font-bold  text-primary">BILLING DETAILS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  error={errors.name}
                  placeholder="Alexei Ward"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  error={errors.email}
                  placeholder="alexei@mail.com"
                  required
                />
                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  error={errors.phone}
                  placeholder="+1 202-555-0136"
                  required
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="">
              <span className="text-[13px] font-bold  text-primary">SHIPPING INFO</span>
              <div className="space-y-4 mt-4">
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(value) => handleInputChange('address', value)}
                  error={errors.address}
                  placeholder="1137 Williams Avenue"
                  size="address"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="ZIP Code"
                    value={formData.zip}
                    onChange={(value) => handleInputChange('zip', value)}
                    error={errors.zip}
                    placeholder="10001"
                    required
                  />
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(value) => handleInputChange('city', value)}
                    error={errors.city}
                    placeholder="New York"
                    required
                  />
                </div>
                <Input
                  label="Country"
                  value={formData.country}
                  onChange={(value) => handleInputChange('country', value)}
                  error={errors.country}
                  placeholder="United States"
                  required
                />
              </div>
            </div>

            {/* Payment Details */}
            <div className="">
              <span className="text-[13px] font-bold  text-primary">PAYMENT DETAILS</span>
              <div className="space-y-4 mt-4">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className="flex space-x-4">
                    <span className="text-[12px] font-bold">Payment Method</span>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Radio
                      label="e-Money"
                      value="e-money"
                      checked={formData.paymentMethod === 'e-money'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <Radio
                      label="Cash on Delivery"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                  </div>
                </div>


                {formData.paymentMethod === 'e-money' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="e-Money Number"
                      value={formData.eMoneyNumber || ''}
                      onChange={(value) => handleInputChange('eMoneyNumber', value)}
                      error={errors.eMoneyNumber}
                      placeholder="238521993"
                      required
                    />
                    <Input
                      label="e-Money PIN"
                      value={formData.eMoneyPin || ''}
                      onChange={(value) => handleInputChange('eMoneyPin', value)}
                      error={errors.eMoneyPin}
                      placeholder="6891"
                      required
                    />
                  </div>
                )}

                {formData.paymentMethod === 'cash' && (
                  <div className="mt-4">
                    <div className="flex gap-8 items-center space-x-4">
                      <img
                        src="/assets/checkout/icon-cash-on-delivery.svg"
                        alt="Cash on Delivery"
                        className="w-12 h-12 mt-1"
                      />
                      <p className="text-sm text-black/60">
                        The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg h-fit">
            <h6 className="text-lg font-bold mb-4">SUMMARY</h6>
            <div className="space-y-4 mb-6 ">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <span className="font-bold">{getShortName(item.name)}</span>
                    <span className="text-sm block text-black/50">${item.price.toLocaleString('en-US')}</span>
                  </div>
                  <div className='flex h-16 items-start'>
                    <p className="text-sm text-black/50">x{item.quantity}</p>
                  </div>

                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-black/50 text-[15px]">TOTAL</span>
                <span className="font-bold">${subtotal.toLocaleString('en-US')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50 text-[15px]">SHIPPING</span>
                <span className="font-bold">${shipping.toLocaleString('en-US')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50 text-[15px]">VAT (INCLUDED)</span>
                <span className="font-bold">${tax.toLocaleString('en-US')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-black/50 text-[15px]">GRAND TOTAL</span>
                <span className="text-primary">${grandTotal.toLocaleString('en-US')}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              loadingText="PROCESSING..."
              successText="ORDER PLACED!"
            >
              CONTINUE & PAY
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;