"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { createCartStore } from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { getSessionData } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Summary = () => {
  const searchParams = useSearchParams();
  const store = getSessionData();
  const useCart = createCartStore(store.username);
  const items = useCart.getState().getItems();
  const removeAll: () => void = useCart((state: { removeAll: () => void }) => state.removeAll);

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

  interface CartItem {
    id: string;
    price: string;
  }

  const totalPrice = items.reduce((total: number, item: CartItem) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    try {
      const response = await fetch(`${store.apiUrl}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: items.map((item: CartItem) => item.id),
          amount: totalPrice * 100 // Convert to smallest currency unit (paise)
        }),
      });

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Purchase Description",
        order_id: data.id,
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
          } else {
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#000000"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong.');
    }
  };

  return ( 
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
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}
 
export default Summary;