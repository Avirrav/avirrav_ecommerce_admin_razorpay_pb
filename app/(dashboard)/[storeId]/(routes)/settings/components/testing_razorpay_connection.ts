import axios from 'axios';
import { toast } from 'react-hot-toast';

export const testRazorpayConnection = async (storeId: string) => {
  try {
    console.log("storeId", storeId);
    const response = await axios.post(`/api/stores/${storeId}/test-payment`, {
      amount: 2000, // 1 rupee
    });

    const options = {
      key: response.data.keyId,
      amount: response.data.amount,
      currency: "INR",
      name: "Testing User",
      description: "Testing Razorpay Connection",
      order_id: response.data.orderId,
      handler: function (response: any) {
        toast.success("Payment successful!");
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    toast.error("Failed to initialize payment");
    console.error(error);
  }
}; 