"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Script from 'next/script';
import { useSearchParams } from "next/navigation";

import Container from '@/components/ui/container';
import { createCartStore } from "@/hooks/use-cart";
import { getSessionData } from '@/lib/utils';
import { Product } from '@/types';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';


declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const store = getSessionData();
  const useCart = createCartStore(store.username);
  const items = useCart.getState().items;
  const removeAll = useCart.getState().removeAll;

  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [searchParams, removeAll]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const totalPrice = items.reduce((total: number, item: { price: string }) => {
    return total + Number(item.price);
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const response = await axios.post(`${store.apiUrl}/checkout`, {
        productIds: items.map((item: { id: string }) => item.id), amount: totalPrice * 100, // Convert to smallest currency unit (paise)
        ...formData
      });

      const { orderId, amount, currency, } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount, 
        currency: currency,
        name: store.name || "Store",
        description: "Purchase Description",
        order_id: orderId,
        handler: async function (response: any) {
            // Verify payment on server
            const verifyResponse = await fetch(`${store.apiUrl}/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }),
            });
  
            if (verifyResponse.ok) {
              toast.success('Payment completed.');
              removeAll();
              router.push(`${store.username}/cart`); 
            } else {
              toast.error('Payment verification failed.');
            }
          },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#000000",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong with the checkout process.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-white">
        <Container>
          <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-black">Checkout</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                <form onSubmit={onCheckout} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="lg:col-span-5">
                <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                  <h2 className="text-lg font-medium text-gray-900">
                    Order summary
                  </h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="text-base font-medium text-gray-900">Order total</div>
                      <Currency value={totalPrice} />
                    </div>
                  </div>
                  <Button 
                    onClick={onCheckout} 
                    disabled={loading || items.length === 0} 
                    className="w-full mt-6"
                  >
                    {loading ? 'Processing...' : 'Checkout'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default CheckoutPage;